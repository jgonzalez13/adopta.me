import React, { useState, useEffect } from 'react';

import './ChatCard.sass';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import placeholderMascota from './img/placeholderMascota.png';

const ChatCard = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`You've clicked ${count} times`);
  });

  return (
    <Card
      border="success"
      className="mb-3 d-flex flex-row px-4  py-2 chat-card"
      onClick={() => setCount(count + 1)}
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
