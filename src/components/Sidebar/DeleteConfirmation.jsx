import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
const DeleteConfirmation = ({open, setOpen, kbName}) => {

    const deleteKbHandler = async () => {
        try {
            const resp = await axios.post(`http://localhost:5000/delete_knowledge_base?kb_name=${kbName}`, {});
            if (resp.data.error) {
                toast.error(resp.data.error);
            } else {
                toast.success(resp.data.message);
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.message);
            setOpen(false);
        }
    }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Knowledge Base</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to delete the knowledge base {kbName}?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={deleteKbHandler}>Delete</Button>
        </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmation;