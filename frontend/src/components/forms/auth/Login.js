import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";

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
    IconButton,
    Divider,
} from "@mui/material";
import {
    AlternateEmailOutlined,
    LockOutlined,
    LoginOutlined,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import {Col, Row} from "react-bootstrap";

import '../../../styles/components/login.css';
import LoadingButton from "@mui/lab/LoadingButton";
import OutlinedTextField from "../common/OutlinedTextField";
import AlertDialog from "../../common/AlertDialog";
import Constants from "../../../global/constants";
import {useHistory} from "react-router-dom";

function Login(props) {
    const {onLogin} = props;
    const history = useHistory();
    const [values, setValues] = useState({
        email: '',
        password: '',
        emailFeedback: '',
        passwordFeedback: '',
        showPassword: false,
        loading: false,
        openAlert: false,
        alertText: ''
    });

    const onChange = (prop) => (event) => {
        setValues({ ...values,
            [prop]: event.target.value,
            emailFeedback: prop === 'email' ? '' : values.emailFeedback,
            passwordFeedback: prop === 'password' ? '' : values.passwordFeedback,
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

    const onBlurEmail = () => {
        FormService.validateLoginEmail(values.email).then((response) => {
            setValues({
                ...values,
                emailFeedback: ''
            });
        }).catch((err) => {
            const data = err.response.data;
            if(data.errorMsg) {
                setValues({
                    ...values,
                    emailFeedback: data.errorMsg
                });
            }
        });
    };
    const onBlurPassword = () => {
        FormService.validatePassword(values.password).then((response) => {
            setValues({
                ...values,
                passwordFeedback: ''
            });
        }).catch((err) => {
            const data = err.response.data;
            if(data.errorMsg) {
                setValues({
                    ...values,
                    passwordFeedback: data.errorMsg
                });
            }
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            _login(event);
        }
    };

    const isCorrectFeedback = () => {
        return values.emailFeedback === '' && values.passwordFeedback === '';
    };

    const _login = (event) => {
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
            'email': values.email,
            'password': values.password
        };
        AuthService.login(data).then(
            (response) => {
                if (response.data.token) {
                    sessionStorage.setItem(Constants.SESSION_STORAGE_TOKEN, JSON.stringify(response.data.token));
                    sessionStorage.setItem(Constants.SESSION_STORAGE_USER_ID, JSON.stringify(response.data.id));
                    sessionStorage.setItem(Constants.SESSION_STORAGE_ADMIN, JSON.stringify(response.data.admin));
                }
                history.push('/');
                onLogin();
            }
        ).catch((err) => {
            console.log(err);
            const responsedata = err.response.data;
            const newFeedback = {
                emailFeedback: values.emailFeedback,
                passwordFeedback: values.passwordFeedback
            };
            let errorMsg = 'Unknown error';

            if(responsedata.fieldErrors){
                errorMsg = 'Some fields are not filled properly'

                responsedata.fieldErrors.forEach(fieldError => {
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
                content={values.alertText === 'Bad credentials' && 'Email or password is not correct.'}
            />
        );
    };
    const renderForm = () => {
        return (
            <Card style={{margin: "20px 0 0 0"}}>
                <CardContent className="text-center">
                    <Grid align='center'>
                        <Avatar>
                            <LockOutlined/>
                        </Avatar>
                        <Typography sx={{mb: 2}} variant={'h4'}>
                            Login
                        </Typography>
                    </Grid>
                    <Stack spacing={2}>
                        <OutlinedTextField
                            feedback={values.emailFeedback}
                            id='email-login-textfield'
                            type='email'
                            placeholder='Enter email'
                            label="Email"
                            value={values.email}
                            onBlur={onBlurEmail}
                            onKeyDown={handleKeyDown}
                            onChange={onChange('email')}
                            startAdornment={<InputAdornment position="start"><AlternateEmailOutlined /></InputAdornment>}
                        />
                        <OutlinedTextField
                            feedback={values.passwordFeedback}
                            id='password-login-textfield'
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
                        <Divider />
                        <LoadingButton
                            variant="contained"
                            onClick={_login}
                            loading={values.loading}
                            fullWidth
                            loadingPosition="start"
                            startIcon={<LoginOutlined />}
                        >
                            <span>LOGIN</span>
                        </LoadingButton>
                        <Typography > New to Squirrel?
                            <Link onClick={() => history.push("/signup")} sx={{ml: 1}}>
                                Create an account
                            </Link>
                            .
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        );
    }
    return (
        <div style={{margin: '20px 0 20px 0'}}>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={8} lg={6}>
                        {renderAlert()}
                        {renderForm()}
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
