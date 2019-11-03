import React from 'react';

const Spinner = ({ size }) => (
  <div className="papaSpinner">
    <div id="loader" style={{ width: size, height: size }}>
      <div></div>
      <div></div>
    </div>
  </div>
);

export default Spinner;
