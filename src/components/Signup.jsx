import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Link as Link1 } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { IoApertureOutline } from 'react-icons/io5';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:5173">
                Testing
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const nav = useNavigate();
    const handleSubmit = async (event) =>  {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');
        if (username === '' || password === '') {
            toast.error('Username or Password cannot be empty');
            return;
        }
        try {
            const resp = await axios.post('http://127.0.0.1:5000/signup', {
                username: data.get('username'),
                password: data.get('password'),
            });
            if (resp.data.status === 'ok') {
                toast.success('User Created Successfully');
                nav('/signin');
            }
        } catch (error) {
            toast.error(error.message || error);
        }
        
    };

    return (
        <Box sx={{
            paddingTop: 12,
            height: '100vh',
            backgroundColor: '#cfd8dd'
        }}>
            <Card component="main" variant='elevation' elevation={4} sx={{
                maxWidth: '500px',
                padding: '10px',
                marginX: 'auto'
            }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'black' }}>
                        <IoApertureOutline />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
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
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#000000', fontSize: '18px' }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link1 to="/signin">
                                    Already have an account? Sign in
                                </Link1>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Card>
        </Box>
    );
}