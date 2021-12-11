import ChatBox from './models/ChatBox';
const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const initData = async (user1, user2, ws) => {
    const chatBox = await ChatBox.findOne({users:[user1, user2]});
    const messages = chatBox.messages;
    // initialize app with existing messages
    sendData(['init', messages], ws);
}
  
export { sendData, sendStatus, initData};
