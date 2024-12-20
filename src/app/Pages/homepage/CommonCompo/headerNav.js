"use client";

import { Navbar, Nav, NavDropdown, Container, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import SernetLogo from "@/app/assets/sernet-logo.svg";
import Image from "next/image";
import TranslateLogo from "@/app/assets/translate.svg";
import Headerstyle from "./headerNav.module.css";
import Link from "next/link";

export default function HeaderNav() {
  return (
    <>
      <header className={Headerstyle.header}>
        <Navbar expand="lg" bg="white" className="navbar-light">
          <Container className="d-flex justify-content-between align-items-center">
            <Link href="/">
              <Image src={SernetLogo} alt="Logo" height="50px" />
            </Link>
            <Navbar.Toggle aria-controls="navbarSupportedContent" />
            <Navbar.Collapse
              id="navbarSupportedContent"
              className="justify-content-center"
            >
              {/* <Nav className={`mb-2 mb-lg-0 ${Headerstyle.nav_header}`}>
              <NavDropdown title="Products" id="products-dropdown">
                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
              </NavDropdown> */}
              <Nav className="mb-2 mb-lg-0">
                <NavDropdown
                  className={Headerstyle.navDropdown}
                  title={
                    <span className={Headerstyle.title}>
                      Products{" "}
                      {/* <i className="fa-solid fa-angle-down px-2 pt-1" /> */}
                    </span>
                  }
                >
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  className={Headerstyle.navDropdown}
                  title={<span className={Headerstyle.title}>Services</span>}
                  id="services-dropdown"
                >
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  className={Headerstyle.navDropdown}
                  title={<span className={Headerstyle.title}>Solutions</span>}
                  id="solutions-dropdown"
                >
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>

                {/* <Nav.Link className={Headerstyle.title} href="#">Finterest</Nav.Link> */}
                <NavDropdown
                  className={Headerstyle.navDropdown}
                  title={<span className={Headerstyle.title}>Platforms</span>}
                  id="platforms-dropdown"
                >
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Action
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    href="#"
                    className={Headerstyle.dropdownItem}
                  >
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>

              <div
                className={` ${Headerstyle.custom_hamburger_menu} d-flex d-lg-none`}
              >
                {/* <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    className={`${Headerstyle.english_btn} d-flex align-items-center`}
                  >
                    <Image
                      src={TranslateLogo}
                      alt="Translate Icon"
                      className="me-2"
                    />
                    English
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}

                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-secondary"
                    className={`${Headerstyle.english_btn} d-flex align-items-center`}
                  >
                    <Image
                      src={TranslateLogo}
                      alt="Translate Icon"
                      className="me-2"
                    />
                    English
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={Headerstyle.customDropdownMenu}>
                    <Dropdown.Item
                      href="#"
                      className={Headerstyle.customDropdownItem}
                    >
                      Action
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#"
                      className={Headerstyle.customDropdownItem}
                    >
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      href="#"
                      className={Headerstyle.customDropdownItem}
                    >
                      Something else here
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Navbar.Collapse>
            <div className={`${Headerstyle.custom_hamburger_menu}`}>
              {/* <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  className={`${Headerstyle.english_btn} d-flex align-items-center`}
                >
                  <Image src={TranslateLogo} className="me-3" alt="Translate" />
                  English
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}

              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-secondary"
                  className={`${Headerstyle.english_btn} d-flex align-items-center`}
                >
                  <Image
                    src={TranslateLogo}
                    alt="Translate Icon"
                    className="me-2"
                  />
                  English
                </Dropdown.Toggle>
                <Dropdown.Menu className={Headerstyle.customDropdownMenu}>
                  <Dropdown.Item
                    href="#"
                    className={Headerstyle.customDropdownItem}
                  >
                    Action
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#"
                    className={Headerstyle.customDropdownItem}
                  >
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    href="#"
                    className={Headerstyle.customDropdownItem}
                  >
                    Something else here
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}
