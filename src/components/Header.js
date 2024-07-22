import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import ThemeSwitch from "./ThemeSwitch";

export const useActiveState = () => {
  const [active, setActive] = useState("home");
  const handleSelect = (key) => {
    setActive(key);
  };

  return { active, handleSelect };
};

function Header(props) {
  const { active, handleSelect } = props;

  return (
    <header className="header">
      <Container>
        <Navbar variant="dark" expand="lg" collapseOnSelect>
          <Navbar.Brand href="#">Pritish's Dungeon</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="col-nav">
            <Nav activeKey={active} onSelect={handleSelect}>
              <Nav.Item>
                <Nav.Link
                  eventKey="home"
                  className={active === "home" ? "active-link" : ""}
                >
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="about"
                  className={active === "about" ? "active-link" : ""}
                >
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="projects"
                  className={active === "projects" ? "active-link" : ""}
                >
                  Projects
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="contact"
                  className={active === "contact" ? "active-link" : ""}
                >
                  Contact
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <ThemeSwitch/>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </header>
  );
}

export default Header;
