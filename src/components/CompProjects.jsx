import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselImage from './CaroselImage.jsx';
import mexb from "../images/mexb.png";
import erec from "../images/erec.png";

function CompProjects() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <CarouselImage pic={mexb} />
        <Carousel.Caption>
          <a href="https://doi.org/10.1021/acs.jpcb.3c05845" target="_blank">
            <h3>MexB Inhibitors</h3>
            <p>DST (SERB) Funded Project: 
            <br/>Prediction of MexB Efflux Pump Inhibitors: A complete Machine Learning and Molecular Dynamics approach
            </p>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage pic={erec} />
        <Carousel.Caption>
          <a href="https://drive.google.com/file/d/1C5NlFdb0n3bDihn7Gv2fDqKNTCHAO9Iv/view?usp=share_link" target="_blank">
            <h3>EreC Dynamics</h3>
            <p>MSc Thesis Project:
            <br/>Molecular Dynamics of Erethromycin Esterase (EreC): Binding Mechanism with Erythromycin and Azithromycin
            </p>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <style>
        {`
        .carousel, .carousel-inner {
            border-radius: var(--bs-border-radius);
        }

        .carousel {
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            height: 483px;
        }

        .carousel-caption {
            background-color: var(--bs-body-bg);
            border-radius: var(--bs-border-radius);
            padding: 10px;
            position: absolute;
            right: 10%;
            left: 10%;
            height: 40%;
        }

        .carousel-caption h3 {
            background-color: var(--secondary-color);
            border-radius: var(--bs-border-radius);
            color: var(--tertiary-color) !important;
        }

        .carousel-caption p {
            margin-bottom: 0;
            color: var(--bs-body-color);
            font-weight: bold;
        }

        .carousel-indicators {
            margin-bottom: 0;
        }

        .carousel-control-prev-icon {
            background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" fill="%23fff"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>');
        }

        .carousel-control-next-icon {
            background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" fill="%23fff"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"/></svg>');
        }
        `}
      </style>
    </div>
  );
}

export default CompProjects;