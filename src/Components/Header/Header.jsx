import React, { useEffect, useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [logout,setLogout]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    if(logout)
    {
        navigate('/')
    }
  },[logout,navigate])
  return (
    <div className='hm'>
    <div className='headertitles'>Header</div>
    <div className="topbar-right">
        <img className='topimage' src='https://i.scdn.co/image/ab67616d00001e02eb5b2a2c4a80ad34c0feddd7' alt='' />
    </div>
    <div className='logot' onClick={()=>{setLogout(true)}}>Logout</div>
  </div>
  )
}

export default Header