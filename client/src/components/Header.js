import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import CallIcon from '@mui/icons-material/Call';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const pages = ['Home', 'About', 'Blog', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    return (
        <AppBar position="static" sx={{ backgroundColor: '#378CE7' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: '#DDDDDD',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ justifyContent: 'space-between', display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="#DDDDDD"
                        >
                            <MenuIcon />
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
                                justifyContent: 'center'
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu} >
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


                    <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' ,width:'35%'}}>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between' }}>
                            <Typography sx={{color:'#DDDDDD'}}>Home</Typography>
                            <Box sx={{display:'flex'}}>
                            <Typography sx={{color:'#DDDDDD'}}>Board</Typography>
                            </Box>
                            <Typography sx={{color:'#DDDDDD'}}>About</Typography>
                            <Typography sx={{color:'#DDDDDD'}}>Contact</Typography>
                        </Box>
                    </Box>

                    <Typography sx={{ display: { xs: 'block', sm: 'none' } }}> Logo</Typography>
                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                        {/* <CallIcon sx={{ color: '#DDDDDD', display: { xs: 'none', sm: 'block' } }} />
                        <Box sx={{ marginRight: '15px', color: '#DDDDDD', display: { xs: 'none', sm: 'block' } }} >+91 9632154871</Box>
                        <Button variant="contained" sx={{ backgroundColor: '#627254', '&:hover': { backgroundColor: '#76885B' } }}>
                            Pricing
                        </Button> */}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;