import React from 'react';

import { Card } from 'react-swipeable-cards';

import { Container, Row, Col } from 'react-bootstrap';

//Import styles
import './CardSwipe.sass';

//Import Icon
import { Icon } from '@mdi/react';
import {
  mdiInformationOutline,
  mdiCardsHeart,
  mdiCloseCircleOutline
} from '@mdi/js';

const Cards = props => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
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
            <div className="card-title color-gray">
              <b>{props.name.toUpperCase()}</b>
            </div>
            A {Math.floor(props.distance)} km
          </div>
          <div className="col col-lg-3 justify-content-flex-end">
            <Icon
              onClick={() => console.log('holaa')}
              path={mdiInformationOutline}
              size={2.5}
              color="#41ACD8"
              className="icon"
            />
          </div>
        </div>
      </Card>

      <Container className="container-buttons">
        <Row>
          <Col className="col col-lg-6">
            <button
              className="choose-buttons border-color-red"
              onClick={props.dislike}
            >
              <Icon path={mdiCloseCircleOutline} size={2} color="#ff6961" />
            </button>
          </Col>
          <Col className="col col-lg-6">
            <button
              type="button"
              className="choose-buttons border-color-green"
              onClick={props.like}
            >
              <Icon path={mdiCardsHeart} size={2} color="#77dd77" />
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cards;
