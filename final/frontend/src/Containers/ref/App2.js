import { useState, useEffect } from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import useChat from '../../Hooks/useChat';
import ChatRoom from '../ChatRoom';
import Tabs from '../Tab';


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
const signIn_Key = "signIn";

function App() {
    const savedUsername = localStorage.getItem(LOCALSTORAGE_KEY);
    const isSignIn = JSON.parse(localStorage.getItem(signIn_Key));//localStorage is string fku
    const { status, sendLogin, sendSignUp, createChatBox, sendMessage, logOut, isModalVisible, anotherUser, setAnotherUser, handleCancel, activeKey, panes, onChange, onEdit} = useChat();
    const [username, setUsername] = useState(savedUsername || "");
    const [hashedPassword, setHashedPassword] = useState("");
    const [body, setBody] = useState('')  // textBody
    const [signedIn, setSignedIn] = useState(isSignIn || false);

    const displayStatus = (payload) => {
        if (payload.msg) {
            const { type, msg } = payload;
            const content = { content: msg, duration: 1 };
            switch (type) {
                case 'success':
                    if(msg === 'Login success'){
                        setSignedIn(true);
                    }
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
            localStorage.setItem(signIn_Key, true);
        }else{
            localStorage.setItem(signIn_Key, false);
        }
    }, [signedIn, username]
    );
    
    
    
    return (
        <Wrapper>
            {!signedIn? 
            <Tabs setSignedIn = {setSignedIn} sendLogin = {sendLogin} sendSignUp = {sendSignUp} username = {username} setUsername = {setUsername} hashedPassword = {hashedPassword} setHashedPassword = {setHashedPassword}/>:
            <ChatRoom setSignedIn = {setSignedIn} createChatBox = {createChatBox} sendMessage = {sendMessage} logOut = {logOut} username = {username} body = {body} setBody = {setBody} displayStatus = {displayStatus}
            isModalVisible = {isModalVisible} anotherUser = {anotherUser} setAnotherUser = {setAnotherUser} handleCancel = {handleCancel} activeKey = {activeKey} panes = {panes} onChange = {onChange} onEdit = {onEdit}
            />}
        </Wrapper>
    )
}

export default App
