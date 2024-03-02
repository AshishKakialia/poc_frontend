import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

import KbListItem from './KbListItem';
const KbList = ({ setShowing }) => {
    const nav = useNavigate();
    const [kbList, setKbList] = useState([]);
    useEffect(() => {
        const getKbList = async () => {
            try {
                const session_token = localStorage.getItem('session_token');
                const user_id = localStorage.getItem('user_id');
                if (!session_token) {
                    toast.error('Not Loggedin! Try Logging in First');
                    nav('/signin');
                }
                const formData = new FormData();
                formData.append('user_id', user_id);
                const resp = await axios.post('http://127.0.0.1:5000/knowledge_bases', formData);
                if (resp.data.error) {
                    console.log(resp.data.error);
                    toast.error(resp.data.error);  
                }
                else {
                    await setKbList(resp.data.knowledge_bases);
                    console.log(kbList);
                    console.log('done');
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
                setShowing(false);
            }
        }
        getKbList();
    }, []);
    
  return (
    <Box sx={{
        maxHeight: '30%',
        overflowY: 'scroll',
        scrollbarWidth: '10px',
        padding: '15px',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    }}>
        {(kbList.length !== 0) && kbList.map((kb, index) => {
            return <KbListItem kb={kb} key={index} />
        })}
    </Box>
  )
}

export default KbList;