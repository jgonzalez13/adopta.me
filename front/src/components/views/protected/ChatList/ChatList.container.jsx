import React, { useState, useEffect } from 'react';

///API
import useApi from '../../../../services/useApi';

//Components
import ChatCard from '../ChatCard/ChatCard.container';

import Spinner from '../../../../shared/Spinner.component';

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
  const [data, setData] = React.useState([]);

  const fetchData = useApi();

  //Request data
  const getChats = async () => {
    try {
      const response = await fetchData('GET', '/chats');
      setData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('dsajkldsajlkd', data);
  useEffect(() => {
    getChats();
  }, []);

  return (
    <>
      {data.length === 0 ? (
        <Spinner size={130} />
      ) : (
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
                  {data.adopter.map(el => {
                    return (
                      <Col xs={12} sm={12}>
                        <ChatCard
                          petName={el.petName}
                          userName={el.adopterName}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </Tab>
            <Tab eventKey="profile" title="Interesados">
              <Container className="d-flex justify-content-center align-items-center pt-3">
                <Row className="chat-row">
                  {data.owner.map(el => {
                    return (
                      <Col xs={12} sm={12}>
                        <ChatCard
                          petName={el.petName}
                          userName={el.adopterName}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Container>
            </Tab>
          </Tabs>
        </div>
      )}
    </>
  );
};

export default ChatList;
