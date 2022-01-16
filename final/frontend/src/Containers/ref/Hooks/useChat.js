import { useState } from "react";
import {
    ApolloClient,
    InMemoryCache,
} from "@apollo/client";

import { createUploadLink } from 'apollo-upload-client';

//const client = new WebSocket('ws://localhost:4000');

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:5000/graphql',
  }),
  cache: new InMemoryCache(),
});

const useChat = () => {
    const [status, setStatus] = useState({});
    /*
    const sendSignUp = (payload) => {
        sendData(["signUp", payload]);
    };

    // sendLogin({username: username, password: hashedPassword, secretKey: secretKey});
    const sendLogin = (payload) => {
        sendData(["logIn", payload]);
    };
    
    const createChatBox = (payload) => {
        sendData(["create", payload]);
    }
    const sendMessage = (payload) => {
        sendData(["input", payload]);
    };
    const logOut = () => {
        setPanes([]);
        sendData(["logOut"]);
    };
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
    */

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);    
        switch (task) {
            case "verificationStatus": {
                setStatus(payload); 
                break; 
            }
            case "createFailed":{
                setStatus(payload);
                break;
            }
            case "createSuccess":{
                setStatus(payload);
                handleOk();
                break;
            }
            case "init": {
                add(payload);
                break;
            }        
            case "sent": {//response for sender
                update(payload, 'sent');
                break; 
            }
            case "received": {//response for receiver
                update(payload, 'received');
                break;
            }
            case "status": {
                setStatus(payload); 
                break; 
            }
            default: break;
        }
    }


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [anotherUser, setAnotherUser] = useState('');
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const initialPanes = [
    //     { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
    //     { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
    //     { title: 'Tab 3', content: 'Content of Tab 3', key: '3' },
    ];
    const [newTabIndex, setNewTabIndex] = useState(3);
    const [activeKey, setActiveKey] = useState();
    const [panes, setPanes] = useState(initialPanes);
    const onChange = (activeKey) => {
        setActiveKey(activeKey);
    };
    
    const onEdit = (targetKey, action) => {
        if(action === 'add'){
            showModal();
        }
        if(action === 'remove') {
            remove(targetKey)
        }
    };
    
    const add = (existing_messages) => {
        setNewTabIndex(newTabIndex+1);
        const activeKey = `newTab${newTabIndex}`;
        const newPanes = [...panes];
        newPanes.push({ title: anotherUser, messages: existing_messages, key: activeKey });
        setPanes(newPanes);
        setActiveKey(activeKey);
    };

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = panes.filter(pane => pane.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if(lastIndex >= 0){
                newActiveKey = newPanes[lastIndex].key;
            }else{
                newActiveKey = newPanes[0].key;
            }
        }
        setPanes(newPanes);
        setActiveKey(activeKey);
    };

    const update = (payload, type) => {
        const { sender, receiver } = payload;
        let newPanes = [...panes];
        var newPane;
        if(type === 'sent'){
            newPane = newPanes.filter(pane => pane.title === receiver);
            if(newPane.length === 0){//sender doesn't open chatbox (another tab in browser)
                return;    
            }
            newPane = newPane[0];
        }else{
            newPane = newPanes.filter(pane => pane.title === sender);
            if(newPane.length === 0){//receiver doesn't open chatbox
                return;    
            }
            newPane = newPane[0];
        }
        console.log(sender, receiver, newPane.messages)
        newPane.messages.push(payload);
        setPanes(newPanes);
    }
    

    return {
        status,
        // sendLogin,
        // sendSignUp,
        // createChatBox,
        // sendMessage,
        // logOut,
        isModalVisible,
        anotherUser,
        setAnotherUser,
        handleCancel,
        activeKey,
        panes,
        onChange,
        onEdit,
    };

};



export default useChat;
