import React from 'react';

import { CardWrapper } from 'react-swipeable-cards';

//import placeholder images
import img1 from './img/perrito1.jpg';
import img2 from './img/conejo.jpg';
import img3 from './img/gato.jpg';

import Cards from './Cards';

const CardSwipe = () => {
  const [data, setData] = React.useState();

  function dislike() {
    console.log('Diste dislike');
    let pet = { mascotas: [...data.mascotas] };
    pet.mascotas.shift();
    setData(pet);
  }

  function like() {
    console.log('Diste like');
    let pet = { mascotas: [...data.mascotas] };
    pet.mascotas.shift();
    setData(pet);
  }
  return (
    <CardWrapper>
      {data.mascotas.map(d => {
        return (
          <Cards
            key={d.id}
            img={d.img}
            name={d.name}
            distance={d.distance}
            like={like}
            dislike={dislike}
          />
        );
      })}
    </CardWrapper>
  );
};

export default CardSwipe;
