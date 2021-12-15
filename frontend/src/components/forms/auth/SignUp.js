import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import {useHistory} from "react-router-dom";

import {Form, Button, Row, Col, InputGroup} from "react-bootstrap";

import Validation from "../../../global/validations";
import AuthService from "../../../services/auth-service";
import FormService from "../../../services/form-service";
import {
    Avatar,
    Card,
    Grid,
    Link,
    Typography,
    Stack,
    CardContent,
    Container,
    InputAdornment,
    InputLabel,
    FormControl,
    OutlinedInput,
    IconButton,
    FormHelperText,
    Divider,
    AlertTitle, Alert, Collapse, FormLabel, RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import {
    AlternateEmailOutlined,
    Close,
    LockOutlined,
    LoginOutlined, Person, PersonAdd,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import OutlinedTextField from "../common/OutlinedTextField";
import AlertDialog from "../../common/AlertDialog";
import WebSocketService from "../../../services/web-socket-service";

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

function SignUp(props) {
    const [values, setValues] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        reEnterPassword: '',
        gender: 'MALE',
        firstNameFeedback: '',
        lastNameFeedback: '',
        reEnterPasswordFeedback: '',
        genderFeedback: '',
        emailFeedback: '',
        passwordFeedback: '',
        showPassword: false,
        showReEnterPassword: false,
        loading: false,
        openAlert: false,
        alertText: ''
    });

    const history = useHistory();

    const onChange = (prop) => (event) => {
        setValues({ ...values,
            [prop]: event.target.value,
            emailFeedback: prop === 'email' ? '' : values.emailFeedback,
            passwordFeedback: prop === 'password' ? '' : values.passwordFeedback,
            firstNameFeedback: prop === 'firstName' ? '' : values.firstNameFeedback,
            lastNameFeedback: prop === 'lastName' ? '' : values.lastNameFeedback,
            reEnterPasswordFeedback: prop === 'reEnterPassword' ? '' : values.reEnterPasswordFeedback,
            genderFeedback: prop === 'gender' ? '' : values.genderFeedback,
        });
    };
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowReEnterPassword = () => {
        setValues({
            ...values,
            showReEnterPassword: !values.showReEnterPassword,
        });
    };
    const handleMouseDownReEnterPassword = (event) => {
        event.preventDefault();
    };

    const onBlurEmail = () => {
        callValidation(values.email, FormService.validateRegistrationEmail, 'emailFeedback');
    };

    const onBlurFirstName = () => {
        callValidation(values.firstName, FormService.validateFirstName, 'firstNameFeedback');
    };
    const onBlurLastName = () => {
        callValidation(values.lastName, FormService.validateLastName, 'lastNameFeedback');
    };
    const onBlurPassword = () => {
        callValidation(values.password, FormService.validatePassword, 'passwordFeedback');
    };
    const onBlurReEnterPasswords = () => {
        callValidation(values.reEnterPassword, FormService.validateReEnterPassword, 'reEnterPasswordFeedback');
    };

    const callValidatePasswords = (password, reEnterPassword) => {
        FormService.validateRegistrationPasswords(password, reEnterPassword).then((response) => {
            setValues({
                ...values,
                passwordFeedback: '',
                reEnterPasswordFeedback: ''
            });
        }).catch((err) => {
            const data = err.response.data;
            if(data.errorMsg) {
                setValues({
                    ...values,
                    passwordFeedback: data.errorMsg,
                    reEnterPasswordFeedback: data.errorMsg
                });
            }
        });
    };

    const callValidation = (value, validate, feedbackField) => {
        validate(value).then((response) => {
            setValues({
                ...values,
                feedbackField: ''
            });

            if(feedbackField === 'passwordFeedback' || feedbackField === 'reEnterPasswordFeedback'){
                callValidatePasswords(values.password, values.reEnterPassword);
            }
        }).catch((err) => {
            const data = err.response.data;
            if(data.errorMsg) {
                setValues({
                    ...values,
                    [feedbackField]: data.errorMsg
                });
            }
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            _signup(event);
        }
    };

    const isCorrectFeedback = () => {
        return values.emailFeedback === '' &&
            values.firstNameFeedback === ''&&
            values.lastNameFeedback === ''&&
            values.passwordFeedback === ''&&
            values.reEnterPasswordFeedback === '' &&
            values.genderFeedback === '';
    };

    const _signup = async (event) => {
        event.preventDefault();

        if(!isCorrectFeedback()){
            setValues({
                ...values,
                openAlert: true,
                alertText: 'Some fields are not filled properly',
            });
            return;
        }

        setValues({
            ...values,
            loading: true,
        });

        const data = {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            reEnterPassword: values.reEnterPassword,
            gender: values.gender
        };

        AuthService.signup(data).then(
            (response) => {
                WebSocketService.removeChatUserId();
                history.push("/login");
            }
        ).catch((err) => {
            const data = err.response.data;
            const newFeedback = {
                emailFeedback: values.emailFeedback,
                passwordFeedback: values.passwordFeedback,
                reEnterPasswordFeedback: values.reEnterPasswordFeedback,
                firstNameFeedback: values.firstNameFeedback,
                lastNameFeedback: values.lastNameFeedback,
                genderFeedback: values.genderFeedback
            };
            let errorMsg = data.errorMsg ? data.errorMsg : 'Unknown error';

            if(data.fieldErrors){
                errorMsg = 'Some fields are not filled properly'

                data.fieldErrors.forEach(fieldError => {
                    newFeedback[fieldError.field + 'Feedback'] = fieldError.message;
                });
            }

            setValues({
                ...values,
                loading: false,
                openAlert: true,
                alertText: err.response.data.error ? err.response.data.error : errorMsg,
                ...newFeedback
            });
        });

        setValues({
            ...values,
            loading: false,
        });
    };

    const renderAlert = () => {
        return (
            <AlertDialog
                open={values.openAlert}
                severity='error'
                onClose={() => {
                    setValues({
                        ...values,
                        openAlert: false
                    });
                }}
                title={values.alertText}
            />
        );
    };

    const renderForm = () => {
        return <Card style={{margin: "20px 0 0 0"}}>
            <CardContent className="text-center">
                <Grid align='center'>
                    <Avatar>
                        <PersonAdd />
                    </Avatar>
                    <Typography sx={{mb: 2}} variant={'h4'}>
                        SignUp
                    </Typography>
                </Grid>
                <Stack>
                    <div>
                        <Row>
                            <Col md={12}>
                                <OutlinedTextField
                                    formcontrolsx={{ my: 1 }}
                                    feedback={values.emailFeedback}
                                    id='email-registraion-textfield'
                                    type='email'
                                    placeholder='Enter email'
                                    label="Email"
                                    value={values.email}
                                    onBlur={onBlurEmail}
                                    onKeyDown={handleKeyDown}
                                    onChange={onChange('email')}
                                    startAdornment={<InputAdornment position="start"><AlternateEmailOutlined /></InputAdornment>}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <OutlinedTextField
                                    formcontrolsx={{ my: 1 }}
                                    feedback={values.firstNameFeedback}
                                    id='first-name-registraion-textfield'
                                    type='text'
                                    placeholder='Enter first name'
                                    label="First name"
                                    value={values.firstName}
                                    onBlur={onBlurFirstName}
                                    onKeyDown={handleKeyDown}
                                    onChange={onChange('firstName')}
                                    startAdornment={<InputAdornment position="start"><Person /></InputAdornment>}
                                />
                            </Col>
                            <Col md={6}>
                                <OutlinedTextField
                                    formcontrolsx={{ my: 1 }}
                                    feedback={values.lastNameFeedback}
                                    id='last-name-registraion-textfield'
                                    type='text'
                                    placeholder='Enter last name'
                                    label="Last name"
                                    value={values.lastName}
                                    onBlur={onBlurLastName}
                                    onKeyDown={handleKeyDown}
                                    onChange={onChange('lastName')}
                                    startAdornment={<InputAdornment position="start"><Person /></InputAdornment>}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <OutlinedTextField
                                    formcontrolsx={{ my: 1 }}
                                    feedback={values.passwordFeedback}
                                    id='password-registration-textfield'
                                    type={values.showPassword ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    label="Password"
                                    value={values.password}
                                    onBlur={onBlurPassword}
                                    onKeyDown={handleKeyDown}
                                    onChange={onChange('password')}
                                    startAdornment={<InputAdornment position="start"><LockOutlined /></InputAdornment>}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Col>
                            <Col md={6} >
                                <OutlinedTextField
                                    formcontrolsx={{ my: 1 }}
                                    feedback={values.reEnterPasswordFeedback}
                                    id='re-enter-password-registration-textfield'
                                    type={values.showReEnterPassword ? 'text' : 'password'}
                                    placeholder='Re-enter password'
                                    label="Re-enter password"
                                    value={values.reEnterPassword}
                                    onBlur={onBlurReEnterPasswords}
                                    onKeyDown={handleKeyDown}
                                    onChange={onChange('reEnterPassword')}
                                    startAdornment={<InputAdornment position="start"><LockOutlined /></InputAdornment>}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowReEnterPassword}
                                                onMouseDown={handleMouseDownReEnterPassword}
                                                edge="end"
                                            >
                                                {values.showReEnterPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col >
                                <FormControl
                                    component="fieldset"
                                    sx={{ mt: 1, ml: 1 }}
                                >
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-label="gender"
                                        name="controlled-radio-buttons-group"
                                        value={values.gender}
                                        onChange={onChange('gender')}
                                    >
                                        <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                        <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </FormControl>
                            </Col>
                        </Row>
                    </div>
                    <Divider sx={{mt: 1}}/>
                    <LoadingButton
                        sx={{my: 2}}
                        variant="contained"
                        onClick={_signup}
                        loading={values.loading}
                        fullWidth
                        loadingPosition="start"
                        startIcon={<PersonAdd />}
                    >
                        <span>SIGN UP</span>
                    </LoadingButton>
                    <Typography> Already have an account?
                        <Link onClick={() => {
                            WebSocketService.removeChatUserId();
                            props.history.push("/login")
                        }} sx={{ml: 1}}>
                            Login
                        </Link>
                        .
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    };

    return (
        <div style={{margin: '20px 0 20px 0'}}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={10} lg={8}>
                        {renderAlert()}
                        {renderForm()}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SignUp;
