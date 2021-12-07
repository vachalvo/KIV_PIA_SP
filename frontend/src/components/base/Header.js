import 'bootstrap/dist/css/bootstrap.css';
import {Navbar, Container, Nav} from "react-bootstrap";
import Logo from "../../img/favicon.png";
import AuthService from "../../services/auth-service";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSignInAlt, faUserPlus, faSignOutAlt, faIdCard, faSearch } from '@fortawesome/free-solid-svg-icons';
import {AppBar, Button, Box, IconButton, Menu, Toolbar, MenuItem, Typography} from "@mui/material";
import {
    AccountCircle,
    Feed,
    FeedOutlined,
    MenuOutlined, People,
    PeopleOutline, VpnKeyOutlined
} from "@mui/icons-material";
import "../../styles/components/header.css";

import {useState} from "react";

function Header(props) {
    const {currentUser} = props;

    const logout = () => {
        AuthService.logout();
    };

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                    onClick={handleCloseNavMenu}
                    href={'/profile'}
                >
                    <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key={"logout"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>);
    };

    const renderNotLoggedMenu = () => {
        return (<Box sx={{ flexGrow: 0 }}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
            >
                <VpnKeyOutlined />
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
                <MenuItem key={"login"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem key={"signup"} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Sign-up</Typography>
                </MenuItem>
            </Menu>
        </Box>);
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

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                            <MenuItem key={"feed"} onClick={handleCloseNavMenu} disableRipple>
                                <FeedOutlined style={{marginRight: '5px'}}/>
                                <Typography textAlign="center">Feed</Typography>
                            </MenuItem>
                            <MenuItem key={"friendship-management"} onClick={handleCloseNavMenu} disableRipple>
                                <PeopleOutline style={{marginRight: '5px'}}/>
                                <Typography textAlign="center">Friendship Management</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
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
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, 'gap': '20px' }}>
                        <Button
                            key={"feed_"}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white' }}
                            startIcon={<Feed />}
                            href="/"
                        >
                            Feed
                        </Button>
                        <Button
                            key={"friendship_"}
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: 'white' }}
                            startIcon={<People />}
                            href="/friends"
                        >
                            Friendship Management
                        </Button>
                    </Box>

                    {currentUser ? renderLoggedMenu() : renderNotLoggedMenu()}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

const tmp = () => {
    let currentUser = undefined;
    let logout = undefined;
    return (<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src={Logo}
                    width="35"
                    height="35"
                    className="d-inline-block align-content-center"
                />{' '}
                Squirrel
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                {!currentUser ? (
                    <Nav>
                        <Nav.Link href="/login"><FontAwesomeIcon icon={faSignInAlt} /> Login</Nav.Link>
                        <Nav.Link href="/signup"><FontAwesomeIcon icon={faUserPlus} /> Sign-up</Nav.Link>
                    </Nav>
                ) : (
                    <Nav>
                        <Nav.Link href="/friends"><FontAwesomeIcon icon={faUsers} /> Friends Management</Nav.Link>
                        <Nav.Link href="/profile"><FontAwesomeIcon icon={faIdCard} /> Profile</Nav.Link>
                        <Nav.Link href="/logout" onClick={logout}><FontAwesomeIcon icon={faSignOutAlt} /> Logout</Nav.Link>
                    </Nav>
                )}
            </Navbar.Collapse>
        </Container>
    </Navbar>);
}

export default Header;
