import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
    messages: [],

    addCardMessageAndPersonalData: () => {},
    addQueryMessageAndData: () => {},
    addErrorMessage: () => {},
    clearMessages: () => {},
});

const makeMessage = (message, color, isQuery) => {
    return { message, color, isQuery};
};

const makeTableData = (data, isQuery) => {
    return {data, isData: true, isQuery: isQuery};
}

const ScoreCardProvider = (props) => {
    const [messages, setMessages] = useState([]);

    const addCardMessageAndPersonalData = (message, data) => {
        setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR, false), makeTableData(data, false)]);
    };

    const addQueryMessageAndData = (message, data) => {
        setMessages([...messages, makeMessage(message, REGULAR_MESSAGE_COLOR, true), makeTableData(data, true)]);
    };

    const addErrorMessage = (message, isQuery) => {
        setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR, isQuery)]);
    };

    const clearMessages = (message) => {
        console.log(message);
        setMessages([makeMessage(message, REGULAR_MESSAGE_COLOR)]);    
    };

    return (
        <ScoreCardContext.Provider
        value={{
            messages,
            addCardMessageAndPersonalData,
            addQueryMessageAndData,
            addErrorMessage,
            clearMessages,
        }}
        {...props}
        />
    );
};

function useScoreCard() {
    return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
