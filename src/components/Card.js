import React from "react";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import data from "../data.json";

function Card() {
  return data.map((item, index) => (
    <div className="col-lg-4 col-md-6 mb-4" key={index}>
      <div className="card">
        <Image className="card-img-top" src={item.image} alt="Card cap" />
        <div className="card-body">
          <h5 className="card-title">{item.title}</h5>
            <ul className="card-text">
              {item.item1 && <li>{item.item1}</li>}
              {item.item2 && <li>{item.item2}</li>}
              {item.item3 && <li>{item.item3}</li>}
              {item.item4 && <li>{item.item4}</li>}
            </ul>
          <Button variant="secondary" size="sm" href={item.more}>
            More..
          </Button>
        </div>
      </div>
    </div>
  ));
}

export default Card;
