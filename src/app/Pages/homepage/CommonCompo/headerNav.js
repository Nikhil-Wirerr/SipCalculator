// "use client"; 

// import Link from "next/link";
// import styles from './headerNav.module.css'

// export default function HeaderNav() {
//   return (
//     <header className={styles.header}>
//       <nav className={styles.nav}>
//         <div className={styles.logo}>
//           <Link href="/">Sernet Calculator</Link>
//         </div>
//         <ul className={styles.navList}>
//           <li>
//             <Link href="/">Home</Link>
//           </li>
//           {/* <li>
//             <Link href="/Pages/homepage/calculatorpage">Calculator</Link>
//           </li>
//           <li>
//             <Link href="/Pages/homepage/sipcalculatorpage">SIP Calculator</Link>
//           </li> */}
//         </ul>
//       </nav>
//     </header>
//   );
// }

//--------------------------------------------



"use client";

import { Navbar, Nav, NavDropdown, Container, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import SernetLogo from '@/app/assets/sernet-logo.svg';
import Image from "next/image";
import TranslateLogo from '@/app/assets/translate.svg';
import styles from './headerNav.module.css'
import Link from "next/link";

export default function HeaderNav() {
  return (

    <>
    <header className={styles.header}>
      <Navbar expand="lg" bg="white" className="navbar-light">
        <Container className="d-flex justify-content-between align-items-center">
        <Link  href="/">
             <Image src={SernetLogo} alt="Logo" height="50px" />
           </Link>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent" className="justify-content-center">
            
            <Nav className="mb-2 mb-lg-0 nav-header">
              <NavDropdown title="Products" id="products-dropdown">
                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Services" id="services-dropdown">
                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Solutions" id="solutions-dropdown">
                <NavDropdown.Item href="#">Action</NavDropdown.Item>
                <NavDropdown.Item href="#">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link href="#">Finterest</Nav.Link>
            </Nav>

            <div className="custom-hamburger-menu d-flex d-lg-none">
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" className="english-btn d-flex align-items-center">
                  <img src="/Image/translate.svg" alt="Translate Icon" className="me-2" />
                  English
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

          </Navbar.Collapse>
          <div className="custom-hamburger-menu">
            <Dropdown>
              <Dropdown.Toggle variant="outline-secondary" className="english-btn d-flex align-items-center">
              <Image src={TranslateLogo} alt="Translate"/> 
                English
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Action</Dropdown.Item>
                <Dropdown.Item href="#">Another action</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">Something else here</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
    </header>
    </>
  );
}

