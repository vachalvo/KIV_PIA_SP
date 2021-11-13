import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Container, Nav, Form, FormControl, Button} from "react-bootstrap";
import Logo from "../../img/favicon.png";
import AuthService from "../../services/auth-service";

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
                        {currentUser && (
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        )}
                        {!currentUser ? (
                            <Nav>
                                <Nav.Link href="/signup">Sign-up</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>
                                <Nav.Link href="/logout" onClick={logout}>Logout</Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
