import 'bootstrap/dist/css/bootstrap.css';
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import PostCard from "./PostCard";
import PostService from "../services/post-service";
import {
    Button,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Divider,
    FormControl,
    InputLabel,
    OutlinedInput,
    Stack
} from "@mui/material";
import {CloseOutlined, DeleteOutline, EditOutlined} from "@mui/icons-material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import AuthService from "../services/auth-service";

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
    const [id, setId] = useState('');
    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');

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
        setId(post.id);
        setHeader(post.header);
        setContent(post.content);
    }
    const clearStates = () => {
        setId('');
        setHeader('');
        setContent('');
    };

    const onOpenEditDialog = (post) => {
        console.log("Editing post: ", post);
        setPost(post);
        setOpenEditDialog(true);
    };
    const editPost = () => {
        setLoading(true);

        PostService.editPost(id, header, content).then(() => {
            onCloseEditDialog();
            getPosts();
        });

        setLoading(false);
    };
    const onCloseEditDialog = () => {
        setOpenEditDialog(false);
        clearStates();
    };

    const onOpenDeleteDialog = (post) => {
        console.log("Deleting post: ", post);
        setPost(post);
        setOpenDeleteDialog(true);
    };
    const deletePost = () => {
        setLoading(true);

        PostService.deletePost(id).then(() => {
            onCloseDeleteDialog();
            getPosts();
        });

        setLoading(false);
    };
    const onCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        clearStates();
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
                    <Stack spacing={2} >
                        <Divider />
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Header</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={header}
                                onChange={(e) => setHeader(e.target.value)}
                                label="Header"
                                disabled={loading}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="outlined-adornment-amount">Content</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={content}
                                disabled={loading}
                                onChange={(e) => setContent(e.target.value)}
                                label="Content"
                                multiline
                                rows={3}
                            />
                        </FormControl>
                    </Stack>
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
            onDelete={onOpenDeleteDialog}/>;
    })

    return (
        <div>
            {renderEditDialog()}
            {renderDeleteDialog()}
            {posts && renderPosts}
        </div>
    );
});

export default PostList;
