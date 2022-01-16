import { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Typography from '@mui/material/Typography';

import { UPLOAD_FILE } from "../graphql";

const UploadBlock = (props) => {
    const { uploadDisable, username, password, secretKey , examName } = props;
    
    const [uploadFile] = useMutation(UPLOAD_FILE);

    const maxFileSize = 1000000000;
    const handleBeforeUpload = (file, _) => {
        message.warning("You are uploading a file!");
        if (file.size > maxFileSize) {
            message.error(`${file.name} size > {maxFileSize}`);
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const ref = useRef(null);
    const [myFileList, setMyFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (upload) => {
        setUploading(true);
        console.log("username:", username)
        console.log("password:", password)
        console.log("secretKey:", secretKey)
        console.log("examName:", examName)
        upload.current.fileList
            .map(f => f.originFileObj)
            .map(async file => {
                const { data } = await uploadFile({
                    variables: {
                        username: username,
                        password: password,
                        secretKey: secretKey,
                        exam: examName,
                        file
                    }
                })
                console.log(data.singleUpload);
                props.displayStatus(data.singleUpload);
            });
        
        upload.current.upload.props.clear();
        setUploading(false);
    };
    
    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const handleOnChange = (fileList, setFileList) => {
        setFileList(fileList);
    }
    
    return (
        <>
        <Typography variant="h6"> {props.title} </Typography>
            <Upload
                accept=".js,.css,.html"
                customRequest={dummyRequest}
                beforeUpload={handleBeforeUpload}
                ref={ref}
                fileList={myFileList}
                onChange={({fileList}) => handleOnChange(fileList, setMyFileList)}
                clear={() => setMyFileList([])}
                {...props}
            >
            <Button icon={<UploadOutlined />} disabled={uploadDisable}> Upload </Button>
            </Upload>
            <Button
                type="primary"
                onClick={() => handleUpload(ref)}
                loading={uploading}
                style={{ marginTop: 16 }}
                disabled={myFileList.length === 0}
            > {uploading ? 'Uploading' : 'Submit'}
            </Button>
        </>
    );
}

export default UploadBlock;