import React from "react";
import { Button, Card } from "react-bootstrap";
import data from "../data.json";

function Cards() {
  return data.map((item, index) => (
    <div className="col-lg-4 col-md-6 mb-4" key={index}>
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
          <Button variant="secondary" size="sm" href={item.more}>
            More..
          </Button>
        </Card.Body>
      </Card>
    </div>
  ));
}

export default Cards;
