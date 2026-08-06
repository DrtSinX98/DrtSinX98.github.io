import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import ThemeSwitch from "./ThemeSwitch";
import ThemeButton from "./ThemeButton";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faUser, faVideo, faImages, faMessage } from "@fortawesome/free-solid-svg-icons";

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
    <>
      <header className="header">
        <Container>
          <Navbar expand="lg" className="justify-content-between align-items-center border-0">
            <Navbar.Brand href="#">
              <Logo alt="logo-image" height="65" width="100" className="d-inline-block" />{' '}Vortex
            </Navbar.Brand>

            <Nav activeKey={active} onSelect={handleSelect} className="d-none d-lg-flex ms-auto me-4 flex-row gap-2">
              <Nav.Item>
                <Nav.Link eventKey="home" className={active === "home" ? "active-link" : ""}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="about" className={active === "about" ? "active-link" : ""}>About</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="lectures" className={active === "lectures" ? "active-link" : ""}>Lectures</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="gallery" className={active === "gallery" ? "active-link" : ""}>Gallery</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="contact" className={active === "contact" ? "active-link" : ""}>Contact</Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="d-flex align-items-center">
              <ThemeButton />
              <div className="ms-2"><ThemeSwitch /></div>
            </div>
          </Navbar>
        </Container>
      </header>

      <nav className="bottom-nav d-lg-none">
        <Nav activeKey={active} onSelect={handleSelect} className="w-100 h-100 d-flex justify-content-around align-items-center m-0 p-0 flex-row">
          <Nav.Item className="d-flex justify-content-center align-items-center flex-fill">
            <Nav.Link eventKey="home" className={active === "home" ? "active-icon" : "inactive-icon"}><FontAwesomeIcon icon={faHouse} size="lg" /></Nav.Link>
          </Nav.Item>
          <Nav.Item className="d-flex justify-content-center align-items-center flex-fill">
            <Nav.Link eventKey="about" className={active === "about" ? "active-icon" : "inactive-icon"}><FontAwesomeIcon icon={faUser} size="lg" /></Nav.Link>
          </Nav.Item>
          <Nav.Item className="d-flex justify-content-center align-items-center flex-fill">
            <Nav.Link eventKey="lectures" className={active === "lectures" ? "active-icon" : "inactive-icon"}><FontAwesomeIcon icon={faVideo} size="lg" /></Nav.Link>
          </Nav.Item>
          <Nav.Item className="d-flex justify-content-center align-items-center flex-fill">
            <Nav.Link eventKey="gallery" className={active === "gallery" ? "active-icon" : "inactive-icon"}><FontAwesomeIcon icon={faImages} size="lg" /></Nav.Link>
          </Nav.Item>
          <Nav.Item className="d-flex justify-content-center align-items-center flex-fill">
            <Nav.Link eventKey="contact" className={active === "contact" ? "active-icon" : "inactive-icon"}><FontAwesomeIcon icon={faMessage} size="lg" /></Nav.Link>
          </Nav.Item>
        </Nav>
      </nav>

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

            .bottom-nav {
              position: fixed;
              bottom: 0;
              width: 100%;
              height: 65px;
              background-color: var(--bs-card-bg);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              z-index: 1000;
              box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
            }
            .bottom-nav .nav-link {
              display: flex;
              justify-content: center;
              align-items: center;
              transition: all 0.3s ease;
              padding: 10px;
            }
            .bottom-nav .inactive-icon {
              color: var(--bs-body-color);
              opacity: 0.7;
            }
            .bottom-nav .inactive-icon:hover {
              opacity: 1;
              color: var(--secondary-color);
            }
            .bottom-nav .active-icon {
              color: var(--secondary-color);
              transform: scale(1.1);
            }
          `}
      </style>
    </>
  );
}

export default Header;
