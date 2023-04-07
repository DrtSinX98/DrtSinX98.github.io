import React, { useState } from "react";
import { Container } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Link} from 'react-router-dom';

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
                  <Nav.Link as={Link} to="/" eventKey="home" className={active === 'home' ? 'active-Nav.Link' : ''}>Home</Nav.Link>  
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link as={Link} to="/about" eventKey="about" className={active === 'about' ? 'active-Nav.Link' : ''}>About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link as={Link} to="/projects" eventKey="projects" className={active === 'projects' ? 'active-Nav.Link' : ''}>Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                  <Nav.Link as={Link} to="/contact" eventKey="contact" className={active === 'contact' ? 'active-Nav.Link' : ''}>Contact</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
}

export default Header;
