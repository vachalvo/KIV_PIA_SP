import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button, Card, InputGroup, Row} from "react-bootstrap";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {post} from "../../global/api";
import {emailValidation, loginPasswordValidation} from "../../global/formValidation";

const initData = {
    email: '',
    password: ''
};

const initFeedback = {
    email: '',
    password: ''
}

function Login() {
    const [data, setData] = useState(initData);
    const [feedback, setFeedback] = useState(initFeedback);
    const history = useHistory();

    const _inputOnChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });

        // Check and see if errors exist, and remove them from the error object:
        if (!!feedback[name]){
            setFeedback({
                ...feedback,
                [name]: ''
            });
        }
    };

    const _submit = (event) => {
        event.preventDefault();
        const newFeedback = findFormErrors()

        if (!Object.values(newFeedback).every(x => x === '')) {
            setFeedback(newFeedback);
            return;
        }

        post('/users/authenticate', data).then((response) => {
            setData(initData);
            setFeedback(initFeedback);

            history.push('feed');
        })
    };

    const findFormErrors = () => {
        const { email, password } = data;
        const newFeedback = {
            ...initFeedback
        };

        newFeedback.email = emailValidation(email);
        newFeedback.password = loginPasswordValidation(password);
        return newFeedback;
    };

    return (
        <Card style={{margin: "50px", padding: "20px"}}>
            <h2>Login</h2>
            <Form>
                <Row className="mb-3">
                    <Form.Group md="12">
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
                                isInvalid={ !!feedback.email }
                            />
                            <Form.Control.Feedback type="invalid">{feedback.email}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group md="12">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={_inputOnChange}
                                value={data.password}
                                required
                                isInvalid={ !!feedback.password }
                            />
                            <Form.Control.Feedback type="invalid">{feedback.password}</Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <div style={{"textAlign": "center"}}>
                    <Button type="submit" onClick={_submit} size="lg" variant="outline-success">Login</Button>
                </div>
            </Form>
        </Card>
    );
}

export default Login;
