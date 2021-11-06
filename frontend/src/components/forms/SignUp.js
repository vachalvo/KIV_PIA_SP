import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Card, Row, Col, InputGroup} from "react-bootstrap";

function SignUp() {
    return (
        <Card style={{margin: "50px", padding: "20px"}}>
            <h2>SignUp</h2>
            <Form noValidate>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="firstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                        />
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="reEnterPassword">
                        <Form.Label>Re-enter password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Re-enter password"
                        />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                    />
                </Form.Group>
                <Button type="submit">Sign up</Button>
            </Form>
        </Card>
    );
}

export default SignUp;
