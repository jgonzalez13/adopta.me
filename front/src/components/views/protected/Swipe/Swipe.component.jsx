import React, { useEffect } from 'react';

import { CardWrapper } from 'react-swipeable-cards';
import Cards from './Card.component';
import User from '../../../../containers/User.Container';

import useApi from '../../../../services/useApi';

const Swipe = () => {
  const [data, setData] = React.useState([]);
  let user = User.useContainer();
  const fetchData = useApi();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);
    async function success(position) {
      try {
        console.log(position);
        const response = await fetchData(
          'GET',
          `/swipes?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        );
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    function error() {
      console.log('error');
    }
  }, [fetchData, user]);

  function dislike() {
    console.log('Diste dislike');
    let pet = { mascotas: [...data] };
    pet.mascotas.shift();
    setData(pet);
  }

  function like() {
    console.log('Diste like');
    let pet = { mascotas: [...data] };
    pet.mascotas.shift();
    setData(pet);
  }

  return (
    <CardWrapper>
      {data.map(d => {
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

export default Swipe;
