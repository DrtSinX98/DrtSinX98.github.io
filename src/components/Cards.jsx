import React from "react";
import { Card, Col } from "react-bootstrap";
import data from "../data.json";
import ToastButton from "./ToastButton";

function Cards() {
  return data.map((item, index) => (
    <Col lg={4} md={6} className="mb-4" key={index}>
      <Card>
        <Card.Img variant="top" src={item.image} alt="Card cap" />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <ul className="card-text">
            {item.item1 && <li>{item.item1}</li>}
            {item.item2 && <li>{item.item2}</li>}
            {item.item3 && <li>{item.item3}</li>}
            {item.item4 && <li>{item.item4}</li>}
          </ul>
          <ToastButton/>
        </Card.Body>
      </Card>
      <style>
        {`
        .card {
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          transition: 0.3s;
        }
        
        .card-img-top {
          height: 250px;
          object-fit: cover;
        }
        
        .card-title {
          font-size: 24px;
          font-weight: bold;
        }
        
        .card-text {
          font-size: 18px;
          line-height: 1.5;
        }
        
        .card:hover {
          box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }
        `}
      </style>
    </Col>
  ));
}

export default Cards;
