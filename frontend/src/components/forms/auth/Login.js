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
    InputLabel,
    FormControl,
    OutlinedInput,
    IconButton,
    FormHelperText,
    Divider,
    AlertTitle, Alert, Collapse
} from "@mui/material";
import {
    AlternateEmailOutlined, Close,
    LockOutlined,
    LoginOutlined,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import {Col, Row} from "react-bootstrap";

import '../../../styles/components/login.css';
import LoadingButton from "@mui/lab/LoadingButton";

function Login(props) {
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
    }
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

    const _login = (event) => {
        event.preventDefault();

        setValues({
            ...values,
            loading: true,
        });

        const data = {
            'email': values.email,
            'password': values.password
        };
        AuthService.login(data).then(
            () => {
                props.history.push("/");
                window.location.reload();
            }
        ).catch((err) => {
            const data = err.response.data;
            const newFeedback = {
                emailFeedback: values.emailFeedback,
                passwordFeedback: values.passwordFeedback
            };
            let errorMsg = 'Unknown error';

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
            <Collapse in={values.openAlert}>
                <Alert
                    severity="error"
                    action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setValues({
                                ...values,
                                openAlert: false
                            });
                        }}
                    >
                        <Close fontSize="inherit" />
                    </IconButton>
                }
                       sx={{ mb: 2 }}>
                    <AlertTitle><strong>{values.alertText}</strong></AlertTitle>
                </Alert>
            </Collapse>
        );
    }
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
                        <FormControl
                            variant="outlined"
                            error={values.emailFeedback !== ''}
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type='email'
                                onKeyDown={handleKeyDown}
                                value={values.email}
                                placeholder='Enter email'
                                onBlur={onBlurEmail}
                                onChange={onChange('email')}
                                startAdornment={<InputAdornment position="start"><AlternateEmailOutlined /></InputAdornment>}
                                label="Email"
                            />
                            <FormHelperText id="email-error-text">{values.emailFeedback}</FormHelperText>
                        </FormControl>
                        <FormControl
                            sx={{ m: 1 }}
                            variant="outlined"
                            error={values.passwordFeedback !== ''}
                            fullWidth
                        >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                placeholder='Enter password'
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
                                label="Password"
                            />
                            <FormHelperText id="password-error-text">{values.passwordFeedback}</FormHelperText>
                        </FormControl>
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
                            <Link onClick={() => props.history.push("/signup")} sx={{ml: 1}}>
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
