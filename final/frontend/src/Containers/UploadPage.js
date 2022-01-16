import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import UploadBlock from "./UploadBlock";

const UploadPage = (props) => {

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    
    return (
        <Stack direction="row" spacing={2} style={{textAlign: 'center', alignItems: 'center'}}>
            <Item>
                <UploadBlock {...props} title="Upload a zip file" accept=".zip"/>
            </Item>
        </Stack >
    );
}

export default UploadPage;