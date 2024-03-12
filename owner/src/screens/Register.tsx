import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAppSelector from '../hooks/useAppSelecter';
import useAppDispatch from '../hooks/useAppDispatch';
import axios from 'axios';
import { createSingleUser } from '../redux/reducers/userReducer';

function Copyright(props: any) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [imageSender, setImageSender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [gotImage, setGotImage] = useState(false)

  const { user, loading, newUser } = useAppSelector(state => state.userReducer);

  const errorHandler = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setErrorMessage('');
    }, 3000);
  }
  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files?.[0];
    if (file) {
      formData.append('file', file);
    }
    formData.append("upload_preset", "ade40fld");
    //console.log("I am here");
    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dv4j8hjqf/image/upload", formData);
      setImageSender(response.data.public_id);
      console.log(imageSender);
    } catch (error) {
      console.log("Error occurred during user registration:", error);
      console.log("upload error");
    }
  }

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (firstName === '' || email === '' || password === '' || rePassword === '') {
      setErrorMessage('Please check all input');
      errorHandler();
    }
    else if (email.includes('@') === false || email.includes('.') === false) {
      setErrorMessage('Email format is wrong');
      errorHandler();
    }
    else if (password.length < 8 && rePassword.length < 8) {
      setErrorMessage('Password must be 8 charecters or long');
      errorHandler();
    }
    else if (password !== rePassword) {
      setErrorMessage('Password did not match');
      errorHandler();
    }
    else if (imageSender === null || imageSender === '') {
      setErrorMessage('Please upload an image');
      errorHandler();
    }
    else {
      dispatch(createSingleUser({ userData: { first_name: firstName, last_name: lastName, email: email, password: password, image: imageSender, role: "owner" } }))
        .then((action) => {
          if (!createSingleUser.rejected.match(action)) {
            if (action.payload.status === "okay") {
              navigate("/login")
            } else {
              setErrorMessage('Registration failled');
              errorHandler();
            }
          } else {
            console.error('Error occurred during registration:', action.error);
          }
        });
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleRegisterSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repassword"
                label="Re-Password"
                type="password"
                id="repassword"
                onChange={e => setRePassword(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <label>Image </label>
              <input
                required
                name="avater"
                type="file"
                id="avater"
                accept="image/*"
                onChange={handleImageUpload} />
            </Grid>
            <Grid item xs={12}>
              {showMessage ? (
                <p style={{ color: "red" }}>* {errorMessage}</p>
              ) : null}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  )
}

export default Register