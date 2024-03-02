import React from 'react'
import { Card, Skeleton, Typography, Box } from '@mui/material';
import Message from './Message';
const MessageList = ({ messages, isLoading, setMessages }) => {
    if (isLoading) {
        return <Card variant='outlined' sx={{
            marginTop: '20px',
            height: '400px',
            backgroundColor: '#ffffff',
            marginBottom: '20px'
        }}>
            <Box sx={{
            }}>
                <Box sx={{
                    height: '50px',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: '#ffffff'
                }}><Skeleton width={'50%'} animation='wave' height={`100%`} /></Box>
                <Box sx={{
                    height: '50px',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: '#f5f5f5'
                }}><Skeleton animation='wave' width={'40%'} height={`100%`}/></Box>
            </Box>
            
            <Box sx={{
            }}>
                <Box sx={{
                    height: '50px',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: '#ffffff'
                }}><Skeleton width={'30%'} animation='wave' height={`100%`} /></Box>
                <Box sx={{
                    height: '50px',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: '#f5f5f5'
                }}><Skeleton animation='wave' width={'80%'} height={`100%`}/></Box>
            </Box>
            
            <Box sx={{
            }}>
                <Box sx={{
                    height: '50px',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: '#ffffff'
                }}><Skeleton width={'70%'} animation='wave' height={`100%`} /></Box>
                <Box sx={{
                    height: '50px',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: '#f5f5f5'
                }}><Skeleton animation='wave' width={'100%'} height={`100%`}/></Box>
            </Box>
            
            <Box sx={{
            }}>
                <Box sx={{
                    height: '50px',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: '#ffffff'
                }}><Skeleton width={'30%'} animation='wave' height={`100%`} /></Box>
                <Box sx={{
                    height: '50px',
                    width: '100%',
                    padding: '5px',
                    backgroundColor: '#f5f5f5'
                }}><Skeleton animation='wave' width={'60%'} height={`100%`}/></Box>
            </Box>
            
        </Card>
    }

    if (messages.length === 0) {
        return <Card variant='outlined' sx={{
            marginTop: '20px',
            height: '400px',
            backgroundColor: '#ffffff',
            marginBottom: '20px'
        }}>
            <Typography fontSize={20} margin={5}>
                No Records Found
            </Typography>
        </Card>
    }
    return (
        <Card
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '20px',
                height: '400px',
                overflow: 'scroll',
                marginBottom: '20px',
                padding: '2px',
            }}
            variant='outlined'
        >
            {messages.map((message, index) => {
                return <Message key={index} setMessages={setMessages} filename={message.kb_name} question={message.user_message} answer={message.assistant_message} messageId={message.id} conversationId={message.conversation_id} />
            })}
        </Card>
    )
}

export default MessageList;