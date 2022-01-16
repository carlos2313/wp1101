import { useState, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Typography from '@mui/material/Typography';

import { UPLOAD_FILE } from "../../graphql";

const UploadPage = () => {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    });

    const maxFileSize = 100000;
    const handleBeforeUpload = (file, _) => {
        if (file.size > maxFileSize) {
            message.error(`${file.name} size > {maxFileSize}`);
            return Upload.LIST_IGNORE;
        }
        return true;
    };

    const filesUpload = useRef(null);
    const dirUpload = useRef(null);

    const [multipleFilesList, setMultipleFilesList] = useState([]);
    const [dirFilesList, setDirFilesList] = useState([]);

    const [uploading, setUploading] = useState(false);

    const handleUpload = upload => {
        setUploading(true);
        upload.current.fileList.map(f => f.originFileObj).map(file => uploadFile({ variables: { file } }));
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
            <Typography variant="h5"> Upload Multiple Files </Typography>
            <Upload
                accept=".js,.css,.html"
                customRequest={dummyRequest}
                multiple={true}
                ref={filesUpload}
                beforeUpload={handleBeforeUpload}
                fileList={multipleFilesList}
                onChange={({fileList}) => handleOnChange(fileList, setMultipleFilesList)}
                clear={() => setMultipleFilesList([]) }
            >
                <Button icon={<UploadOutlined/>}> Upload </Button>
            </Upload>,
            <Button
                type="primary"
                onClick={() => handleUpload(filesUpload)}
                loading={uploading}
                style={{ marginTop: 16 }}
                disabled={multipleFilesList.length === 0}
            > {uploading ? 'Uploading' : 'Submit'}
            </Button>
            <Typography variant="h5"> Upload a directory </Typography>
            <Upload
                accept=".js,.css,.html"
                customRequest={dummyRequest}
                beforeUpload={handleBeforeUpload}
                ref={dirUpload}
                fileList={dirFilesList}
                onChange={({fileList}) => handleOnChange(fileList, setDirFilesList)}
                clear={() => setDirFilesList([])}
                directory
            >
                <Button icon={<UploadOutlined />}>Upload Directory</Button>
            </Upload>
            <Button
                type="primary"
                onClick={() => handleUpload(dirUpload)}
                loading={uploading}
                style={{ marginTop: 16 }}
                disabled={dirFilesList.length === 0}
            > {uploading ? 'Uploading' : 'Submit'}
            </Button>
        </>
    );
}

export default UploadPage;