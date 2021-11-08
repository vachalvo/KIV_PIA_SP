import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Card, InputGroup} from "react-bootstrap";
import {useState} from "react";
import {post} from "../../global/api";

const submitButtonStyle = {
    margin: "20px 0 0 0"
}

const initData = {
    email: '',
    password: ''
}
function Login() {
    const [data, setData] = useState(initData);

    const _inputOnChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const _submit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        post('/users/authenticate', data).then((response) => {
            setData(initData);
            console.log("success", response);
        })
    }

    return (
        <Card style={{margin: "50px", padding: "20px"}}>
            <h2>Login</h2>
            <Form>
                <Form.Group md="12" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            type="text"
                            name="email"
                            placeholder="Username"
                            onChange={_inputOnChange}
                            value={data.email}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Form.Group md="12" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={_inputOnChange}
                            value={data.password}
                            required
                        />
                    </InputGroup>
                </Form.Group>
                <Button
                    type="submit"
                    style={submitButtonStyle}
                    onClick={_submit}>
                    Login
                </Button>
            </Form>
        </Card>
    );
}

export default Login;
