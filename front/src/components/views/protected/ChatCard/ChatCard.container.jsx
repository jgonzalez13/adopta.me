import React from 'react';
import { useHistory } from 'react-router-dom';

//API
import useApi from '../../../../services/useApi';

//Bootstrap components
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import Spinner from '../../../../shared/Spinner.component';

//Styles
import './ChatCard.sass';
import placeholderMascota from '../../../../assets/chatCard/placeholderMascota.png';

const ChatCard = props => {
  const [data, setData] = React.useState([]);
  let history = useHistory();
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

  getChats();

  let chatId = 1000;
  return (
    <>
      {data.length === 0 ? (
        <Spinner size={130} />
      ) : (
        <Card
          border="success"
          className="mb-3 d-flex flex-row px-4  py-2 chat-card"
          onClick={() => history.push(`/chat/${chatId}`)}
        >
          <Image
            src={placeholderMascota}
            roundedCircle
            className="border px-2 py-2 img-mascota"
          />
          <Card.Body>
            <Card.Title>Sr. Conejo</Card.Title>
            <Card.Text className="pl-2">Por: Jonathan</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default ChatCard;
