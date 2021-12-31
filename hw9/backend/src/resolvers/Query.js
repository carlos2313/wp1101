const Query = {
    async messages(parent, { chatBoxName }, { db }, info) {
        const chatBox = await db.ChatBoxModel.findOne({name: chatBoxName});
        if(!chatBox) 
            throw new Error("chatBox not found");
        // console.log(chatBox.messages)
        const messages = await Promise.all(
            chatBox.messages.map(
                (mId) => db.MessageModel.findById(mId))
        );
        return messages;
    },
};

export { Query as default };
