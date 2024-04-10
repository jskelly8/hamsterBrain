import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/images/AdobeStock_1.jpeg';
import img2 from '../assets/images/AdobeStock_2.jpeg';
import img3 from '../assets/images/AdobeStock_3.jpeg';
import img4 from '../assets/images/AdobeStock_4.jpeg';
import img5 from '../assets/images/AdobeStock_5.jpeg';

function Hero() {
  return (
    <div style={{ width: '100%', height: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Carousel interval={3000} style={{ width: '100%', height: '75vh' }}>
        <Carousel.Item>
          <img
            className="d-block"
            src={img1}
            alt="Stained wooden blocks that make out the phrase 'Make it happen'"
            style={{ maxHeight: '75vh', maxWidth: '75%', objectFit: 'contain', margin: 'auto', display: 'block' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={img2}
            alt="Blue sky with boy standing in a victorious pose as a silhouette"
            style={{ maxHeight: '75vh', maxWidth: '75%', objectFit: 'contain', margin: 'auto', display: 'block' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={img3}
            alt="Notepad with a pen on top that says 'Dream It Wish IT Do It'"
            style={{ maxHeight: '75vh', maxWidth: '75%', objectFit: 'contain', margin: 'auto', display: 'block' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={img4}
            alt="Small wooden blocks with stamped letters that spell out 'work hard dream big stay positive'"
            style={{ maxHeight: '75vh', maxWidth: '75%', objectFit: 'contain', margin: 'auto', display: 'block' }}
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={img5}
            alt="Hiker with a backpack hiking up a hill as a silhouette in front of a sunrise"
            style={{ maxHeight: '75vh', maxWidth: '75%', objectFit: 'contain', margin: 'auto', display: 'block' }}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Hero;