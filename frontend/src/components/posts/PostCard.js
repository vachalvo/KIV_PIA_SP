import 'bootstrap/dist/css/bootstrap.css';
import {
    Card,
    CardHeader,
    CardContent,
    IconButton,
    Avatar,
    Grow,
    Paper,
    Popper,
    MenuList,
    ClickAwayListener,
    MenuItem,
    ListItemIcon,
} from "@mui/material";
import {
    DeleteOutline,
    ModeEditOutline,
    MoreVertOutlined,
} from "@mui/icons-material";
import {blue, pink} from "@mui/material/colors";
import {useRef, useState, useEffect} from "react";
import {Col, Row} from "react-bootstrap";

function PostCard(props) {
    const { post, currentUserId, onEdit, onDelete } = props;
    const { user } = post;

    const date = new Date(post.dateTimeOfPublished);
    const [openMenu, setOpenMenu] = useState(false);

    const anchorRef = useRef(null);
    const prevOpen = useRef(openMenu);

    useEffect(() => {
        if (prevOpen.current === true && openMenu === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = openMenu;
    }, [openMenu]);

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpenMenu(false);
    };

    return (
        <div>
            <Row className={"justify-content-center"}>
                <Col md={8}>
                    <Card sx={{ my: '10px'}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: user.gender === 'MALE' ? blue[500] : pink[500] }} aria-label="avatar-post-card">
                                    {user.name.charAt(0)}
                                </Avatar>
                            }
                            action={
                                <div>
                                    {
                                        currentUserId === user.id &&
                                        <IconButton
                                            aria-label="settings"
                                            ref={anchorRef}
                                            id="composition-button"
                                            aria-controls={openMenu ? 'composition-menu' : undefined}
                                            aria-expanded={openMenu ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={handleToggle}
                                        >
                                            <MoreVertOutlined />
                                        </IconButton>
                                    }
                                    <Popper
                                        open={openMenu}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        placement="bottom-start"
                                        transition
                                        disablePortal
                                    >
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{
                                                    transformOrigin:
                                                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                                                }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList
                                                            autoFocusItem={openMenu}
                                                            id="composition-menu"
                                                            aria-labelledby="composition-button"
                                                        >
                                                            <MenuItem onClick={() => onEdit(props.post)}>
                                                                <ListItemIcon>
                                                                    <ModeEditOutline color="primary" />
                                                                </ListItemIcon>
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem onClick={() => onDelete(props.post)}>
                                                                <ListItemIcon>
                                                                    <DeleteOutline color="error"/>
                                                                </ListItemIcon>
                                                                Delete
                                                            </MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </div>

                            }
                            title={<b>{user.name}</b>}
                            subheader={date.toLocaleString()}
                        />
                        <CardContent sx={{
                            'wordBreak': 'break-all'
                        }}>
                            <h4>
                                {post.announcement ?? 'Annoucement'}
                            </h4>
                            <h5>
                                {props.post.header}
                            </h5>
                            <p>
                                {' '}{props.post.content}{' '}
                            </p>
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default PostCard;
