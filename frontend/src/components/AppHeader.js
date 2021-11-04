import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Container, Nav, Form, FormControl, Button} from "react-bootstrap";
import Logo from "../favicon.png";

function AppHeader() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="home">
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
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">Sign-up</Nav.Link>
                            <Nav.Link href="#deets">Sign-in</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default AppHeader;
