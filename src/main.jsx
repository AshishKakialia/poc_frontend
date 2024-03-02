import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './Theme.jsx';
import { Toaster } from 'react-hot-toast';
import { RecoilRoot } from 'recoil';
ReactDOM.createRoot(document.getElementById('root')).render(
        <BrowserRouter>
                <RecoilRoot>
                        <ThemeProvider theme={theme}>
                                <CssBaseline />
                                <Toaster />
                                <App />
                        </ThemeProvider>
                </RecoilRoot>
        </BrowserRouter>
)