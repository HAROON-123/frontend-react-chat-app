//////////////////////////////////WE ARE MAKING NAVBAR FOR COMBINING LINKS TOGETHER
/////////////////////////////////////////IN A SAME COMPONENTS////////

import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NAVbar.css';
function NAVbar() {
  let id = 1000000000;
  let age = 1000000000;
  let city = "ENGLISHTAN";
  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container>
        <NavLink to = "/"><Navbar.Brand></Navbar.Brand></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="me-auto">
            <Nav.Link><NavLink className={"NavLink"}   to = "/">HOME</NavLink></Nav.Link>
            {/* <Nav.Link><NavLink className={"NavLink"}   to = "/LOGOUTBYJWT">LOGOUTBYJWT</NavLink></Nav.Link> */}
            <Nav.Link><NavLink className={"NavLink"}  to = "/Contact">Contact</NavLink></Nav.Link>
            <Nav.Link><NavLink className={"NavLink"}  to = "/About">About</NavLink></Nav.Link>
            <Nav.Link><NavLink className={"NavLink"}  to = "/Registerforchatapp">Register</NavLink></Nav.Link>
          
            <Nav.Link><NavLink className={"NavLink"}  to = "/LOGINBYJWT">LOGINBYJWT</NavLink></Nav.Link>
            <Nav.Link><NavLink className={"NavLink"}  to = "/LOGOUT">LOGOUT</NavLink></Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NAVbar;