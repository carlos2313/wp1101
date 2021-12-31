const Subscription = {
    message: {
        async subscribe(parent, { chatBoxName }, { db, pubsub }, info) {
            const chatBox = await db.ChatBoxModel.findOne({name: chatBoxName});
            if (!chatBox) {
                throw new Error('chatBox not found');
            }
            return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
        },
    },
};

export { Subscription as default };
