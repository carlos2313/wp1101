import WebSocket from 'ws';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import http from "http";
import {Message} from './models/Message';
import {User} from './models/User';
import ChatBox from './models/ChatBox';
import {sendData, sendStatus, initData} from './wssConnect';
import bcrypt from "bcrypt";
import crypto from "crypto-js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

var loginClients = [];

db.once('open', () => {    
    wss.on('connection', (ws) => {
        ws.onmessage = async (byteString) => {
            const { data } = byteString;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case 'logIn': {
                    const {username, password, secretKey} = payload;
                    console.log(payload);
                    const user = await User.findOne({username: username});
                    if(!user){
                        sendData(["verificationStatus", { type: 'error', msg: "Username doesn't exist."}], ws);
                        console.log("Username doesn't exist");
                    }else{
                        const originalPassword = crypto.AES.decrypt(password, secretKey).toString(crypto.enc.Utf8);
                        // console.log(originalPassword);
                        const passwordIsCorrect =  await bcrypt.compare(originalPassword, user.password);
                        if(passwordIsCorrect){//give identity //may have some bugs(doesn't delete when unconnection) 
                            loginClients.push({username: username, client: ws});
                            // console.log('clients', loginClients);
                            sendData(["verificationStatus", { type: 'success', msg: 'Login success'}], ws);
                            console.log('login success');
                        }else{
                            sendData(["verificationStatus", { type: 'error', msg: 'Login failed. Password is wrong'}], ws);
                            console.log('login failed');
                        }
                    }
                    break;
                }

                case 'signUp': {
                    const {username, password} = payload;
                    console.log(payload);
                    const existing = await User.findOne({username: username});
                    if(existing){
                        sendData(["verificationStatus", { type: 'error', msg: 'Username exists.'}], ws);
                        console.log('username exists')
                    }else{
                        await User.create({username: username, password: password});
                        sendData(["verificationStatus", { type: 'success', msg: 'Account created'}], ws);
                        console.log('account created')
                    }
                    break;
                }
                case 'create': {
                    const {users} = payload;
                    var [user1, user2] = users;
                    const user2existing = await User.findOne({username: user2});
                    if(!user2existing){
                        sendData(["createFailed", { type: 'error', msg: "Username doesn't exist."}], ws);
                        console.log("user doesn't exist")
                        break;
                    }
                    if(user1>user2){//lexicographic order
                        const temp = user2;
                        user2 = user1;
                        user1 = temp;
                    }
                    const existing = await ChatBox.findOne({users:[user1, user2]});
                    if(!existing){
                        await ChatBox.create({users:[user1, user2]});
                    }
                    sendData(["createSuccess", { type: 'success', msg: "ChatBox created."}], ws);
                    console.log('chatbox created');
                    initData(user1, user2, ws);
                    break;
                }

                case 'input': {
                    const { sender, receiver, body, timestamp} = payload;
                    const message = new Message({ sender, receiver, body, timestamp });
                    var [user1, user2] = [sender, receiver];
                    if(user1>user2){//lexicographic order
                        const temp = user2;
                        user2 = user1;
                        user1 = temp;
                    }
                    await ChatBox.updateOne({users:[user1, user2]}, { $push: { messages: message } });
                    console.log(payload);
                    //may have multiple tabs in browsers
                    const senders = loginClients.filter(loginClient => loginClient.username === sender);
                    senders.forEach(sender => {
                        sendData(['sent', payload], sender.client)
                        sendStatus({ type: 'success', msg: 'Message sent.'}, sender.client);
                    });

                    const receivers = loginClients.filter(loginClient => loginClient.username === receiver && loginClient.username !== sender);//message to self
                    receivers.forEach(receiver => {
                        sendData(['received', payload], receiver.client)
                        sendStatus({ type: 'success', msg: 'Message received.'}, receiver.client);
                    });
                    break;
                }
                case 'logOut': {
                    const logOutClient = loginClients.filter(client => client.client === ws)[0];
                    const logOutIndex = loginClients.indexOf(logOutClient);
                    loginClients.splice(logOutIndex, 1);
                    // console.log(loginClients);
                    break;
                }
                default:
                    break;
            }
        } 
    })
    const PORT = process.env.port || 4000;
    server.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
})