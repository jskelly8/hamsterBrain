import Carousel from 'react-bootstrap/Carousel';
import Cat1 from '../assets/images/Cat1.webp';
import Cat2 from '../assets/images/Cat2.webp';
import Cat3 from '../assets/images/Cat3.webp';


function Hero() {
  return (
    <Carousel interval={3000}>
      <Carousel.Item>
        <img className="d-block w-100" src={Cat1} alt="First slide" style={{ width: "50%", margin: "auto" }}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Cat2} alt="Second slide" style={{ width: "50%", margin: "auto" }}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Cat3} alt="Third slide" style={{ width: "50%", margin: "auto" }}/>
      </Carousel.Item>
    </Carousel>
  );
}

export default Hero;