import 'bootstrap/dist/css/bootstrap.css';
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import PostCard from "./PostCard";
import PostService from "../services/post-service";
import {
    Alert,
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Divider,
    FormControl, InputAdornment,
    InputLabel,
    OutlinedInput, Snackbar,
    Stack
} from "@mui/material";
import {Abc, AlternateEmailOutlined, CloseOutlined, DeleteOutline, EditOutlined, Title} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuthService from "../services/auth-service";
import SnackBarAlert from "./errors/SnackBarAlert";
import OutlinedTextField from "./forms/common/OutlinedTextField";

const PostList = forwardRef((props, ref) => {
    const { findAll, disableRefresh } = props;
    useImperativeHandle(ref, () => ({
        getData() {
            alert("bottom", posts);
        }
    }));

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const [alertValues, setAlertValues] = useState({
        open: false,
        text: '',
        severity: 'success'
    });
    const [values, setValues] = useState({
        id: '',
        header: '',
        content: '',
        loading: false,
        headerFeedback: '',
        contentFeedback: ''
    });

    const userId = AuthService.getCurrentUserId();

    useEffect(() => {
        getPosts();
    },[]);

    useEffect(() => {
        if(disableRefresh){
            return;
        }
        const interval = setInterval(() => {
            getPosts();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getPosts = () => {
        findAll(page).then((response) => {
            setPosts(response.data.posts);
        });
    }

    const setPost = (post) => {
        setValues({
            ...values,
            id: post.id,
            header: post.header,
            content: post.content,
            headerFeedback: '',
            contentFeedback: ''
        });
    }
    const clearStates = () => {
        setValues({
            ...values,
            id: '',
            header: '',
            content: ''
        });
    };

    const onOpenEditDialog = (post) => {
        setPost(post);
        setOpenEditDialog(true);
    };
    const editPost = () => {
        setLoading(true);

        PostService.editPost(values.id, values.header, values.content).then(() => {
            onCloseEditDialog();

            setAlertValues({
                ...alertValues,
                open: true,
                severity: 'success',
                text: 'Post was successfully edited.'
            });

            getPosts();
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
                ...newFeedback
            });
            setAlertValues({
                ...alertValues,
                severity: 'error',
                text: err.response.data.error ? err.response.data.error : errorMsg,
                open: true
            });
            setLoading(false);
        });

        setLoading(false);
    };
    const onCloseEditDialog = () => {
        setOpenEditDialog(false);
        clearStates();
    };

    const onOpenDeleteDialog = (post) => {
        setPost(post);
        setOpenDeleteDialog(true);
    };
    const deletePost = () => {
        setLoading(true);

        PostService.deletePost(values.id).then(() => {
            onCloseDeleteDialog();

            setAlertValues({
                ...alertValues,
                open: true,
                severity: 'success',
                text: 'Post was successfully deleted.'
            });

            getPosts();
        }).catch((err) => {
            setAlertValues({
                ...alertValues,
                open: true,
                severity: 'error',
                text: 'Post was not deleted. Please try it later.'
            });
        });

        setLoading(false);
    };

    const onCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        clearStates();
    };

    const _onChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value,
            [prop + 'Feedback']: ''
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            editPost(event);
        }
    };

    const renderEditDialog = () => {
        return (
            <Dialog
                fullWidth
                maxWidth="md"
                fullScreen={fullScreen}
                open={openEditDialog}
                onClose={onCloseEditDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Edit post"}
                </DialogTitle>
                <DialogContent>
                    <Divider sx={{my: 1}}/>
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
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onCloseEditDialog} startIcon={<CloseOutlined />}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={editPost} color="success" autoFocus startIcon={<EditOutlined />}>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderDeleteDialog = () => {
        return (
            <Dialog
                fullWidth
                maxWidth="md"
                fullScreen={fullScreen}
                open={openDeleteDialog}
                onClose={onCloseDeleteDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Really?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you really want to delete this post? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={onCloseDeleteDialog} startIcon={<CloseOutlined />}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={deletePost} color="error" autoFocus startIcon={<DeleteOutline />}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const renderPosts = posts.map((post) => {
        return <PostCard
            key={post.id}
            post={post}
            currentUserId={userId}
            onEdit={onOpenEditDialog}
            onDelete={onOpenDeleteDialog}
        />;
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }

        setAlertValues({
            ...alertValues,
            open: false
        });
    };

    const renderSnackBar = () => {
        return (
            <SnackBarAlert
                open={alertValues.open}
                onClose={handleClose}
                severity={alertValues.severity}
                text={alertValues.text}
                />
        );
    };

    return (
        <div>
            {renderSnackBar()}
            {renderEditDialog()}
            {renderDeleteDialog()}
            {posts && renderPosts}
        </div>
    );
});

export default PostList;
