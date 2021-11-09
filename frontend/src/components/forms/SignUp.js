import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import {Form, Button, Card, Row, Col, InputGroup} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {post} from "../../global/api";
import {
    comparePasswordsValidation,
    emailValidation,
    loginPasswordValidation,
    nameValidation,
    registerPasswordValidation
} from "../../global/formValidation";

const initData = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    reEnterPassword: ''
};

const initFeedback = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    reEnterPassword: ''
};

function SignUp() {
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

        post('/users/register', data).then((response) => {
            setData(initData);
            setFeedback(initFeedback);

            history.push('login');
        });
    };

    const findFormErrors = () => {
        const { email, firstName, lastName, password, reEnterPassword } = data;
        const newFeedback = {
            ...initFeedback
        };

        newFeedback.email = emailValidation(email);
        newFeedback.firstName = nameValidation(firstName);
        newFeedback.lastName = nameValidation(lastName);
        newFeedback.password = registerPasswordValidation(password);

        if(newFeedback.password === ''){
            newFeedback.reEnterPassword = comparePasswordsValidation(password, reEnterPassword);
        }

        return newFeedback;
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
                                isInvalid={ !!feedback.email }
                            />
                            <Form.Control.Feedback type="invalid">{feedback.email}</Form.Control.Feedback>
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
                            isInvalid={ !!feedback.firstName }
                        />
                        <Form.Control.Feedback type="invalid">{feedback.firstName}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="lastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            onChange={_inputOnChange}
                            isInvalid={ !!feedback.lastName }
                        />
                        <Form.Control.Feedback type="invalid">{feedback.lastName}</Form.Control.Feedback>
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
                            isInvalid={ !!feedback.password }
                        />
                        <Form.Control.Feedback type="invalid">{feedback.password}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="reEnterPassword">
                        <Form.Label>Re-enter password</Form.Label>
                        <Form.Control
                            required
                            name="reEnterPassword"
                            type="password"
                            placeholder="Re-enter password"
                            onChange={_inputOnChange}
                            isInvalid={ !!feedback.reEnterPassword }
                        />
                        <Form.Control.Feedback type="invalid">{feedback.reEnterPassword}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <div style={{"textAlign": "center"}}>
                    <Button type="submit" onClick={_submit} size="lg" variant="outline-success" >Sign up</Button>
                </div>
            </Form>

        </Card>
    );
}

export default SignUp;
