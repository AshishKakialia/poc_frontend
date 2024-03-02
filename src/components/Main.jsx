import React, { useEffect, useState } from 'react'
import { IoMenu } from 'react-icons/io5';
import { Box, IconButton } from '@mui/material';
import Hero from './Hero';
import SidebarNow from './SidebarNow';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';
import axios from 'axios';
const Main = () => {
    const nav = useNavigate();
    useEffect(() => {
        const session_token = localStorage.getItem('session_token');
        const user_id = localStorage.getItem('user_id');

        const checkLoggedIn = async () => {
            try {
                if (!session_token || !user_id) {
                    throw new Error('Login First!');
                }
                const resp = await axios.post('http://127.0.0.1:5000/check_session', {
                    'session_token': session_token,
                    "user_id": user_id
                });
                if (resp.data.status === 'invalid') {
                    throw new Error(resp.data.status);
                } else {
                    toast('Welcome to POC');
                }
            } catch (error) {
                toast.error(error.message || error);
                nav('/signin');
            }
        }

        checkLoggedIn();        
    }, []);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => {
            return !prev;
        });
    }

    const toggleDeleteModal = () => {
        setIsDeleteOpen((prev) => (!prev));
    }
    
    return (
        <Box>
            <IconButton
                style={{
                    position: 'fixed',
                    top: '20px',
                    right: '20px',
                    backgroundColor: '#000000',
                    color: 'white'
                }}
                onClick={toggleSidebar}
                variant='text'
                color='secondary'
                size='large'
            >
                <IoMenu size={30} />
            </IconButton>
            <SidebarNow isOpen={isSidebarOpen} toggle={toggleSidebar} isDeleteOpen={isDeleteOpen} toggleDeleteModal={toggleDeleteModal}/>
            <Hero />
        </Box>
    )
}

export default Main;