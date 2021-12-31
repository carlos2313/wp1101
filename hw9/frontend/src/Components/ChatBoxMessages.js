import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MESSAGES_QUERY, MESSAGE_SUBSCRIPTION } from '../graphql/inedx';
import { Tag } from 'antd';

export const ChatBoxMessages = ({username, chatBoxName}) => {
    const { loading, error, data, subscribeToMore } = useQuery(MESSAGES_QUERY, {variables:{chatBoxName}});
    useEffect(() => {
        try {
          subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            variables: { chatBoxName },
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.message.message;
    
              return {
                ...prev,
                messages: [...prev.messages, newMessage],
              };
            },
          });
        } catch (e) {}
    }, [chatBoxName, subscribeToMore]);
    if (loading) 
      return <p>"Loading...";</p>;
    if (error) 
      return <p>"Error!"</p>;
    return(
      data.messages.map(({ sender, body }, i) => 
      (username === sender.username)?
      (   <p key={i} style={{textAlign:'right', wordWrap:'break-word'}}>
              <span style={{display:'inline-block', width: '350px', margin:'5px'}}>{body}</span> 
              <span><Tag color="blue">{sender.username}</Tag></span> 
          </p>
      ):(
          <p key={i} style={{verticalAlign:'top', wordWrap:'break-word'}}>
              <Tag color="blue">{sender.username}</Tag> 
              <span style={{display:'inline-block', width: '350px', margin:'5px'}}>{body}</span> 
          </p>
      )
      )
    );
}