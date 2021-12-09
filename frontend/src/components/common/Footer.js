import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Container} from "react-bootstrap";
import {useState, useEffect} from "react";
import {Col} from "react-bootstrap";
import {Typography} from "@mui/material";

function Footer() {
    const [fullYear, setFullYear] = useState();

    useEffect(() => {
        setFullYear(new Date().getFullYear());
    }, [fullYear]);

    return (
        <div style={{"padding": "40px"}} >
            <Navbar fixed="bottom" style={{ background: '#1976D2' }}>
                <Container>
                    <Col className="text-center text-muted">
                        <Typography color='#FFFFFF'>
                            {fullYear}-{fullYear + 1}, All Rights Reserved by Vojtěch Váchal
                        </Typography>
                    </Col>
                </Container>
            </Navbar>
        </div>

    );
}

export default Footer;