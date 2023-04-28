import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Card from './Card';
import pfp from "../images/pfp.jpg"

function Home() {
    const date = new Date()
    const hours = date.getHours()
    let timeOfDay

    if (hours < 12) {
        timeOfDay = "Ohayou"
    }
    else if (hours >= 12 && hours < 17) {
        timeOfDay = "Konnichiwa"
    }
    else if (hours >= 17 && hours < 21) {
        timeOfDay = "Konbanwa"
    }
    else {
        timeOfDay = "Oyasumi"
    }
  return (
    <Container>
      <div className="row">
            <div className="col-lg-4 image-p">
                <img src={pfp} alt="my-pic" className="mb-4 img-fluid rounded-circle" />
            </div>
            <div className="col-lg-8">
                <div className="greet"><h1><span className="pink">{timeOfDay},</span> I'm Pritish Joshi</h1></div>
                <p className="lead">A Tech enthusiast, Chemist, Educator and Coder</p>
                <p className="lead">Even though I enjoy coding and techie stuff, I'm currently a postgrad student of Chemistry in <span className="pink">IIT Dhanbad</span> with a research project in Computational Chemistry and molecular dynamics</p>
                <div className="button-container">
                    <Button href="https://github.com/DrtSinX98" className="github-button" target="_blank">GitHub</Button>
                    <Button href="https://twitter.com/rjpritish" className="twitter-button" target="_blank">Twitter</Button>
                    <Button href="https://linkedin.com/in/pritish-joshi-b870bb242" className="linkedin-button" target="_blank">LinkedIn</Button>
                </div>
            </div>
        </div>
        <hr className="my-4" />
        <div className="row">
            <Card />
            
        </div>
    </Container>
  );
}

export default Home