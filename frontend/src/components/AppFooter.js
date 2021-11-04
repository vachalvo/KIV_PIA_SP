import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Container} from "react-bootstrap";

function AppFooter() {
    return (
        <div>
            <Navbar sticky="bottom" variant="light" bg="light">
                <Container>
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Text>
                            Semestral work for KIV/PIA, Vojtěch Váchal
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default AppFooter;
