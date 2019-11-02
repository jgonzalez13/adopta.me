import React, { Component } from 'react';
// import { render } from 'react-dom';
import { Card, CardWrapper } from 'react-swipeable-cards';
// import CardBootstrap from 'react-bootstrap/Card';

//Import styles
import './CardSwipe.sass';

//import placeholder images
import img1 from './img/perrito1.jpg';
import img2 from './img/conejo.jpg';
import img3 from './img/gato.jpg';

class CardSwipe extends Component {
  data = {
    mascotas: [
      {
        id: 1,
        img: img1,
        name: 'Lomito'
      },
      {
        id: 2,
        img: img2,
        name: 'Conejo'
      },
      {
        id: 3,
        img: img3,
        name: 'Toncho'
      }
    ]
  };
  onSwipeLeft(data) {
    console.log('I was swiped left.');
  }

  onSwipeRight(data) {
    console.log('I was swiped right.');
  }
  onSwipe(data) {
    console.log('I was swiped.');
  }
  onDoubleTap(data) {
    console.log('I was double tapped.');
  }

  renderCards() {
    return this.data.mascotas.map(d => {
      return (
        <>
          <Card
            key={d.id}
            onSwipe={this.onSwipe.bind(this)}
            onSwipeLeft={this.onSwipeLeft.bind(this)}
            onSwipeRight={this.onSwipeRight.bind(this)}
            onDoubleTap={this.onDoubleTap.bind(this)}
            style={{
              backgroundImage: `url(${d.img})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            {/* <Card.Img src={d.img} variant="top" /> */}
            {d.name}
            {/* <CardBootstrap>
              <CardBootstrap.Text variant="bottom">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardBootstrap.Text>
            </CardBootstrap> */}
          </Card>
        </>
      );
    });
  }

  render() {
    return <CardWrapper>{this.renderCards()}</CardWrapper>;
  }
}
export default CardSwipe;
