import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Logo from '../../assets/images/lunch-icon.png'
import './Container.css'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Footer from '../sharedComponents/footer/Footer';
import { Outlet } from "react-router-dom"

const drawerWidth = 240;

function Container(props) {

    const {auth, setAuth, cart } = useContext(AuthContext);
   
    const navigate = useNavigate();
    const [pageName, setPageName] = useState('Dashboard');

    const userName = auth.username;
    console.log(userName)
    const foodCount = cart.length;
    console.log(foodCount)

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/home');
    }

    const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickPage = (param) => {
    console.log(param);
    setPageName(param)
    
    switch(param) {
        case 'History':
            navigate('/container/history');
          break;

        case 'Your Profile':
            navigate('/container/profile');
          break;

        case 'Your Cart':
            navigate('/container/cart');
            break;
           
        default:
            navigate('/container/dashboard');
        
      }

  };

  const drawer = (
    <div className='toolbar'>
        <div className = 'logoArea'> 
        <img src={Logo} 
      alt="Logo"/>
       <h1>LunchApp</h1>
      </div>
      <Toolbar className='toolbar' />
      <Divider />
      <List>
        {['Dashboard', 'Your Profile'].map((text, index) => (
          <ListItem className='logoArea' key={text} disablePadding>
            <ListItemButton onClick={() => handleClickPage(text)}>
              <ListItemIcon >
                {index % 2 === 0 ? <HomeIcon  className='iconList'/> : <ManageAccountsIcon className='iconList' />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem className='logoArea' key={'History'} disablePadding>
            <ListItemButton  onClick={() => handleClickPage('History')}>
              <ListItemIcon>
              <HistoryIcon className='iconList' />
              </ListItemIcon>
              <ListItemText primary={'History'} />
            </ListItemButton>
          </ListItem>
          <ListItem className='logoArea' key={'Your Cart'} disablePadding>
            <ListItemButton  onClick={() => handleClickPage('Your Cart')}>
              <ListItemIcon>
                <ShoppingCartIcon className='iconList' />
              </ListItemIcon>
              <ListItemText primary={'Your Cart'} />
              <Badge badgeContent={foodCount} color="primary"> </Badge>
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <main className="App">
    <div>
    <Box sx={{ display: 'flex',  }}>
    <CssBaseline />
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: '#00302E'
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' }, paper: {
    background: "blue"
  } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
        {pageName} 
        </Typography>
        <div className = 'right-hold'>
      <Stack direction="row" spacing={2}>
      
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt={userName.toUpperCase()}
        src="/broken-image.jpg"
      />
      <span>{userName}</span>

      </Stack>

      <div className="flexGrow">
      <Button  variant="contained" onClick={logout}>Sign Out</Button>
      </div>
      </div>
      </Toolbar>
    </AppBar>


    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 },   }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
      className='toolbar'
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#00302E',},
        }}
      >
        {drawer}
      </Drawer>

      <Drawer className='toolbar'
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#00302E',},
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>


    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },  backgroundColor: '#FBDDBB' }}
    >
      <Toolbar />
      <Outlet />
    </Box>
    
  </Box>
  <Footer />
  </div>
  </main>
  );
}
Container.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
export default Container;
