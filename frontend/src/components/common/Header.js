import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Container, Nav} from "react-bootstrap";
import Logo from "../../img/favicon.png";
import AuthService from "../../services/auth-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSignInAlt, faUserPlus, faSignOutAlt, faIdCard, faSearch } from '@fortawesome/free-solid-svg-icons';
import {AppBar, Button, Box, IconButton, Menu, Link, Toolbar, MenuItem, Typography} from "@mui/material";
import {
    AccountCircle, ExitToApp,
    Feed,
    FeedOutlined, Login, LoginOutlined, MeetingRoom, MeetingRoomOutlined, MeetingRoomTwoTone,
    MenuOutlined, People,
    PeopleOutline, PersonAdd, VpnKeyOutlined
} from "@mui/icons-material";
import "../../styles/components/header.css";

import {useState} from "react";
import {useHistory} from "react-router-dom";

function Header(props) {
    const { currentUser, onLogout } = props;
    const history = useHistory();

    const logout = () => {
        onLogout();
        history.push('/logout');
    };

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = (link) => {
        redirect(link);
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = (link) => {
        redirect(link);
        setAnchorElUser(null);
    };
    const redirect = (link) => {
        if(link) {
            history.push(link);
        }
    };

    const renderLoggedMenu = () => {
        return (<Box sx={{ flexGrow: 0 }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    key={"profile"}
                    onClick={() => handleCloseUserMenu('/profile')}
                >
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                    key={"logout"}
                    onClick={() => {
                        logout();
                        handleCloseUserMenu('/logout')
                    }}
                >
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>);
    };

    const renderNotLoggedMenu = () => {
        return (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex' },  'justifyContent': 'flex-end'}}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenUserMenu}
                    color="inherit"
                >
                    <ExitToApp />
                </IconButton>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem
                        key={"login"}
                        onClick={() => handleCloseUserMenu('/login')}
                    >
                        <Login style={{marginRight: '5px'}}/>
                        <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    <MenuItem
                        key={"signup"}
                        onClick={() => handleCloseUserMenu('/signup')}
                    >
                        <PersonAdd style={{marginRight: '5px'}}/>
                        <Typography textAlign="center">Sign-up</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        );
    };
    return (
        <AppBar position="static">
            <Container>
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        <img
                            alt=""
                            src={Logo}
                            width="35"
                            height="35"
                            style={{marginRight: '5px'}}
                            className="d-inline-block align-content-center"
                        />{' '}
                        Squirrel
                    </Typography>

                    {currentUser && <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuOutlined />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem
                                key={"feed"}
                                onClick={() => handleCloseNavMenu('/')}
                            >
                                <FeedOutlined style={{marginRight: '5px'}}/>
                                <Typography textAlign="center">Feed</Typography>
                            </MenuItem>
                            <MenuItem
                                key={"friendship-management"}
                                onClick={() => handleCloseNavMenu('/friends')}
                            >
                                <PeopleOutline style={{marginRight: '5px'}}/>
                                <Typography textAlign="center">Friendship Management</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    }
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        <img
                            alt=""
                            src={Logo}
                            width="35"
                            height="35"
                            style={{marginRight: '5px'}}
                            className="d-inline-block align-content-center"
                        />{' '}
                        Squirrel
                    </Typography>
                    {currentUser &&
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, 'gap': '20px' }}>
                            <Button
                                key={"feed_"}
                                onClick={() => handleCloseNavMenu('/')}
                                sx={{ my: 2, color: 'white' }}
                                startIcon={<Feed />}
                            >
                                Feed
                            </Button>
                            <Button
                                key={"friendship_"}
                                onClick={() => handleCloseNavMenu('/friends')}
                                sx={{ my: 2, color: 'white' }}
                                startIcon={<People />}
                            >
                                Friendship Management
                            </Button>
                        </Box>
                    }
                    {currentUser ? renderLoggedMenu() : renderNotLoggedMenu()}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
