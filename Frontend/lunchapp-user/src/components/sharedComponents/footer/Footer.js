import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
   <div className="socialMedia">
        <TwitterIcon /> <LinkedInIcon />
      </div>
      <p> &copy; 2021 LunchAll Food Services LTD</p>
    </div>
  );
}

export default Footer;
