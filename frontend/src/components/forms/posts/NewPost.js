import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import UserService from "../../../services/user-service";
import PostService from "../../../services/post-service";
import {
    CardActions,
    Card,
    CardHeader,
    CardContent,
    InputAdornment
} from "@mui/material";
import {Abc, CampaignOutlined, SendOutlined, Title} from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import {Col, Row} from "react-bootstrap";
import OutlinedTextField from "../common/OutlinedTextField";
import AlertDialog from "../../common/AlertDialog";

const useStyles = makeStyles(theme => ({
    button: {
        [theme.breakpoints.down("xs")]: {
            minWidth: 32,
            paddingLeft: 8,
            paddingRight: 8,
            "& .MuiButton-startIcon": {
                margin: 0
            }
        }
    },
    buttonText: {
        [theme.breakpoints.down("xs")]: {
            display: "none"
        }
    }
}));

function NewPost() {
    const classes = useStyles();
    const [values, setValues] = useState({
        header: '',
        content: '',
        headerFeedback: '',
        contentFeedback: '',
        alertOpen: false,
        alertSeverity: 'success',
        alertText: '',
        alertSecondaryText: '',
        loading: false
    });

    const _onChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value,
            [prop + 'Feedback']: ''
        });
    };

    const _onClick = async (event, announcement = false) => {
        event.preventDefault();
        setValues({
            ...values,
            loading: true
        });

        PostService.create({
            header: values.header,
            content: values.content,
            announcement: announcement
        }).then((data) => {
            setValues({
                ...values,
                content: '',
                header: '',
                alertSeverity: 'success',
                alertText: 'Congratulation',
                alertSecondaryText: 'New post was successfulyy created.',
                alertOpen: true
            });

            console.log("New Post: ", data);
        }).catch((err) => {
            const responsedata = err.response.data;
            const newFeedback = {
                headerFeedback: values.headerFeedback,
                contentFeeback: values.contentFeeback
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
                alertOpen: true,
                alertSeverity: 'error',
                alertText: 'Ohh no...Something happened',
                alertSecondaryText: err.response.data.error ? err.response.data.error : errorMsg,
                ...newFeedback
            });
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            _onClick(event);
        }
    };

    const renderAlert = () => {
        return (
            <AlertDialog
                open={values.alertOpen}
                severity={values.alertSeverity}
                onClose={() => {
                    setValues({
                        ...values,
                        alertOpen: false,
                        alertText: '',
                        alertSecondaryText: '',
                    });
                }}
                title={values.alertText}
                content={values.alertSecondaryText}
            />
        );
    };

    return (
        <div style={{margin: '20px 0 20px 0'}}>
            {renderAlert()}
            <Row className={"justify-content-center"}>
                <Col md={10}>
                    <Card style={{margin: '20px 0'}} sx={{ m: 1 }}>
                        <CardHeader title="What is going on inside your head...?"/>
                        <CardContent>
                            <OutlinedTextField
                                formcontrolsx={{ my: 1 }}
                                feedback={values.headerFeedback}
                                id='header-textfield'
                                type='text'
                                placeholder='Enter title'
                                label="Title"
                                value={values.header}
                                onChange={_onChange('header')}
                                onKeyDown={handleKeyDown}
                                startAdornment={<InputAdornment position="start"><Title /></InputAdornment>}
                            />
                            <OutlinedTextField
                                formcontrolsx={{ my: 1 }}
                                feedback={values.contentFeedback}
                                id='content-textfield'
                                type='text'
                                placeholder='Enter content'
                                label="Content"
                                value={values.content}
                                onChange={_onChange('content')}
                                onKeyDown={handleKeyDown}
                                startAdornment={<InputAdornment position="start"><Abc /></InputAdornment>}
                                multiline
                                rows={3}
                            />
                        </CardContent>
                        <CardActions className={"justify-content-center"}>
                            <LoadingButton
                                className={classes.button}
                                color="success"
                                variant="contained"
                                onClick={(e) => _onClick(e)}
                                loading={values.loading}
                                loadingPosition="start"
                                startIcon={<SendOutlined />}
                            >
                                <span className={classes.buttonText}>SEND POST</span>
                            </LoadingButton>
                            {
                                UserService.isUserAdmin() &&
                                <LoadingButton
                                    className={classes.button}
                                    variant="contained"
                                    onClick={(e) => _onClick(e, true)}
                                    loading={values.loading}
                                    loadingPosition="start"
                                    startIcon={<CampaignOutlined />}
                                >
                                    <span className={classes.buttonText}>SEND ANNOUNCEMENT</span>
                                </LoadingButton>
                            }
                        </CardActions>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default NewPost;
