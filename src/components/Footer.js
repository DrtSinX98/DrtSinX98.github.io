import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faReact, faBootstrap} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
        <Container>
            <div>
                <p><span className='pink'>&copy;</span> 2024 Pritish Joshi
                <br/>
                <br/>Written in <FontAwesomeIcon icon={faReact} /> & <FontAwesomeIcon icon={faBootstrap} /></p>
            </div>
            <style>
                {`
                .footer {
                    background-color: var(--primary-color);
                    color: var(--tertiary-color);
                    text-align: center;
                    width: 100%;
                    bottom: 0;
                }

                .pink {
                    color: var(--secondary-color);
                }

                .fa-react {
                    color: var(--secondary-color);
                }

                .fa-bootstrap {
                    color: var(--secondary-color);
                }
                `}
            </style>
        </Container>
    </footer>
  );
}

export default Footer;
