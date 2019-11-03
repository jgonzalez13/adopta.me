import React from 'react';

import { Card } from 'react-swipeable-cards';

import { Container, Row, Col, Button } from 'react-bootstrap';

//Import styles
import './CardSwipe.sass';

//Import Icon
import { Icon } from '@mdi/react';
import { mdiInformationOutline } from '@mdi/js';

const Cards = props => {
  const [modalShow, setModalShow] = React.useState(false);

  // return data.mascotas.map(d => {
  return (
    <>
      {
        <Card
          style={{
            backgroundImage: `url(${props.img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        >
          <div
            className="fixed-bottom card-info-container row"
            onClick={() => setModalShow(true)}
          >
            <div className="col">
              <div className="card-title">{props.name}</div>A {props.distance}km
              de distancia
            </div>
            <div className="col col-lg-3">
              <Icon
                path={mdiInformationOutline}
                size={2.5}
                color="#000"
                className="icon"
              />
            </div>
          </div>
        </Card>
      }
      <Container className="container-buttons">
        <Row>
          <Col className="col col-lg-6">
            <Button
              type="button"
              className="choose-buttons"
              onClick={props.dislike}
            ></Button>
          </Col>
          <Col className="col col-lg-6">
            <Button
              type="button"
              className="choose-buttons"
              onClick={props.like}
            ></Button>
          </Col>
        </Row>
      </Container>
    </>
  );
  // });
};

export default Cards;
