import 'bootstrap/dist/css/bootstrap.css';
import {useState} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import PostService from "../../../services/post-service";
import {
    CardActions,
    Card,
    CardHeader,
    CardContent,
    FormControl,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    Divider
} from "@mui/material";
import {CampaignOutlined, SendOutlined} from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    card: {
        margin: '20px'
    },
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
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const _headerOnchange = (event) => {
        setHeader(event.target.value);
    };
    const _contentOnChange = (event) => {
        setContent(event.target.value);
    };

    const _onClick = async (event, announcement = false) => {
        event.preventDefault();
        setLoading(true);

        await PostService.create({
            header: header,
            content: content,
        }).then((data) => {
            setHeader('');
            setContent('');
            console.log("New Post: ", data);
        }).catch((err) => {
            console.log(err);
        });

        setLoading(false);
    }

    return (
        <div>
            <Card className={classes.card} sx={{ m: 1 }}>
                <CardHeader title="What is going on inside your head...?"/>
                <CardContent>
                    <Stack spacing={2} >
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Header</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={header}
                                disabled={loading}
                                onChange={_headerOnchange}
                                label="Header"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Content</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={content}
                                disabled={loading}
                                onChange={_contentOnChange}
                                label="Content"
                                multiline
                                rows={3}
                            />
                        </FormControl>
                    </Stack>
                </CardContent>
                <CardActions className={"justify-content-center"}>
                    <LoadingButton
                        className={classes.button}
                        color="success"
                        variant="contained"
                        onClick={(e) => _onClick(e)}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SendOutlined />}
                    >
                        <span className={classes.buttonText}>SEND POST</span>
                    </LoadingButton>
                    <LoadingButton
                        className={classes.button}
                        variant="contained"
                        onClick={() => alert("TODO")}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<CampaignOutlined />}
                    >
                        <span className={classes.buttonText}>SEND ANNOUNCEMENT</span>
                    </LoadingButton>
                </CardActions>
            </Card>
        </div>
    );
}

export default NewPost;
