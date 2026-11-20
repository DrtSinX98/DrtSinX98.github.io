import React from 'react';
import Icon from './Icon';
import { Container } from 'react-bootstrap';

function Footer({ owner = 'Pritish Joshi', writtenIn = 'Written in' }) {
    return (
        <footer className="footer">
            <Container>
                <div>
                    <p><span className='pink'>&copy;</span> {new Date().getFullYear()} {owner}
                        <br />
                        <br />{writtenIn} <Icon name="react" /> & <Icon name="bootstrap" /></p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
