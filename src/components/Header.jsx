import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import ThemeSwitch from "./ThemeSwitch";
import ThemeButton from "./ThemeButton";
import Logo from "./Logo";

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
        <Navbar expand="lg" collapseOnSelect>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Brand href="#">
            <Logo alt="logo-image" height="65" width="100" className="d-inline-block"/>{' '}Vortex
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
                  eventKey="lectures"
                  className={active === "lectures" ? "active-link" : ""}
                >
                  Lectures
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
              background-color: none;
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
              color: var(--bs-body-color);
              font-weight: 500;
              margin-right: 8px;
              margin-left: 8px;
            }

            .nav-link {
              color: var(--bs-body-color);
              font-size: 18px;
              font-weight: 450;
              transition: transform 0.4s ease, color 0.4s ease;
            }

            .navbar-nav .active {
              background-color: rgba(201 21 116 / 0.7);
              border-radius: 30px;
              padding: 8px;
              transition: background-color 0.4s ease;
            }

            .navbar-nav .nav-link.active {
              color: white;
            }

            .navbar-nav .active:hover {
              background-color: var(--secondary-color);
            }

            .navbar {
              --bs-navbar-toggler-border-color: none;
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
