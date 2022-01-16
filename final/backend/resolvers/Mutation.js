import { readFile } from "../utilities/readFile";
import SingleFile from "../models/singleUploadModel";

import User from "../models/User";
import checkUser from './utilities';

const Mutation = {
    async singleUpload(_, { username, password, secretKey, file, exam }) {
        const checkUserMessage = await checkUser(username, password, secretKey);
        if (checkUserMessage.type != 'success') {
            return checkUserMessage;
        }
        const { imageUrl, filePath } = await readFile(file, username, exam);
        const singleFile = new SingleFile({image: imageUrl});
        await singleFile.save();
        return { type: 'success', msg: `${filePath} uploaded successfully!` };
    },

    async signUp(_, { username, password }) {
        console.log(username, password);
        const existing = await User.findOne({username: username});
        if (existing) {
            console.log('username exists')
            return { type: 'error', msg: 'Username exists.' };
        } else {
            console.log('account created')
            await User.create({ username: username, password: password });
            return { type: 'success', msg: 'Account created'};
        }
    },
    async login(_, { username, password, secretKey }) {
        console.log('In Login');
        return checkUser(username, password, secretKey);
    },
    logout() {
        console.log('In Logout');
        return { type: 'success', msg: 'Logout success' }; 
    }
};

export { Mutation as default };
