import { Box, IconButton, SwipeableDrawer, Button, Typography, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci'
import { IoIosArrowForward, IoIosArrowDown } from 'react-icons/io'
import { RxCrossCircled } from 'react-icons/rx';
import { IoMdArrowBack } from 'react-icons/io';
import { BiSolidTimer } from 'react-icons/bi'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import KbList from './Sidebar/KbList';
import DropDown from './Sidebar/DropDown';
import { useNavigate } from 'react-router-dom';
import RealtimeDialog from './Sidebar/RealtimeDialog';

const SidebarNow = ({ toggle, isOpen }) => {
    const nav = useNavigate();
    const [mode, setMode] = useState('');
    const [isShowing, setShowing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const kbRefTrain = useRef();
    const dataRefTrain = useRef();
    const urlRefTrain = useRef();
    const [dataType, setDataType] = useState('text');
    const [isRealtimeOpen, setRealtimeOpen] = useState(false);

    const openRealtime = () => {
        setRealtimeOpen(true);
    }

    const handleLogout = async () => {
        const session_token = localStorage.getItem('session_token');
        const user_id = localStorage.getItem('user_id');
        localStorage.removeItem('session_token');
        localStorage.removeItem('user_id');
        try {
            await axios.post('http://127.0.0.1:5000/logout', {
                session_token,
                user_id
            });
        } catch (error) {
            console.log(error);
        }
        toast.success('Logout Successful');
        nav('/signin');
    }

    const handleDataTraining = async () => {
        // const url = urlRefTrain.current.value;
        // console.log(kb, data);
        // if (dataType === 'file') {
        //     const formData = new FormData();
        //     formData.append('file', selectedFile);
        //     formData.append('data_type', dataType);
        //     const resp = await axios.post('http://127.0.0.1:5000/get_data', formData);
        //     console.log(resp);
        // }

        // else if (dataType === 'url') {
        //     const url = urlRefTrain.current.value;
        //     const formData = new FormData();
        //     formData.append('url', url);
        //     formData.append('data_type', dataType);
        //     const resp = await axios.post('http://127.0.0.1:5000/get_data', formData);
        //     console.log(resp);
        // }

        // else if (dataType === 'text') {
        //     const data = dataRefTrain.current.value;
        //     const formData = new FormData();
        //     formData.append('', data);
        //     formData.append('data_type', dataType)
        // }
        const user_id = localStorage.getItem('user_id');
        if (dataType === 'text') {
            const kb = kbRefTrain.current.value;
            const data = dataRefTrain.current.value;
            try {
                const resp = await axios.post(`http://127.0.0.1:5000/train_knowledge_base?data_type=${dataType}&text=${data}&kb_name=${kb}&user_id=${user_id}`);
                if (resp.data.error) {
                    toast.error(resp.data.error);
                } else {
                    toast.success(`Successfully trained ${kb}`);
                }
            } catch (error) {
                toast.error(error.message);
            }

            console.log(kb, data);
        } else if (dataType === 'file') {
            const kb = kbRefTrain.current.value;
            const formData = new FormData();
            formData.append('file', selectedFile);
            try {
                const resp = await axios.post(`http://127.0.0.1:5000/train_knowledge_base?kb_name=${kb}&user_id=${user_id}`, formData);
                if (resp.data.error) {
                    toast.error(resp.data.error);
                } else {
                    toast.success(`Successfully trained ${kb}`);
                }
            } catch (error) {
                toast.error(error.message);
            }
        } else if (dataType === 'url') {
            const kb = kbRefTrain.current.value;
            const url = urlRefTrain.current.value;

            try {
                const resp = await axios.post(`http://127.0.0.1:5000/train_knowledge_base?kb_name=${kb}&url=${url}&user_id=${user_id}&data_type=${dataType}`);
                if (resp.data.error) {
                    toast.error(resp.data.error);
                } else {
                    toast.success(`Successfully trained ${kb}`);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    }

    const fileChangeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <>
            <SwipeableDrawer style={{
                position: 'relative',
                overflowX: 'hidden',
            }} onClose={toggle} open={isOpen} onOpen={toggle}>
                <Box style={{
                    width: '35vw',
                    height: '100vh',
                    overflowY: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <IconButton style={{
                        position: 'absolute',
                        color: 'red',
                        top: '10px',
                        right: '10px'
                    }}
                        onClick={toggle}
                        size='medium'
                    >
                        <RxCrossCircled />
                    </IconButton>


                    {mode !== '' && <IconButton
                        onClick={() => setMode('')}
                        style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px'
                        }}
                    >
                        <IoMdArrowBack />
                    </IconButton>}
                    {mode === '' && <Box
                        style={{
                            display: 'flex',
                            width: '80%',
                            flexDirection: 'column',
                            marginTop: '50px',
                            gap: '20px',
                        }}
                    >
                        {/* <Typography
                        fontSize={40}
                        fontWeight={`bolder`}
                        style={{
                            display: 'block',
                            marginTop: '50px',
                        }}
                    >
                        Knowledge Base
                    </Typography>
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                    }}>
                        Existing Knowledge Bases
                    </Typography> */}
                        <Button
                            variant='contained'
                            size='large'
                            style={{
                                backgroundColor: '#000000',
                                padding: '12px',
                                fontSize: '20px',
                            }}
                            endIcon={<AiOutlinePlus />}
                            onClick={() => { setMode('train') }}
                        >
                            Create Knowledge Base
                        </Button>
                        <Box style={{
                            width: '100%',
                        }}>
                            <Button
                                variant='contained'
                                size='large'
                                style={{
                                    backgroundColor: '#000000',
                                    padding: '12px',
                                    fontSize: '20px',
                                }}
                                fullWidth
                                endIcon={(isShowing) ? <IoIosArrowDown /> : <IoIosArrowForward />}
                                onClick={() => {
                                    setShowing((prev) => {
                                        return !prev;
                                    })
                                }}
                            >
                                Existing Knowledge Base
                            </Button>
                        </Box>
                        {isShowing ? <KbList setShowing={setShowing} /> : <></>}
                        <Button
                            variant='contained'
                            size='large'
                            style={{
                                backgroundColor: '#000000',
                                padding: '12px',
                                fontSize: '20px',
                            }}
                            endIcon={<BiSolidTimer />}
                            onClick={openRealtime}
                        >
                            Realtime Search
                        </Button>
                        <Button
                            variant='contained'
                            size='large'
                            style={{
                                backgroundColor: '#000000',
                                padding: '12px',
                                fontSize: '20px',
                            }}
                        >
                            Internet Search
                        </Button>

                        {/* <Button
                        variant='contained'
                        size='large'
                        style={{
                            backgroundColor: '#000000',
                            padding: '12px',
                            fontSize: '20px',
                        }}
                        startIcon={<RxUpdate />}
                        onClick={updateHandler}
                    >
                        Update A Knowledge Base
                    </Button> */}
                    </Box>}
                    {mode === 'train' && <Box
                        style={{
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '50px',
                            gap: '20px',
                        }}
                    >
                        <Typography style={{
                            fontSize: '35px',
                            fontWeight: 'bold',
                            marginBottom: '40px',
                        }}>Create a Knowledge Base</Typography>
                        <TextField label='Knowledge Base Name' inputRef={kbRefTrain} />
                        <DropDown change={setDataType} />
                        {dataType === 'text' && <TextField label='Training Data'
                            multiline
                            maxRows={18}
                            minRows={10}
                            inputRef={dataRefTrain}
                        />}
                        {dataType === 'file' && <TextField type='file' onChange={fileChangeHandler} />}
                        {dataType === 'url' && <TextField label='URL' placeholder='https://www.google.com'
                            inputRef={urlRefTrain}
                        />}
                        <Button onClick={handleDataTraining} variant='contained' size='large' style={{
                            backgroundColor: '#000000',
                            fontSize: '18px',
                        }}>Train Data</Button>
                    </Box>}
                </Box>
                <IconButton sx={{
                    position: 'absolute',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: 'crimson',
                    color: 'white',
                    fontSize: '20px'
                }}
                    variant='contained'
                    size='large'
                    onClick={handleLogout}
                >
                    <CiLogout />
                </IconButton>
                <RealtimeDialog open={isRealtimeOpen} handleClose={() => setRealtimeOpen(false)} />
            </SwipeableDrawer>
        </>
    )
}

export default SidebarNow;