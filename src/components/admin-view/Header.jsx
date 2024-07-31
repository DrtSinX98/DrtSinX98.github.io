import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import ThemeSwitch from "./ThemeSwitch";
import ThemeButton from "./ThemeButton";

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
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand href="#">
            Admin's Dungeon
          </Navbar.Brand>
          <ThemeButton/>
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
          </Navbar.Collapse>
          <ThemeSwitch/>
        </Navbar>
        <style>
          {`
            .header {
              background-color: rgba(48 25 52 / 0.9);
              backdrop-filter: blur(3px);
              -webkit-backdrop-filter: blur(3px);
              width: 100%;
              position: sticky;
              top: 0;
              z-index: 999;
            }
            .navbar {
              background-color: rgba(255 255 255 / 0);
            }

            .navbar-brand {
              margin-right: 8px;
              margin-left: 8px;
            }

            .nav-link {
              color: #fafafa;
              font-size: 18px;
            }

            .navbar-nav .active {
              background-color: var(--secondary-color);
              border-radius: 5px;
            }

            @media (max-width: 992px) {
              .nav-link {
                text-align: center;
                margin-top: 10px;
                padding-left: 5px;
              }
            }
          `}
        </style>
      </Container>
    </header>
  );
}

export default Header;
