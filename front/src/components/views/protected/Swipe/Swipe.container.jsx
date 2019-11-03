import React, { useEffect, useState } from 'react';

import { CardWrapper } from 'react-swipeable-cards';
import Cards from './Card.component';
import User from '../../../../containers/User.Container';

import Spinner from '../../../../shared/Spinner.component';
import useApi from '../../../../services/useApi';

const Swipe = () => {
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(0);
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
        if (response.data.length === 0) {
          setNoData(1);
        }
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
      {data.length === 0 ? (
        <Spinner size={130} message={noData} />
      ) : (
        <CardWrapper>
          {data.map((item, i) => {
            return (
              <Cards
                key={item.id}
                img={require(`../../../../assets/animals/image-2.jpg`)}
                name={item.name}
                distance={item.distance}
                age={item.age}
                description={item.description}
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
