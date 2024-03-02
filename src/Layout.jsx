import { Box } from '@mui/material';
import React from 'react'
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <Box>
        <Outlet />
    </Box>
  )
}

export default Layout;