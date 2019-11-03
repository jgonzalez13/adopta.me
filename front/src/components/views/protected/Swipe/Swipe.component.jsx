import React, { useEffect } from 'react';

import User from '../../../../containers/User.Container';

const Swipe = () => {
  let user = User.useContainer();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error);

    function success(position) {
      user.setLat(position.coords.latitude);
      user.setLng(position.coords.longitud);
      console.log('hola');
    }

    function error() {
      console.log('error');
    }
  }, [user]);

  return <div>Ready</div>;
};

export default Swipe;
