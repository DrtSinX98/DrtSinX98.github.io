import React from "react";
import { Button } from "react-bootstrap";
import { Image } from "react-bootstrap"
import data from './data.json';

function Card() {
    return (
    data.map((item) => (
        <div className="col-lg-4 col-md-6 mb-4">
                <div key={item.title} className="card">
                    <Image className="card-img-top" src={item.image} alt="Card cap" />
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">
                            <ul>
                                {item.item1 && <li>{item.item1}</li>}
                                {item.item2 && <li>{item.item2}</li>}
                                {item.item3 && <li>{item.item3}</li>}
                                {item.item4 && <li>{item.item4}</li>}
                            </ul>
                        </p>
                        <Button href={item.more} className="btn btn-primary">More..</Button>
                    </div>
                </div>
            </div>
    ))
    )
}

export default Card