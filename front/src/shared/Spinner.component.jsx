import React from 'react';

const Spinner = ({ size, message }) => (
  <div className="spinner">
    <div className="papaSpinner">
      <div
        id="loader"
        style={{
          width: size,
          height: size,
          animation: message === 1 ? 'initial' : null
        }}
      >
        <div style={{ animation: message === 1 ? 'initial' : null }}></div>
        <div style={{ animation: message === 1 ? 'initial' : null }}></div>
      </div>
    </div>{' '}
    {message === 1 ? (
      <div className="text">
        <p>No se encontraron </p>
        <p>perritos en tu zona</p>
      </div>
    ) : null}
  </div>
);

export default Spinner;
