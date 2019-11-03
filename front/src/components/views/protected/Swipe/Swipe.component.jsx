import React, { useEffect } from 'react';

import User from '../../../../containers/User.Container';

import useApi from '../../../../services/useApi';

const Swipe = () => {
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
      } catch (error) {
        console.log(error);
      }
    }
    function error() {
      console.log('error');
    }
  }, [fetchData, user]);

  return <div>Ready</div>;
};

export default Swipe;
