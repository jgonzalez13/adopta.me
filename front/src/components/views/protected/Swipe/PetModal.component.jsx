import React from 'react';

import { Modal, Button} from 'react-bootstrap'
import './CardSwipe.sass'

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
        <Modal.Header closeButton>
          {props.img}
        </Modal.Header>
        <Modal.Body>
          <h4><b>{props.name}</b></h4>
          <p>
            A {props.distance}km de distancia
            <br />
            <b>Edad: </b>{props.age} años
            <br />
            <b>Descripción:</b>
            <br />
            {props.description}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default PetModal;