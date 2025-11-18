import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import logo from '../../assets/Images/mainLogo.png'

export default function Logo() {
  return (
    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center' , width:'100%'}}>
        <img src={logo} alt="dashboard-logo" style={{width:'250px',height:'90px'}} />
    </Box>
  )
}
