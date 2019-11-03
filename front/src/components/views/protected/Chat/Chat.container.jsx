import React, { useState, useEffect } from 'react';
import SendBirdProvider from '../SendBird/SendBird';

//Import Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Import Styles
import './Chat.sass';
const sb = new SendBirdProvider();

const Chat = () => {
  const [messageInput, setMessageInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  let userID = '10';

  useEffect(() => {
    const connectUser = async userID => {
      if (!connected) {
        let response = await sb.connect(userID);
        setConnected(response);
        console.log(response);
        if (response) {
          console.log('connected');
        }
        try {
          console.log(response);
        } catch (err) {
          console.log('There was an error', err);
        }
      }
    };
    const updateData = async () => {
      let res2 = await sb.addHandlerChannel();
      fetchPreviusMessages();
    };
    updateData();
    connectUser(userID);
  });

  const sendMessage = async () => {
    console.log('VOY A MANDAR UN MENSAJE', messageInput);

    console.log(sb.sendMessage(messageInput));
    let response = await sb.loadPreviousMessages();
    setMessages(response);
    fetchPreviusMessages();
    try {
      console.log(response);
    } catch (err) {
      console.log('There was an error', err);
    }
  };

  const fetchPreviusMessages = async () => {
    console.log('Loading previous messages');
    let response = await sb.loadPreviousMessages();
    setMessages(response);

    try {
      console.log(response);
    } catch (err) {
      console.log('There was an error', err);
    }
  };

  return (
    <Container className="main-chat-container">
      <Row>
        <Col xs={12} sm={12}>
          <input
            type="text"
            placeholder="Escrbie un mensaje"
            onChange={e => {
              setMessageInput(e.target.value);
            }}
          ></input>
          <button onClick={() => sendMessage()}>Enviar mensaje</button>
        </Col>
      </Row>
      {messages.map(el => {
        return (
          <Row>
            <Col>
              <div>{el.message}</div>
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default Chat;
