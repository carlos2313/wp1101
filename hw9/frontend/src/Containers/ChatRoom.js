import { Button, Input, Modal, Form, Tabs} from 'antd';
import Title from '../Components/Title';
import Message from '../Components/Message';
import { ChatBoxMessages } from '../Components/ChatBoxMessages';

const ChatRoom = (props) => {
    const { setSignedIn, createChatBox, sendMessage, username, body, setBody, displayStatus, 
        isModalVisible, anotherUser, setAnotherUser, handleCancel, activeKey, panes, onChange, onEdit, logOut} = props;
    
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const { TabPane } = Tabs;

    return (
        <>
        <Title>
            <h1>{username}'s Chat Room</h1>
            <Button type="primary" danger onClick={()=>{
                setSignedIn(false);        
                logOut();        
            }}>
            Log out
            </Button>
        </Title>
        <Message>
            <Tabs type="editable-card" onChange={onChange} activeKey={activeKey} onEdit={onEdit}>
                {panes.map(pane => (
                    <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                        <ChatBoxMessages username = {username} chatBoxName = {pane.chatBoxName}/>
                    </TabPane>
                ))}
            </Tabs>
        </Message>
        <Input.Search
            enterButton="Send"
            placeholder="Type a message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onSearch={async (msg) => {
                if (!msg) {
                    displayStatus({
                        status: 'Failed',
                        message: 'Please enter a message body.'
                    });
                    return;
                }
                if(panes.length === 0) {
                    displayStatus({
                        status: 'Failed',
                        message: 'Please create a Chatbox first.'
                    });
                    return;
                }
                const receiver = panes.filter(pane => pane.key === activeKey)[0].title;
                await sendMessage({
                    variables: {
                        from: username,
                        to: receiver,
                        message: msg
                    },
                });
                setBody('');
            }}
        ></Input.Search>
        <Modal title="Create a new chat room" visible={isModalVisible} onCancel={handleCancel} 
        footer={[
            <Button form="inputUserName" key="submit" htmlType="submit" type="primary" onClick={async ()=>{
                if(anotherUser){
                    const ChatBoxExists = panes.filter(pane => pane.title === anotherUser);
                    if(ChatBoxExists.length !== 0){
                        displayStatus({
                            status: 'Failed',
                            message: 'Chatbox exists.'
                        });
                    }else{
                        await createChatBox({
                            variables: {
                                name1: username,
                                name2: anotherUser,
                            },
                        });
                        
                    }
                }
            }}>
                Create
            </Button>
        ]}
        >
            <Form id="inputUserName" name="basic" labelCol={{span: 6}} wrapperCol={{span: 16}} initialValues={{remember: true}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <Form.Item label="Username" name="username" rules={[
                    {
                        required: true,
                        message: 'Please input the username you want to chat with!',
                    },
                ]}>
                    <Input onChange={(e) => setAnotherUser(e.target.value)}/>
                </Form.Item>
            </Form>
      </Modal>
        </>
    )
}

export default ChatRoom;
