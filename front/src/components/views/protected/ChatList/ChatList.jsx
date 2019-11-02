import React, { useState } from 'react';

//Components
import ChatCard from '../ChatCard/ChatCard';

//Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import './ChatList.sass';

const ChatList = () => {
  const [key, setKey] = useState('home');

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k)}
      >
        <Tab eventKey="home" title="Adoptar">
          <Container className="d-flex justify-content-center align-items-center pt-5">
            <Row>
              <Col xs={12} sm={12}>
                <ChatCard />
              </Col>
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="profile" title="Interesados">
          <Container>
            <ChatCard />
          </Container>
        </Tab>
      </Tabs>
    </>
  );
};

export default ChatList;
