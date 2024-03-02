import { Button, Box, Dialog, DialogContent, DialogTitle, TextField, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { IoClose } from 'react-icons/io5';

const RealtimeDialog = ({ open, handleClose }) => {
    const [conversation, setConversation] = useState('Your Message will appear here');
    const queryRef = useRef();

    const queryHandler = async () => {
        const query = queryRef.current.value;
        setConversation('Loading....');
        const formData = new FormData();
        formData.append('query', query);
        try {
            const resp = await axios.post('http://127.0.0.1:5000/realtime_query', formData);
            const data = resp.data;
            setConversation(data);
        } catch (error) {
            console.error(error);
            setConversation('Something went wrong');
        }

        queryRef.current.value === '';
    }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <IconButton sx={{
            position: 'absolute',
            top: '20px',
            right: '20px',
        }}
            size='large'
            onClick={() => handleClose()}
        >
            <IoClose />
        </IconButton>
        <DialogTitle>
            Realtime Query
        </DialogTitle>
        <DialogContent>
            {/* For Input and Button */}
            <Box sx={{
                display: 'flex', 
                flexDirection: 'column',
                padding: '50px',
                gap: '20px'
            }}>

                <Box sx={{
                    display: 'flex',
                    gap: '20px',
                    width: '100%',
                }}>
                    <TextField fullWidth label="Query" placeholder='Tell me the temperature of Jaipur' inputRef={queryRef}/>
                    <Button
                        variant='contained'
                        sx={{
                            backgroundColor: '#000000',
                            paddingX: '40px',
                            width: '50px'
                        }}
                        onClick={queryHandler}
                    >
                        Search
                    </Button>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid gray',
                    borderRadius: '5px',
                    height: '400px',
                    padding: '20px',
                }}
                >
                    {conversation}
                </Box>
            </Box>
        </DialogContent>
    </Dialog>
  )
}

export default RealtimeDialog;