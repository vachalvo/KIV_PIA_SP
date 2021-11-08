import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import {Form, Button, Card, Row, Col, InputGroup} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {post} from "../../global/api";

const initData = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    reEnterPassword: ''
};

function SignUp() {
    const [data, setData] = useState(initData);
    const history = useHistory();

    const _inputOnChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const _submit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        post('/users/register', data).then((response) => {
            setData(initData);
            console.log("success", response);
            history.push('login');
        });
    };

    return (
        <Card style={{margin: "50px", padding: "20px"}}>
            <h2>SignUp</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group as={Col} md="12" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                name="email"
                                type="text"
                                placeholder="Email"
                                required
                                onChange={_inputOnChange}
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
                            name="firstName"
                            placeholder="First name"
                            onChange={_inputOnChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            onChange={_inputOnChange}
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
                            name="password"
                            onChange={_inputOnChange}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="reEnterPassword">
                        <Form.Label>Re-enter password</Form.Label>
                        <Form.Control
                            required
                            name="reEnterPassword"
                            type="password"
                            placeholder="Re-enter password"
                            onChange={_inputOnChange}
                        />
                    </Form.Group>
                </Row>
                <Button type="submit" onClick={_submit}>Sign up</Button>
            </Form>

        </Card>
    );
}

export default SignUp;
