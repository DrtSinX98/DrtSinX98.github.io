import React from "react";
import { Col, Image } from "react-bootstrap";
import pfp from "../images/pfp.jpg";

function Rimage() {
  return (
    <Col lg={4} className="image-p">
      <Image src={pfp} alt="my-pic" className="mb-4" roundedCircle fluid />
      <style>
        {`
          .rounded-circle {
            width: 250px;
            height: 250px;
            border: 5px solid #301934;
          }

          .rounded-circle:hover {
            border: 5px solid #c91574;
          }

          @media (max-width: 767px) {
            .image-p {
              display: flex;
              justify-content: center;
            }
          }
      `}
      </style>
    </Col>
  );
}

export default Rimage;
