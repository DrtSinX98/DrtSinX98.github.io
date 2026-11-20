'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Navbar, Nav } from "react-bootstrap";
import ThemeSwitch from "./ThemeSwitch";
import ThemeButton from "./ThemeButton";
import Logo from "./Logo";
import Icon from "./Icon";
import { defaultSite } from "@/lib/defaults";

// Fallback for menu items saved before the icon field existed, so the mobile bar
// never degrades to a row of identical generic glyphs.
const FALLBACK_ICONS = Object.fromEntries(
  defaultSite.nav.flatMap((item) => [
    [item.key, item.icon],
    [item.href, item.icon],
  ]),
);

// Resolves to a *name* now; <Icon> does the lookup.
const iconNameFor = (item) => item.icon || FALLBACK_ICONS[item.key] || FALLBACK_ICONS[item.href];

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
              <Logo height="65" width="100" className="d-inline-block" />{' '}{brand}
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
                <Icon name={iconNameFor(item)} size="lg" />
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </nav>

    </>
  );
}

export default Header;
