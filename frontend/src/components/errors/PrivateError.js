import React from "react";
import {Card, Row, Col, Container} from "react-bootstrap";
import Private from "../../img/private.png";

const imgStyle = {
    margin: "20px 0 20px 20px",
};

const PrivateError = () => {
    return (
        <>
            <Container  style={{margin: "0px", padding: "20px"}}>
                <Row className={"justify-content-center"}>
                    <Col md={10}>
                        <Card>
                            <div style={imgStyle}>
                                <Card.Img src={Private}  className={"mx-auto"}/>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default PrivateError;