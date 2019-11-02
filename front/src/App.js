import React from 'react';
import User from './containers/User.Container';

import Routes from './routes/index';

const App = () => (
  <User.Provider>
    <Routes />
  </User.Provider>
);

export default App;
