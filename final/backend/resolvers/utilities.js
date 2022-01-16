import User from "../models/User";

import bcrypt from "bcrypt";
import crypto from "crypto-js";

const checkUser = async (username, password, secretKey) => {
    console.log("checkUser:", username, password, secretKey);
        
    const user = await User.findOne({ username: username });
        
    if (!user) {
        console.log("Username doesn't exist");
        return { type: 'error', msg: "Username doesn't exist."};
    } else {
        const originalPassword = crypto.AES.decrypt(password, secretKey).toString(crypto.enc.Utf8);
        const passwordIsCorrect = await bcrypt.compare(originalPassword, user.password);
        if (passwordIsCorrect) { //give identity //may have some bugs(doesn't delete when unconnection) 
            // loginClients.push({username: username, client: ws});
            console.log('login success');
            return { type: 'success', msg: 'Login success' };
        } else {
            console.log('login failed');
            return { type: 'error', msg: 'Login failed. Password is wrong' };
        }
    }
}

export default checkUser;