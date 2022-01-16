import PropTypes from 'prop-types';
import { useState } from 'react';

import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { message } from 'antd';

import UploadPage from "./UploadPage";
import ScorePage from "./ScorePage";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
`;

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
        </Box>
        )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const ExamPage = ({ setSignedIn, username, password, secretKey, displayStatus, title, uploadDisable }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        message.destroy()
        if (newValue == 1) 
            message.loading("Wait a minute!", 0)
        setValue(newValue);
    };
    
    return (
        <Wrapper>
            <Typography variant="h3"> <EmojiEventsIcon fontSize="large"/> {title} </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    selectionFollowsFocus
                >
                    <Tab label="File Upload" {...a11yProps(0)} />
                    <Tab label="Score" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                { console.log("password:", password)}
                <UploadPage uploadDisable={uploadDisable} username={username} password={password} secretKey={secretKey} examName={title} displayStatus={displayStatus}/>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ width: '100%' }}>
                <ScorePage username={username} password={password} secretKey={secretKey} examName={title}/>
            </TabPanel>
        </Wrapper>
    );
}

export default ExamPage;
