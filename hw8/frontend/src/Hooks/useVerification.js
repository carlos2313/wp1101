import { useState } from "react";

const client = new WebSocket('ws://localhost:4000');

const useVerification = () => {
    const [verificationStatus, setVerificationStatus] = useState({});

    const sendLogin = (payload) => {
        sendData(["logIn", payload]);
    };
    const sendSignUp = (payload) => {
        sendData(["signUp", payload]);
    };
    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };
    
    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);    
        switch (task) {
            case "verificationStatus": {
                setVerificationStatus(payload); 
                break; 
            }
            default: break;
        }
    }

    return {
        verificationStatus,
        sendLogin,
        sendSignUp,
    };

};



export default useVerification;
