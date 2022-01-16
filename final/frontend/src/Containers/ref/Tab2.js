import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Title from '../../Components/Title'
/*
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
*/

function FullWidthTabs({displayStatus, setSignedIn, sendLogin, username, setUsername, hashedPassword, setHashedPassword}){
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <>
      <Title>
        <Typography variant="h1"> Hackathon Online Judge </Typography>
      </Title>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              onChange={handleChange}
              aria-label="lab API tabs example"
              textColor="secondary"
              indicatorColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              selectionFollowsFocus
              centered={true}
            >
            <Tab label="Sign In" value="1" />
            <Tab label="Sign Up" value="2" />
          </Tabs>
        </Box>
          <TabPanel value="1">
            <SignIn displayStatus={displayStatus} setSignedIn={setSignedIn} sendLogin={sendLogin} username = {username} setUsername = {setUsername} hashedPassword = {hashedPassword} setHashedPassword = {setHashedPassword}/>
          </TabPanel>
          <TabPanel value="2">
            <SignUp displayStatus={displayStatus} username = {username} setUsername = {setUsername} hashedPassword = {hashedPassword} setHashedPassword = {setHashedPassword}/>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default FullWidthTabs;