import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import openai from '../../assets/openai.png'

const Logo = () => {
  return (
    <div style={{ display: "flex", marginRight: "auto", alignItems: "center", gap: "15px" }}>
      <Link to={"/"}>
        <img src={openai} alt='openai' width={'30px'} height={'30px'} className='image-inverted' />
      </Link>
      <Typography sx={{ display: { md: 'block', sm: 'none', xs: 'node' }, mr: "auto", fontWeight: "600", textShadow: "2px 2px 20px #000" }}>
        <span style={{ fontSize: "20px" }}>MERN</span>-GPT
      </Typography>
    </div>
  )
}

export default Logo
