import { Snackbar, Alert, Box, TextField, Typography, IconButton, useMediaQuery, Button, Badge, Autocomplete } from '@mui/material';
import { BiArrowBack } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';
import { RiRestartLine } from 'react-icons/ri'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import MessageList from './MessageList';
import { useRecoilValue } from 'recoil'
import kbSelect from '../store/kbSelect';
import toast from 'react-hot-toast';

const Hero = () => {
    const isSmallScreen = useMediaQuery('(max-width: 860px)');
    const [questionInput, setQuestionInput] = useState('');
    // const [kb, setkb] = useState('');
    const [counter, setCounter] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    // const [options, setOptions] = useState([]);
    const kb = useRecoilValue(kbSelect);

    // useEffect(() => {
    //     const getOptions = async () => {
    //         const user_id = localStorage.getItem('user_id');
    //         const formData = new FormData();
    //         formData.append('user_id', user_id);
    //         const res = await axios.post('http://127.0.0.1:5000/knowledge_bases', formData);
    //         const knowledge_bases = res.data.knowledge_bases
    //         console.log(knowledge_bases)
    //         if (res.data.length === 0) {
    //             setOptions([]);
    //             return;
    //         } else {
    //             for (let kb of knowledge_bases) {
    //                 setOptions((prev) => {
    //                     return [...prev, kb.name];
    //                 })
    //             }

    //         }
    //     }
    //     getOptions();
    // }, [])

    const goBackHandler = () => {
        setCounter((prev) => {
            if (prev === 0) {
                return 0;
            }
            return prev - 1;
        });
    }

    const startOverHandler = () => {
        setCounter(0);
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    }

    const handleSearch = async (e) => {

        if (kb === '') {
            toast.error('Please select a knowledge base first!');
            return;
        }
        
        if (questionInput === '') {
            toast.error('Please enter a query first!');
            return;
        }

        if (counter === 10) {
            setOpenSnackbar(true);
            return;
        }

        const user_id = localStorage.getItem('user_id');

        try {
            setIsLoading(true);
            if (kb === '') {
                return;
            }
            const res = await axios.post(`http://127.0.0.1:5000/query_knowledge_base?user_id=${user_id}&kb_name=${kb}&user_query=${questionInput}`);

            if (res.data.error) {
                throw new Error(res.data.error);
            }

            setCounter((prev) => {
                return prev + 1;
            });

            const message = res.data.assistant_message;
            console.log(message)

            setMessages((prev) => {
                const newList = [...prev, message];
                return newList;
            })

        } catch (error) {
            console.log(error);
        }

        setQuestionInput('');
        setIsLoading(false);
    }

    

    return (
        <>
            {/* <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={options}
                sx={{ 
                    width: 300,
                    position: 'fixed',
                    top: '20px',
                    left: '20px'
                  }}
                // When we change the kb_name, we'll automatically forget all the conversations now
                onChange={(e, value) => {
                    if (kb !== value) {
                        setMessages([]);
                        setCounter(0);
                    }
                    setkb(value);
                }}
                value={kb}
                renderInput={(params) => <TextField {...params} label="KB Names" />}
            /> */}
            <Box style={{
                marginTop: (!isSmallScreen) ? `100px` : `10vh`,
                marginLeft: `5vw`,
                marginRight: `5vw`,
            }}>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                >
                    <Alert
                        severity='error'
                        elevation={6}
                        variant='filled'
                    >You have reached the limit for searches made! Either Go Back or Start Over</Alert>
                </Snackbar>
                <Box
                    style={{
                        display: 'flex',
                        gap: '10px',
                        width: '100%',
                        justifyContent: 'center',
                        marginBottom: '50px'
                    }}
                >
                    <Button
                        startIcon={<BiArrowBack />}
                        variant='contained'
                        onClick={goBackHandler}
                        style={{
                            backgroundColor: '#000000',
                        }}
                    >Go Back</Button>
                    <Button
                        startIcon={<RiRestartLine />}
                        style={{
                            backgroundColor: 'black',
                        }}
                        variant='contained'
                        onClick={startOverHandler}
                    >Start Over</Button>
                </Box>
                <Typography fontSize={(isSmallScreen) ? 30 : 40} fontWeight={`bold`}>Ask me a question {kb ? `(on ${kb})` : ''}</Typography>

                {/* <Box
            style={{
                display: 'flex', 
                gap: '20px',
                maxWidth: '500px',
                margin: 'auto',
                marginTop: '20px',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                alignItems: 'center',
            }}
        >
            <Button variant='contained' color='secondary'>Uber Local</Button>
            <Button variant='contained' color='secondary'>Local</Button>
            <Button variant='contained' color='secondary'>India</Button>
            <Button variant='contained' color='secondary'>World</Button>
        </Box> */}

                <MessageList messages={messages} setMessages={setMessages} isLoading={isLoading} />

                <Box style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '20px',
                }}>
                    <Box
                        style={{
                            width: '100%'
                        }}
                    >
                        <Badge
                            badgeContent={counter}
                            variant='standard'
                            color='primary'
                            style={{
                                position: 'relative',
                                display: 'flex',
                                borderRadius: '5px',
                                gap: '10px',
                            }}
                        >

                            <TextField
                                label='Search Here'
                                color='primary'
                                variant='outlined'
                                fullWidth
                                inputProps={{
                                    style: {
                                        fontSize: '25px',
                                        paddingBottom: '10px',
                                        paddingTop: '10px',
                                    },
                                }}
                                value={questionInput}
                                onChange={(e) => setQuestionInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch(e);
                                    }
                                }}
                            />
                        </Badge>
                    </Box>
                    <IconButton
                        variant=""
                        size='large'
                        style={{
                            border: '1px solid #24adb1',
                            backgroundColor: '#000000',
                            color: 'white'
                        }}
                        onClick={handleSearch}
                        disabled={isLoading}
                    >
                        <IoSearch />
                    </IconButton>

                </Box>

            </Box>
        </>
    )
}

export default Hero;