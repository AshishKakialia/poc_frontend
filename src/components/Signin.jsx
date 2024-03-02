import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { Link as Link1} from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IoApertureOutline } from 'react-icons/io5';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Card } from '@mui/material';

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

export default function SignIn() {
    const nav = useNavigate();
    useEffect(() => {
        const session_token = localStorage.getItem('session_token');
        const user_id = localStorage.getItem('user_id');
        const checkLoggedIn = async () => {
            try {
                if (!session_token || !user_id) {
                    return;
                }
                const resp = await axios.post('http://127.0.0.1:5000/check_session', {
                    "session_token": session_token,
                    "user_id": user_id
                });
                
                if (resp.data.status === 'valid') {
                    nav('/');
                }
            } catch (error) {
                toast.error(error.message);
            }
        }

        checkLoggedIn();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');

        if (username === '' || password === '') {
            toast.error('Username or Password cannot be empty');
            return;
        }

        try {
            const resp = await axios.post('http://127.0.0.1:5000/login', {
                username, password
            });

            if (resp.data.error) {
                throw new Error(resp.data.error);
            }

            if (!resp.data.session_token || !resp.data.user_id) {
                throw new Error('Invalid Credentials');
            }

            localStorage.setItem('session_token', resp.data.session_token);
            localStorage.setItem('user_id', resp.data.user_id);
            nav('/');
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
                padding: '20px',
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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            type='email'
                            autoComplete="username"
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
                            sx={{ 
                                mt: 3, 
                                mb: 2,
                                backgroundColor: '#000000',
                                fontSize: '18px',
                            }}
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
                                <Link1 to="/signup">
                                    {"Don't have an account? Sign Up"}
                                </Link1>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5}} />
            </Card>
        </Box>
    );
}