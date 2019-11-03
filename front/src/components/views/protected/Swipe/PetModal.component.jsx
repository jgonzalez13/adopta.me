import React from 'react';

import { Modal, Button } from 'react-bootstrap';
import './CardSwipe.sass';

const PetModal = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      width="100VW"
      height="100VH"
    >
      <Modal.Header closeButton>{/* <img src={props.img}/> */}</Modal.Header>
      <Modal.Body>
        <h4>
          <b>{props.name.toUpperCase()}</b>
        </h4>
        <p>
          A {Math.floor(props.distance / 1000)}km de distancia
          <br />
          <b>Edad: </b>
          {props.age > 12
            ? Math.floor(props.age / 12) + ' años'
            : props.age + ' meses'}
          <br />
          <b>Descripción:</b>
          <br />
          {props.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} className="btnl--pink">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PetModal;
