import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Card, Row, Col, InputGroup} from "react-bootstrap";

function Login() {
    return (
        <Card style={{margin: "50px", padding: "20px"}}>
            <h2>Login</h2>
            <Form noValidate>
                <Form.Group md="12" controlId="email">
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
                <Form.Group md="12" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Button type="submit">Sign up</Button>
            </Form>
        </Card>
    );
}

export default Login;
