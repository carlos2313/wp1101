import WebSocket from 'ws';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
import http from "http";
import Message from './models/Message';
import User from './models/User';
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

const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

db.once('open', () => {
    wss.on('connection', (ws) => {
        initData(ws);
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
                        if(passwordIsCorrect){
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
                case 'input': {
                    const { name, body } = payload;
                    const message = new Message({ name, body });
                    console.log(payload);
                    try { 
                        await message.save();
                    } catch (e) { throw new Error
                        ("Message DB save error: " + e);
                    }
                    broadcastMessage(['output', [payload]], { type: 'success', msg: 'Message sent.'});
                    // sendData(['output', [payload]], ws);
                    // sendStatus({
                    //     type: 'success',
                    //     msg: 'Message sent.'
                    // }, ws);
                    break;
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(['cleared'], { type: 'info', msg: 'Message cache cleared.'});
                        // sendData(['cleared'], ws);
                        // sendStatus({ type: 'info', msg: 'Message cache cleared.'}, ws);
                    });
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