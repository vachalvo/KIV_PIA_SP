import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import {useHistory} from "react-router-dom";

import {Form, Button, Card, InputGroup, Row, Col, Alert, Container} from "react-bootstrap";

import Validation from "../../../global/validations";
import AuthService from "../../../services/auth-service";

const initData = {
    email: '',
    password: ''
};

const initFeedback = {
    email: '',
    password: ''
}

function Login(props) {
    const success = props.location.state;

    const [show, setShow] = useState(success !== undefined);
    const [data, setData] = useState(initData);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(initFeedback);
    const history = useHistory();

    const _validateForm = () => {
        const { email, password } = data;
        const newFeedback = {
            ...initFeedback
        };

        newFeedback.email = Validation.validateEmail(email);
        newFeedback.password = Validation.validateLoginPassword(password);

        return newFeedback;
    };

    const _onChange = (event) => {
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

    const _login = (event) => {
        event.preventDefault();

        setLoading(true);
        const newFeedback = _validateForm()

        if (!Object.values(newFeedback).every(x => x === '')) {
            setFeedback(newFeedback);
            setLoading(false);
            return;
        }

        AuthService.login(data).then(
            () => {
                props.history.push("/feed");
                window.location.reload();
            },
            (error) => {
                alert(error);

                setLoading(false);
            }
        );

       /* fetch(getUri("/users/authenticate"),initFetch("POST", data))
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.fieldErrors) {
                    const newFeedback = {
                        ...initFeedback
                    };
                    data.fieldErrors.forEach(fieldError => {
                        newFeedback[fieldError.field] = fieldError.message;
                    });
                    setFeedback(newFeedback);
                } else if(data.error){

                }
                else {
                    history.push('/feed');
                }
            })
            .catch((err) => console.log(err));*/
    };



    function SuccessToast() {
        return (
            <Row className="justify-content-md-center">
                <Col xs={8}>
                    <Alert style={{margin: "10px 0 0 0"}} className={"md-3"} variant="success" show={show} onClose={() => setShow(false)} dismissible >
                        Registration was successfully.
                    </Alert>
                </Col>
            </Row>
        );
    }

    return (
        <>
            <SuccessToast />
            <Card style={{margin: "50px", padding: "20px"}}>
                <h2 className={"text-center"}>Login</h2>
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
                                    onChange={_onChange}
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
                                    onChange={_onChange}
                                    value={data.password}
                                    required
                                    isInvalid={ !!feedback.password }
                                />
                                <Form.Control.Feedback type="invalid">{feedback.password}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <div style={{"textAlign": "center"}}>
                        <Button type="submit" onClick={_login} size="lg" disabled={loading} variant="outline-success">
                            {loading ? 'Loading…' : 'Login'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </>
    );
}

export default Login;
