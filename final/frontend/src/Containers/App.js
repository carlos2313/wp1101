import { ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client';
import { useState, useEffect } from 'react';
import { message } from 'antd';
import styled from 'styled-components';
import UserPage from './UserPage';
import Tabs from './Tab';
import img from '../Images/background.png'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    margin: auto;
    background: url(${img}) repeat 0 0;
    background-size: contain;
`;

const LOCALSTORAGE_KEY = "save-username";

const client = new ApolloClient({
  link: createUploadLink({
    uri: 'http://localhost:5000/graphql',
  }),
  cache: new InMemoryCache(),
});


function App() {
    const savedUsername = localStorage.getItem(LOCALSTORAGE_KEY);
    
    const [username, setUsername] = useState(savedUsername || "");
    const [hashedPassword, setHashedPassword] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const secretKey = 'password';
  
    const displayStatus = (payload) => {
        if (payload.msg) {
            const { type, msg } = payload;
          const content = { content: msg, duration: 1 };
            
            message.config({
              top: 60,
              duration: 2,
              maxCount: 3,
            });
            
            switch (type) {
                case 'success':
                    if(msg === 'Login success'){
                        setSignedIn(true);
                    }
                    message.success(content);
                    break;
                case 'error':
                default:
                    message.error(content);
                    break;
            }
        }
    };
    useEffect(() => {
        if (signedIn) 
            localStorage.setItem(LOCALSTORAGE_KEY, username);
    }, [signedIn, username]);
  return (
    <ApolloProvider client={client}>
      <Wrapper>
        {!signedIn ? 
          <Tabs
            client={client}
            displayStatus={displayStatus}
            setSignedIn={setSignedIn}
            username={username}
            setUsername={setUsername}
            hashedPassword={hashedPassword}
            setHashedPassword={setHashedPassword}
            secretKey={secretKey}
            />
          :
          <UserPage setSignedIn={setSignedIn} username={username} password={hashedPassword} displayStatus={displayStatus} secretKey={secretKey}/>
        }
      </Wrapper>
    </ApolloProvider>
  );
}

export default App;
