import React, { useState } from 'react';

//Components
import ChatCard from '../ChatCard/ChatCard.container';

//Bootstrap components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

//Styles
import './ChatList.sass';

const ChatList = props => {
  const [key, setKey] = useState('home');

  return (
    <div className="chat-container">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
        className="bold"
      >
        <Tab eventKey="home" title="Adoptar">
          <Container className="d-flex justify-content-center align-items-center pt-3">
            <Row className="chat-row">
              <Col xs={12} sm={12}>
                <ChatCard />
              </Col>
              <Col xs={12} sm={12}>
                <ChatCard />
              </Col>
              <Col xs={12} sm={12}>
                <ChatCard />
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="profile" title="Interesados">
          <Container className="d-flex justify-content-center align-items-center pt-3">
            <Row className="chat-row">
              <Col xs={12} sm={12}>
                <ChatCard />
              </Col>

              <Col xs={12} sm={12}>
                <ChatCard />
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ChatList;
