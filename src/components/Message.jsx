import React, { useState } from 'react'
import { Typography, Box, Button, TextField } from '@mui/material'
import axios from 'axios';
import styles from './Message.module.css';

const EditForm = ({ setIsEditing, value, conversationId, messageId, filename, setIsLoading, setMessages }) => {
    const [newQuery, setNewQuery] = useState(value);

    console.log(newQuery);
    console.log(filename, conversationId, messageId);
    const handleQuery = async () => {
        setIsLoading(true);
        const resp = await axios.post(`http://127.0.0.1:5000/query_knowledge_base?kb_name=${filename}&user_query=${newQuery}&conversation_id=${conversationId}&message_id=${messageId}`);
        setMessages((prev) => {
            const newMessages = [...prev];
            newMessages.forEach((message) => {
                if (message.id === messageId) {
                    message.user_message = newQuery;
                    message.assistant_message = resp.data.assistant_message.assistant_message || resp.data.error;
                }
            })
            return newMessages;
        })

        setIsLoading(false);
        setIsEditing(false);
    }
    return <Box style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '10px',
        padding: '10px',
        width: '100%',
        justifyContent: 'space-between',
    }}>
        <TextField style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            padding: '0',
            margin: '0',
            color: 'white'

        }} multiline value={newQuery} variant='standard' onChange={(e) => setNewQuery(e.target.value)} />
        <Button
            variant='outlined'
            onClick={handleQuery}
        >Submit</Button>
    </Box>
}

const Message = ({ filename, question, answer, conversationId, messageId, setMessages }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <Box sx={{
        }}>
            <Box
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // FIXME: Create a custom component for this
                    gap: '10px',
                    padding: '5px',
                    backgroundColor: '#FFFFFF',
                }}
                // FIXME: Add shadow to this 
                className={styles['shadow-basic']}
            >
                <Typography className={styles['message-container']} variant='h6' fontWeight='light' style={{
                    fontSize: '18px',
                }}>USER: {isEditing ? <EditForm setMessages={setMessages} filename={filename} value={question} setIsEditing={setIsEditing} conversationId={conversationId} messageId={messageId} setIsLoading={setIsLoading} /> : question}</Typography>
                {!isEditing && <Button
                    variant='contained'
                    className={styles['edit-button']}
                    style={{
                        backgroundColor: '#000000',
                        alignSelf: 'flex-end'
                    }}
                    onClick={() => setIsEditing(true)}
                >Edit</Button>}
            </Box>
            <Box
                style={{
                    padding: '5px',
                    backgroundColor: '#F5F5F5'
                }}
            >
                <Typography variant='h6' fontWeight='light' style={{
                    fontSize: '18px',
                }}>{isLoading ? "Loading...." : `ASSISTANT: ${answer}`}</Typography>
            </Box>
        </Box>
    )
}

export default Message;