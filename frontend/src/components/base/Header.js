import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Container, Nav, Form, FormControl, Button} from "react-bootstrap";
import Logo from "../../img/favicon.png";
import AuthService from "../../services/auth-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSignInAlt, faUserPlus, faSignOutAlt, faIdCard, faSearch } from '@fortawesome/free-solid-svg-icons';

function Header(props) {
    const {currentUser} = props;

    const logout = () => {
        AuthService.logout();
    };

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={Logo}
                            width="35"
                            height="35"
                            className="d-inline-block align-content-center"
                        />{' '}
                        Squirrel
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        {!currentUser ? (
                            <Nav>
                                <Nav.Link href="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link>
                                <Nav.Link href="/signup"><FontAwesomeIcon icon={faUserPlus} /> Sign-up</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>

                                <Form className="d-flex">
                                    <FormControl
                                        type="search"
                                        placeholder="Search"
                                        className="me-2"
                                        aria-label="Search"
                                    />
                                    <Button variant="outline-success"><FontAwesomeIcon icon={faSearch} /></Button>
                                </Form>
                                <Nav.Link href="/friends"><FontAwesomeIcon icon={faUsers} /> Friends Management</Nav.Link>
                                <Nav.Link href="/profile"><FontAwesomeIcon icon={faIdCard} /> Profile</Nav.Link>
                                <Nav.Link href="/logout" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
