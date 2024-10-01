import React, { useState } from 'react';
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
import axios from 'axios';
import { useAuth } from './AuthContext';

const theme = createTheme();

const SignInPage = () => {
    const { login } = useAuth();  // Get the login function from context
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate(); // Initialize the navigate hook

    const performLogin = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: email,
                password: password,
            });
            console.log(response.data); // Handle successful login
            return response.data; // Return the login result message
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message); // Handle login error
            return 'Login Failed'; // Return a failure message
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        const result = await performLogin(email, password); // Perform login with email and password

        if (result.message === "Login successful") {
            console.log(`this is the result: ${result}`);
            console.log(`this is the role: ${result.role}`);
            const userRole = result.role;
            console.log(`this is the userRole: ${userRole}`);
            login(userRole);  // Update authentication state on success
            //RoleCheck();
            setLoginStatus(result);  // Optionally set the status for UI feedback
            navigate('/affiliates');       // Programmatically navigate to the home page
        } else {
            setLoginStatus(result); // Handle login failure
        }
    };

    return (
        <ThemeProvider theme={theme}>
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
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
                        </Grid>
                    </Box>
                    {loginStatus && <Typography color="error">{loginStatus}</Typography>}
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default SignInPage;
