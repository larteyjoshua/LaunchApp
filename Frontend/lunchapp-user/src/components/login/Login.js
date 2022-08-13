import React, {useEffect, useState, useRef } from 'react';
import LoginImage from '../../assets/images/form-image.jpg';
import './Login.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import apiServices from '../../services/apiServices';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';




function Login() {


  const { setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/container";

  useEffect(() => {
    userRef.current.focus();
}, [])

  const [username, setUser] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
    });
  

    try {
      const response = await apiServices({
        method: "post",
        url: "/login",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      }
      );
      console.log('res', response)
      const username = data.get('username');
      const access_Token = response.data.access_token
      setAuth({ username, access_Token });
      navigate(from, { replace: true });

  } catch (err) {
       if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else {
          setErrMsg('Login Failed');
      }
      errRef.current.focus();
  }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', backgroundColor:'#FBDDBB', }}>
    <CssBaseline />
    <Grid
      item
      xs={false}
      sm={4}
      md={7}
      sx={{
        backgroundImage:`url(${LoginImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:'#FBDDBB',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%'
      }}
    />
    <Grid item xs={12} sm={8} md={5} component={Box} elevation={6} >
      <Box
        sx={{
          my: 8,
          mx: 4,
         
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor:'#FBDDBB',
          height: '100%',
          Paper: {background: '#FBDDBB'} 
         
        }}
      >
       

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
       
        <Typography  component="h1" variant="h5" color={' #00302E'}>
         Welcome Back!
         <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1   }}>
          <TextField 
            margin="normal"
            required
            fullWidth
            id="username"
            label="Email Address"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={(event) => setUser(event.target.value)}
            value ={username}
            ref={userRef}
            sx={{backgroundColor:'#FFFF' }}
            
            
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(event) => setPwd(event.target.value)}
            value={password}
            autoComplete="current-password"
            sx={{backgroundColor:'#FFFF' }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,  backgroundColor:'#00302E' }}
          >
           Login
          </Button>
          <Grid container  sx={{ mt: 3, mb: 2, my: 1,
          mx: 9, color:'#00302E' }}>
            <Grid item xs>
              <Link to="/passwordReset" >
                Forgot password?
              </Link>
            </Grid>
            
          </Grid>
        </Box>
      </Box>
    </Grid>
  </Grid> 
);
}

export default Login;
