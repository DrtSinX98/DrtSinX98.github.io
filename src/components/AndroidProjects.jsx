import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselImage from './CaroselImage.jsx';
import cyan from "../images/cyan.png";
import twrp from "../images/twrp.png";
import kern from "../images/kern.png";
import rui from "../images/rui.png";

function AndroidProjects() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
      <CarouselImage pic={cyan} />
        <Carousel.Caption>
          <a href="https://github.com/Los-FE" target="_blank">
            <h3>Cyanide Project</h3>
            <p>Lead Developer of Cyanide custom ROM project that is built on top of Lineage OS with various features and Redesigned User Interface</p>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage pic={twrp} />
        <Carousel.Caption>
          <a href="https://twrp.me/realme/realme8i.html" target="_blank">
            <h3>TWRP Spaced</h3>
            <p>Official maintainer of TeamWin Recovery Project for Realme 8i (spaced). TWRP is a Custom Recovery used to flash custom partitions in device</p>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage pic={kern} />
        <Carousel.Caption>
          <a href="https://xdaforums.com/t/kernel-4-14-cyanide-kernel-1-0-for-realme-8i-spaced.4447145/" target="_blank">
            <h3>Cyanide Kernel</h3>
            <p>Developer of Cyanide Kernel for Realme 8i and 8s 5G. Cyanide kernel is a Custom Kernel with various device specific tweaks and optimizations</p>
          </a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImage pic={rui} />
        <Carousel.Caption>
          <a href="https://github.com/DrtSinX98/Debloat" target="_blank">
            <h3>Realme Debloater</h3>
            <p>Scripts for removing unwanted apps from realme UI 2.0 and higher. Realme UI comes with lots of bloatwares, this script helps removing those.</p>
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

export default AndroidProjects;