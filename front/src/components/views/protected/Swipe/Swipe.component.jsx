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
        console.log(response);
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
    <div className="swipe">
      {data.length < 0 ? (
        <Spinner size={130} />
      ) : (
        <CardWrapper>
          {data.map((item, i) => {
            return (
              <Cards
                key={item.id}
                img={require(`../../../../assets/animals/image-2.jpg`)}
                name={item.name}
                distance={item.distance}
                like={like}
                dislike={dislike}
              />
            );
          })}
        </CardWrapper>
      )}
    </div>
  );
};

export default Swipe;
