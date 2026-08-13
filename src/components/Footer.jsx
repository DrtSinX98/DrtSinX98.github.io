import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact, faBootstrap } from "@fortawesome/free-brands-svg-icons";

function Footer({ owner = 'Pritish Joshi', writtenIn = 'Written in' }) {
    return (
        <footer className="footer">
            <Container>
                <div>
                    <p><span className='pink'>&copy;</span> {new Date().getFullYear()} {owner}
                        <br />
                        <br />{writtenIn} <FontAwesomeIcon icon={faReact} /> & <FontAwesomeIcon icon={faBootstrap} /></p>
                </div>
                <style>
                    {`
                .footer {
                    background-color: transparent;
                    backdrop-filter: blur(3px);
                    -webkit-backdrop-filter: blur(3px);
                    color: var(--bs-body-color);
                    text-align: center;
                    width: 100%;
                    bottom: 0;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 20px;
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
