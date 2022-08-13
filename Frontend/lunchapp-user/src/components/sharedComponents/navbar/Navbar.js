import React from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import Logo from '../../../assets/images/lunch-icon.png'
import  { useState } from "react";
import ReorderIcon from '@mui/icons-material/Reorder';




function Navbar() {

  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className='navbar'>
      <div className="leftSide" id={openLinks ? "open" : "close"} >
      <img src={Logo} 
      alt="Logo"/> 
      <h1 className='title'>LunchApp</h1>
      <div className="hiddenLinks">
          <Link to="/home"> Home </Link>
          <Link to="/login"> Login </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>
          </div>
      </div>
      <div className='rightSide'>
          <Link to="/home"> Home </Link>
          <Link to="/login"> Login </Link>
          <Link to="/about"> About </Link>
          <Link to="/contact"> Contact </Link>
          <button onClick={toggleNavbar}>
          <ReorderIcon />
          </button>
      </div>
      
    </div>
  );
}

export default Navbar;
