import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import {useHistory} from "react-router-dom";

import {Form, Button, Card, Row, Col, InputGroup} from "react-bootstrap";

import Validation from "../../../global/validations";
import AuthService from "../../../services/auth-service";

const initData = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    reEnterPassword: '',
    gender: ''
};

const initFeedback = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    reEnterPassword: '',
    gender: 'asdfasdf'
};

function SignUp() {
    const [data, setData] = useState(initData);
    const [gender, setGender] = useState('male');
    const [feedback, setFeedback] = useState(initFeedback);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const _validateForm = () => {
        const { email, firstName, lastName, password, reEnterPassword } = data;
        const newFeedback = {
            ...initFeedback
        };

        newFeedback.email = Validation.validateEmail(email);
        newFeedback.firstName = Validation.validateName(firstName);
        newFeedback.lastName = Validation.validateName(lastName);
        newFeedback.password = Validation.validateRegistrationPassword(password);
        newFeedback.reEnterPassword = Validation.validatePasswordsParity(password, reEnterPassword);

        return newFeedback;
    };

    const _genderOnChange = (event) => {
        const {value, id} = event.target;

        if(value === 'on'){
            setGender(id);
        }
    }

    const _onChange = (event) => {
        console.log(event);
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Check and see if errors exist, and remove them from the error object:
        if (!!feedback[name]){
            setFeedback({
                ...feedback,
                [name]: ''
            });
        }
    };

    const _signup = async (event) => {
        event.preventDefault();

        setLoading(true);
        const newFeedback = _validateForm();

        if (!Object.values({}).every(x => x === '')) {
            setFeedback(newFeedback);
            setLoading(false);
            return;
        }

        AuthService.signup({...data, gender}).then(
            (response) => {
                console.log(response);
                history.push("/login");
                window.location.reload();
            }
        ).catch((error) => {
            const response = error.response;

            if(response && response.data.fieldErrors){
                setLoading(false);
                const newFeedback = {
                    ...initFeedback
                };
                response.data.fieldErrors.forEach(fieldError => {
                    newFeedback[fieldError.field] = fieldError.message;
                });
                setFeedback(newFeedback);
            }
        });
    };

    return (
        <Card style={{margin: "50px", padding: "20px"}}>
            <h2 className={"text-center"}>Sign Up</h2>
            <Form className={"justify-content-md-center"}>
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
                                onChange={_onChange}
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
                            onChange={_onChange}
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
                            onChange={_onChange}
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
                            onChange={_onChange}
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
                            onChange={_onChange}
                            isInvalid={ !!feedback.reEnterPassword }
                        />
                        <Form.Control.Feedback type="invalid">{feedback.reEnterPassword}</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="gender">
                        <Form.Check.Label>Gender</Form.Check.Label>
                        <Form.Check
                            onChange={_genderOnChange}
                            label="Male"
                            name="gender"
                            type="radio"
                            id="male"
                            checked={gender === 'male'}
                        />
                        <Form.Check
                            onChange={_genderOnChange}
                            label="Female"
                            checked={gender === 'female'}
                            name="gender"
                            type="radio"
                            id="female"
                        />
                    </Form.Group>
                </Row>
                <div style={{"textAlign": "center"}}>
                    <Button type="submit" onClick={_signup} size="lg" disabled={loading} variant="outline-success">
                        {loading ? 'Loading…' : 'Sign up'}
                    </Button>
                </div>
            </Form>

        </Card>
    );
}

export default SignUp;
