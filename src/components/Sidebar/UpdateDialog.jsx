import { Dialog, DialogContent, IconButton, Typography, TextField, Box, Switch, Button } from '@mui/material';
import React, { useRef, useState } from 'react'
import { ImCross } from 'react-icons/im'
import DropDown from './DropDown';

const UpdateDialog = ({ open, onOpen, kbName }) => {
  const dataRef = useRef();
  const [isChecked, setChecked] = useState();
  const [updateOption, setUpdateOption] = useState('text');
  console.log(updateOption);
  const handleDataUpdate = async () => {
    const data = dataRef.current.value;
    if (isChecked) { // overide existing data => update 
      try {
        const resp = await axios.post(`http://localhost:5000/update_knowledge_base?data=${data}&kb_name=${kbName}`);
        if (resp.data.error) {
          toast.error(resp.data.error);
        }
        else {
          toast.success(`Successfully updated ${kbName}`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else { // don't overide existing data => insert
      try {
        const resp = await axios.post(`http://localhost:5000/insert_knowledge_base?data=${data}&kb_name=${kbName}`);
        if (resp.data.error) {
          toast.error(resp.data.error);
        } else {
          toast.success(`Successfully inserted new data into ${kbName}`);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
  return (
    <Dialog sx={{
      position: 'relative'
    }} open={open} onOpen={onOpen} fullScreen>
      <IconButton size='large' sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
      }}
        onClick={() => onOpen(false)}
      >
        <ImCross />
      </IconButton>
      <DialogContent>
        <Box
          style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '50px',
            gap: '20px',
            height: '100vh',
            width: '60vw',
            margin: '50px auto'
          }}
        >
          <Typography style={{
            fontSize: '35px',
            fontWeight: 'bold',
            marginBottom: '40px',
          }}>Update a Knowledge Base</Typography>
          <DropDown change={setUpdateOption} />
          <Typography sx={{
            fontSize: '25px',
          }}>{kbName}</Typography>
          {updateOption === 'text' && <TextField label='Training Data'
            multiline
            maxRows={14}
            minRows={10}
            inputRef={dataRef}
          />}
          {updateOption === 'url' && <TextField label='URL' placeholder='https://www.google.com' />}
          {updateOption === 'file' && <TextField type='file'/>}
          <Box>
            <label htmlFor="switch">Overide Existing Data?</label>
            <Switch id='switch' onChange={(e) => setChecked(e.target.checked)} checked={isChecked} />
          </Box>
          <Button onClick={handleDataUpdate} variant='contained' size='large' style={{
            backgroundColor: '#000000',
            fontSize: '18px',
          }}>Update Data</Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateDialog;