import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";

function Copyright(props) {
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

const theme = createTheme();

export default function SignInSide() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const [emailempty, setemailempty] = useState(false);
    const [passwordempty, setpasswordempty] = useState(false);
    const [isEmailValid, setisEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);


    function validateEmail(emailId) {
        let regex = /\S+@\S+\.\S+/;
        let valid = regex.test(emailId);
        console.log(valid);
        setisEmailValid(valid ? false : true);
    }


    const Login = async () => {
        let regex = /\S+@\S+\.\S+/;
        let validemail = regex.test(email);
        if (email == "") {
            setemailempty(true)
        }
        else if (validemail == false) {
            setisEmailValid(true)
        }
        else if (password == "") {
            setpasswordempty(true)
        } else {
            axios.get("https://retoolapi.dev/B13laa/getusers?user_id=" + email + "&password=" + password)
                .then(response => {
                    console.log(response);
                    window.location.href = "/home";
                    reactLocalStorage.setObject("userData", response.data[0]);
                })
                .catch(error =>
                    console.log(error)
                )
                ;
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        {/* <Box component="form" noValidate

                            sx={{ mt: 1 }}> */}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(val) => {
                                console.log("val", val.target.value);
                                setemail(val.target.value)
                                if (val.target.value) {
                                    setemailempty(false)
                                    validateEmail(val.target.value);
                                }
                                else {
                                    setemailempty(true)
                                    validateEmail(val.target.value);
                                }
                            }}
                        />

                        {emailempty ? (
                            <small style={{ color: "red" }}>
                                {" "}
                                Please enter a email.{" "}
                            </small>
                        ) : isEmailValid ?
                            <small style={{ color: "red" }}>
                                {" "}
                                Please enter a valid email.{" "}
                            </small> :
                            null}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(val) => {

                                setpassword(val.target.value)
                                if (val.target.value) {
                                    setpasswordempty(false)
                                }
                                else {
                                    setpasswordempty(true)
                                }
                            }}
                        />
                        {passwordempty ? (
                            <small style={{ color: "red" }}>
                                {" "}
                                Please enter a password.{" "}
                            </small>
                        ) : null}
                        {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={Login}
                        >
                            Sign In
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                        <Copyright sx={{ mt: 5 }} />
                        {/* </Box> */}
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}