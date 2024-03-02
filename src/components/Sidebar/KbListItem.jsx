import { useState } from 'react'
import { Box, Typography } from '@mui/material';
import styles from './KbListItem.module.css';
import { AiOutlineDelete } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi';
import DeleteConfirmation from './DeleteConfirmation';
import UpdateDialog from './UpdateDialog';
import { useRecoilState }  from 'recoil'
import kbSelect from '../../store/kbSelect';
const KbListItem = ({ kb }) => {
    const [deleteOpen, setDeleteOpen] = useState(false); // for the dialog box
    const [openUpdate, setOpenUpdate] = useState(false); // for the update dialog box
    const [selectedKb, setSelectedKb] = useRecoilState(kbSelect); // for the active knowledge base
    const openDeleteDialog = () => {
        setDeleteOpen(true);
    }
    const openUpdateDialog = () => {
        setOpenUpdate(true);
    }

    const setActiveKbHandler = () => {
        setSelectedKb(kb.name);
    }
    return (
        <Box sx={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            padding: '8px',
            borderRadius: '4px',
            borderLeft: '6px solid #000000',
            display: 'flex',
            gap: '2px',
            justifyContent: 'space-between',
            minHeight: '50px',
            alignItems: 'center',
            cursor: 'pointer'
        }}
            className={`${styles['list-item']} ${selectedKb === kb.name ? styles['active-kb'] : ''}`}
            onClick={setActiveKbHandler}
        >
            <Typography>{kb.name}</Typography>
            <Box 
                sx={{
                    display: 'flex',
                    gap: '5px',
                }}
            >
                <button className={styles['custom-btn']} onClick={openDeleteDialog}><AiOutlineDelete /></button>
                <button className={styles['custom-btn']} onClick={openUpdateDialog}><BiPencil /></button>
            </Box>
            <DeleteConfirmation open={deleteOpen} setOpen={setDeleteOpen} kbName={kb.name} />
            <UpdateDialog open={openUpdate} onOpen={setOpenUpdate} kbName={kb.name} />
        </Box>
    )
}

export default KbListItem;