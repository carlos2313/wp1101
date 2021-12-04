import { useState, useEffect, useRef } from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import useChat from '../Hooks/useChat';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;

const LOCALSTORAGE_KEY = "save-username";

function App() {
    const savedUsername = localStorage.getItem(LOCALSTORAGE_KEY);
    const { status, messages, sendMessage, clearMessages } = useChat()
    const [username, setUsername] = useState(savedUsername || "");
    const [body, setBody] = useState('')  // textBody
    const [signedIn, setSignedIn] = useState(false);
    const bodyRef = useRef(null);

    const displayStatus = (payload) => {
        if (payload.msg) {
            const { type, msg } = payload;
            const content = { content: msg, duration: 0.5 };
            switch (type) {
                case 'success':
                    message.success(content);
                    break;
                case 'error':
                default:
                    message.error(content);
                    break;
            }
        }
    };
    useEffect(() => { displayStatus(status)}, [status]);
    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, username);
        }}, [signedIn, username]
    );
    
    
    return (
        <Wrapper>
            {!signedIn? 
            <SignIn username = {username} setUsername = {setUsername} setSignedIn = {setSignedIn} displayStatus = {displayStatus}/>:
            <ChatRoom  messages = {messages} sendMessage = {sendMessage} clearMessages = {clearMessages} username = {username} body = {body} setBody = {setBody} bodyRef = {bodyRef} displayStatus = {displayStatus}/>}
        </Wrapper>
    )
}

export default App
