import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Mytable from '../Components/Table';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
    min-width: 120px;
`;

const ContentPaper = styled(Paper)`
    height: 300px;
    padding: 2em;
    overflow: auto;
`;

const Body = () => {
    const classes = useStyles();

    const { messages, addCardMessageAndPersonalData, addQueryMessageAndData, addErrorMessage } = useScoreCard();

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [score, setScore] = useState(0);

    const [queryType, setQueryType] = useState('name');
    const [queryString, setQueryString] = useState('');

    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    const handleAdd = async () => {
        const {
            data: { message, card, personalData },
        } = await axios.post('/api/create-card', {
            name,
            subject,
            score,
        });
        if (!card) addErrorMessage(message, false);
        else addCardMessageAndPersonalData(message, personalData);
    };

    const handleQuery = async () => {
        const {
            data: { queryData, message },
        } = await axios.get('/api/query-cards', {
        params: {
            type: queryType,
            queryString,
        },
        });

        if (!queryData) addErrorMessage(message, true);
        else addQueryMessageAndData(message, queryData);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
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
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [value, setValue] = useState(0);
    const TabChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Wrapper>
            <Row>
            {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
                <TextField className={classes.input} placeholder="Name" value={name} onChange={handleChange(setName)}/>
                <TextField className={classes.input} placeholder="Subject" style={{ width: 240 }} value={subject} onChange={handleChange(setSubject)}/>
                <TextField className={classes.input} placeholder="Score" value={score} onChange={handleChange(setScore)} type="number"/>
                <Button className={classes.button} variant="contained" color="primary" disabled={!name || !subject} onClick={handleAdd}>Add</Button>
            </Row>
            <Row>
                <StyledFormControl>
                    <FormControl component="fieldset">
                        <RadioGroup row value={queryType} onChange={handleChange(setQueryType)}>
                            <FormControlLabel value="Name" control={<Radio color="primary" />} label="Name"/>
                            <FormControlLabel value="Subject" control={<Radio color="primary" />} label="Subject"/>
                        </RadioGroup>
                    </FormControl>
                </StyledFormControl>
                <TextField placeholder="Query string..." value={queryString} onChange={handleChange(setQueryString)} style={{ flex: 1 }}/>
                <Button className={classes.button} variant="contained" color="primary" disabled={!queryString} onClick={handleQuery}>Query</Button>
            </Row>

            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={TabChange} aria-label="basic tabs example">
                        <Tab label="Add" {...a11yProps(0)} />
                        <Tab label="Query" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <ContentPaper>
                    <TabPanel value={value} index={0}>
                        {messages.map((m, i) => m.isQuery? <> </>: m.isData? 
                        <Mytable rows={m.data}/>:
                        <Typography variant="body2" key={m + i} style={{ color: m.color }}>{m.message}</Typography>
                        )}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {messages.map((m, i) => !m.isQuery? <> </>: m.isData? 
                        <Mytable rows={m.data}/>:
                        <Typography variant="body2" key={m + i} style={{ color: m.color }}>{m.message}</Typography>
                        )}
                    </TabPanel>
                </ContentPaper>
            </Box>

            {/* <ContentPaper variant="outlined">
                {messages.map((m, i) => (
                    <Typography variant="body2" key={m + i} style={{ color: m.color }}>{m.message}</Typography>
                ))}
            </ContentPaper> */}
        </Wrapper>
    );
};

export default Body;
