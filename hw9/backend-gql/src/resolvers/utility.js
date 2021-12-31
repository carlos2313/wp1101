const makeName = (name1, name2) => {
    return [name1, name2].sort().join('_');
};

const checkUser = (db, username, errFunc) => {
    if(!username) 
        throw new Error('Missing user name for ' + errFunc);
    return db.UserModel.findOne({username});
};

const checkMessage = async (db, from, to, errFunc) => {
    const chatBoxName = makeName(from, to);
    return{
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        receiver: await checkUser(db, to, errFunc)
    }
}

const checkChatBox = (db, chatBoxName, errFunc) => {
    if(!chatBoxName) 
        throw new Error('Missing chatBox name for ' + errFunc);
    return db.ChatBoxModel.findOne({name: chatBoxName});
};

const newUser = (db, username, password) => {
    return new db.UserModel({username, password}).save();
}

const newMessage = (db, sender, body) => {
    return new db.MessageModel({sender, body}).save();
}

const newChatBox = (db, chatBoxName) => {
    return new db.ChatBoxModel({name: chatBoxName}).save();
}

export{
    makeName,
    checkUser,
    checkMessage,
    checkChatBox,
    newUser,
    newMessage,
    newChatBox
}