import React from 'react';
import { useHistory } from 'react-router-dom';

//Bootstrap components
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

//Styles
import './ChatCard.sass';
import placeholderMascota from '../../../../assets/chatCard/placeholderMascota.png';

const ChatCard = props => {
  let history = useHistory();
  let chatId = 15;
  return (
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
  );
};

export default ChatCard;
