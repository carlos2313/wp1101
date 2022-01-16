import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { message } from 'antd';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import QuizTwoToneIcon from '@mui/icons-material/QuizTwoTone';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { withStyles } from '@mui/styles'

import ExamPage from './ExamPage';

import { LOGOUT_MUTATION, GET_EXAM_QUERY } from "../graphql";
import { useMutation, useQuery } from '@apollo/react-hooks';

const drawerWidth = 200;

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

const UserPage = (props) => {
    const [value, setValue] = useState(1);
    const { setSignedIn, username, displayStatus } = props;

    const { data } = useQuery(GET_EXAM_QUERY)
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        if (!data)
            return;
        console.log("data:", data);
        setTitles(data.exam)
    }, [data]);

    const ables = ['Hackathon 2 Public Test']


    const handleChange = (newValue) => {
        message.destroy()
        if (!ables.includes(titles[newValue])) {
            message.info("Not Open", 0)
        }
        setValue(newValue);
    };

    const [getLogoutMessage] = useMutation(LOGOUT_MUTATION);

    const logout = async () => {
        const { data } = await getLogoutMessage();
        console.log(data.logout);
        message.destroy();
        displayStatus(data.logout);
        setSignedIn(false);
    }

    const DirectionAwareAutoAwesomeIcon = withStyles((theme) => ({
    root: {
        transform: theme.direction === "rtl" ? "scaleX(-1)" : undefined
    }
    }))(AutoAwesomeIcon)
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, alignItems: 'center', background: 'rgba(102, 220, 195, 1)' }}
            >
            <Toolbar>
                <Typography variant="h6">
                        Welcome! <AutoAwesomeIcon/> {username} <DirectionAwareAutoAwesomeIcon/> {" "} 
                    <Button variant="contained" onClick={logout} color='warning' endIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
                width: '20vw',
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            }}}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
                <List sx={{
                    width: '20vw',
                }}>
                {titles.map((text, index) => (
                <ListItem button key={text} id={index} onClick={() => handleChange(index)}>
                    <ListItemIcon>
                            {index % 3 === 0 ? <QuizIcon /> :
                                (index % 3 === 1 ? <QuizOutlinedIcon /> : <QuizTwoToneIcon />)}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
        </Drawer>
        <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, textAlign: 'center', background: 'rgba(255, 255, 255, 0.6)', width: '80vw' }}
            >
            <Toolbar />
            {titles.map((text, index) => (
            <TabPanel value={value} index={index}>
                <ExamPage title={text} uploadDisable={!ables.includes(text)} {...props}/>
            </TabPanel>
            ))}
        </Box>
    </Box>
  );
}

export default UserPage;