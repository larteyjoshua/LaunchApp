import React, { useEffect, useState, useRef } from 'react';
import LoginImage from '../../assets/images/form-image.jpg';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate, useLocation } from 'react-router-dom';
import apiServices from '../../services/apiServices';
import { useSnackbar } from "notistack";

function PasswordRecover() {
    const { enqueueSnackbar } = useSnackbar();
    const [errMsg, setErrMsg] = useState('');
    const [password1, setPassword1] = useState('');
    const [password, setPassword] = useState('');
   
  
    const userRef = useRef();
    const errRef = useRef();
  
    const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || "/login";
  
    useEffect(() => {
      userRef.current.focus();
  }, [])
  
  
      const handleSubmit = (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
        console.log(data.get('password1'))
        console.log(data.get('password'))
          if(password1 === password)
          {
            handleNewPasswordSubmit(data);
          } else {
            setErrMsg('Password mismatch!')
          }
       
        };
  
       const handleNewPasswordSubmit = async (value) =>{
     
       const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
        let token = params.token; // "some_value
        console.log(token)
        const data = { "token":token,  
        "new_password":value.get('password')
        }
          try {
            const response = await apiServices({
              method: "post",
              url: "/reset-password/",
              data: data,
              headers: { "Content-Type": "application/json" },
            }
            );
            console.log('res', response)
           
            navigate(from, { replace: true });
            const message = response.data.msg;
            console.log(message)
            enqueueSnackbar(message, { variant: "success", });
      
        } catch (err) {
             if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.response?.data);
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
         Password Recovery!
         <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1   }}>
          <TextField 
            margin="normal"
            required
            fullWidth
            id="password1"
            label="password"
            name="password1"
            type="password"
            autoComplete="current-password"
            autoFocus
            ref={userRef}
            onChange={(event) => setPassword1(event.target.value)}
            value ={password1}
            sx={{backgroundColor:'#FFFF' }}
          />
              <TextField 
            margin="normal"
            required
            fullWidth
            id="password"
            label="repeat Password"
            name="password"
            type="password"
            autoComplete="current-password"
            autoFocus
            ref={userRef}
            onChange={(event) => setPassword(event.target.value)}
            value ={password}
            sx={{backgroundColor:'#FFFF' }}
          />

          
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,  backgroundColor:'#00302E' }}
          >
           Submit
          </Button>
          <Grid container  sx={{ mt: 2, mb: 2,  my: 1,
          mx: 9,
          color:'#00302E' }}>
            <Grid item xs>
            <Link to="/login"> Login </Link>
            </Grid>
            
          </Grid>
        </Box>
      </Box>
    </Grid>
  </Grid> 
  );
}

export default PasswordRecover;
