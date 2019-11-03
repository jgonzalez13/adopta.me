import React, { useEffect } from 'react';

import { CardWrapper } from 'react-swipeable-cards';
import Cards from './Card.component';
import User from '../../../../containers/User.Container';

import Spinner from '../../../../shared/Spinner.component';
import useApi from '../../../../services/useApi';

const Swipe = () => {
  const [data, setData] = React.useState([]);
  let user = User.useContainer();
  const fetchData = useApi();

  useEffect(() => {
    return navigator.geolocation.getCurrentPosition(success, error);
    async function success(position) {
      try {
        const response = await fetchData(
          'GET',
          `/swipes?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        );
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
    let pet = [...data];
    pet.shift();
    setData(pet);
  }

  function like() {
    let pet = [...data];
    pet.shift();
    setData(pet);
  }

  return (
    <>
      {data.length < 0 ? (
        <Spinner size={130} />
      ) : (
        <CardWrapper>
          {data.map(item => {
            return (
              <Cards
                key={item.id}
                img={item.img}
                name={item.name}
                distance={item.distance}
                like={like}
                dislike={dislike}
              />
            );
          })}
        </CardWrapper>
      )}
    </>
  );
};

export default Swipe;
