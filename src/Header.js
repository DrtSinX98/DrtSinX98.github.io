import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

function Header() {
  const [active, setActive] = useState('home');

  const handleSelect = (selectedKey) => {
    setActive(selectedKey);
  };

  return (
    <header className="header">
      <Container>
        <Navbar variant="dark" expand="lg">
          <Navbar.Brand href="#">Pritish's Dungeon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="col-nav">
            <Nav activeKey={active} onSelect={handleSelect}>
              <Nav.Item>
                <Nav.Link eventKey="home" className={active === 'home' ? 'active-link' : ''}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about" className={active === 'about' ? 'active-link' : ''}>About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="projects" className={active === 'projects' ? 'active-link' : ''}>Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="contact" className={active === 'contact' ? 'active-link' : ''}>Contact</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
}

export default Header;
