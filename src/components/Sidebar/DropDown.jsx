import React from 'react'
import { Menu, MenuItem, Button } from '@mui/material'

const DropDown = ({ change }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
  return (
    <>
          <Button variant='contained' size='large' style={{
              backgroundColor: '#000000',
              fontSize: '18px',
          }}
            onClick={handleClick}
        >Input Type</Button>
        <Menu
            sx={{
                
            }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
        >
            <MenuItem onClick={() => {
                change('text');
                setAnchorEl(null);
            }}>Text</MenuItem>
            <MenuItem onClick={() => {
                  change('file');
                  setAnchorEl(null);
            }}>File</MenuItem>
            <MenuItem onClick={() => {
                  change('url');
                  setAnchorEl(null);
            }}>URL</MenuItem>
        </Menu>
    </>
  )
}

export default DropDown;