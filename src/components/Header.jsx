'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Navbar, Nav } from "react-bootstrap";
import ThemeSwitch from "./ThemeSwitch";
import ThemeButton from "./ThemeButton";
import Logo from "./Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getIcon } from "@/lib/icons";
import { defaultSite } from "@/lib/defaults";

// Fallback for menu items saved before the icon field existed, so the mobile bar
// never degrades to a row of identical generic glyphs.
const FALLBACK_ICONS = Object.fromEntries(
  defaultSite.nav.flatMap((item) => [
    [item.key, item.icon],
    [item.href, item.icon],
  ]),
);

const iconFor = (item) => getIcon(item.icon || FALLBACK_ICONS[item.key] || FALLBACK_ICONS[item.href]);

function Header({ brand = "Vortex", nav = [] }) {
  const pathname = usePathname();
  // Longest matching href wins so /about doesn't also light up "/".
  const active =
    nav
      .filter((item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href)))
      .sort((a, b) => b.href.length - a.href.length)[0]?.href ?? "/";

  return (
    <>
      <header className="header">
        <Container>
          <Navbar expand="lg" className="justify-content-between align-items-center border-0">
            <Navbar.Brand as={Link} href="/">
              <Logo alt="logo-image" height="65" width="100" className="d-inline-block" />{' '}{brand}
            </Navbar.Brand>

            <Nav activeKey={active} className="d-none d-lg-flex ms-auto me-4 flex-row gap-2">
              {nav.map((item) => (
                <Nav.Item key={item.key || item.href}>
                  <Nav.Link as={Link} href={item.href} eventKey={item.href} className={active === item.href ? "active-link" : ""}>
                    {item.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            <div className="d-flex align-items-center">
              <ThemeButton />
              <div className="ms-2"><ThemeSwitch /></div>
            </div>
          </Navbar>
        </Container>
      </header>

      <nav className="bottom-nav d-lg-none">
        <Nav activeKey={active} className="w-100 h-100 d-flex justify-content-around align-items-center m-0 p-0 flex-row">
          {nav.map((item) => (
            <Nav.Item key={item.key || item.href} className="d-flex justify-content-center align-items-center flex-fill">
              <Nav.Link as={Link} href={item.href} eventKey={item.href} className={active === item.href ? "active-icon" : "inactive-icon"} aria-label={item.label}>
                <FontAwesomeIcon icon={iconFor(item)} size="lg" />
              </Nav.Link>
            </Nav.Item>
          ))}
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
