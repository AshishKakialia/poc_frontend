import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react'

const History = () => {
  // useEffect(() => {
    
  // }, [])
  const [options, setOptions] = useState([
    'test'
  ]);
  const [loading, setLoading] = useState(false);
  const [historyOptions, setHistoryOptions] = useState([]);
  const [conversationId, setConversationId] = useState('');
  const [kbName, setKbName] = useState('');

  return (
    <Box sx={{
      display: 'flex',
      margin: '40px 100px',
      border: '1px solid #000',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px',
    }}>
      <Typography sx={{
        fontSize: '30px',
        fontWeight: 'bold',
      }}>HISTORY</Typography>
      <Box sx={{
        display: 'flex',
        gap: '10px',
        height: '120px',
        flexDirection: 'column',
      }}>
        <Autocomplete
          disablePortal
          options={options}
          value={kbName}
          renderInput={(params) => <TextField {...params}  value={kbName} label="KB_Name" sx={{
            width: '250px',
          }}/>}
          onChange={(event, value) => setKbName(value)}
        />
        {kbName && <Autocomplete
          disablePortal
          options={historyOptions}
          value={conversationId}
          renderInput={(params) => <TextField {...params} value={conversationId} label="Conv_Id" sx={{
            width: '250px',
          }} />}
        />}
      </Box>
    </Box>
  )
}

export default History;