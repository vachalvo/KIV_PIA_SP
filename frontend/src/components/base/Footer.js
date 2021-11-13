import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Container} from "react-bootstrap";
import {useState, useEffect} from "react";
import {Col} from "react-bootstrap";

function Footer() {
    const [fullYear, setFullYear] = useState();

    useEffect(() => {
        setFullYear(new Date().getFullYear());
    }, [fullYear]);

    return (
        <div style={{"padding": "40px"}} >
            <Navbar fixed="bottom" bg="light" variant="light">
                <Container>
                    <Col lg={12} className="text-center text-muted">
                        <div>
                            {fullYear}-{fullYear + 1}, All Rights Reserved by Vojtěch Váchal
                        </div>
                    </Col>
                </Container>
            </Navbar>
        </div>

    );
}

export default Footer;
