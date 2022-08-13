import React from 'react';
import './Contact.css';
import ContactImage from '../../assets/images/form-image.jpg';


function Contact() {
  return (
    <div>
    <div className="contact">
     <div
     className="leftSide"
     style={{ backgroundImage: `url(${ContactImage})` }}
   ></div>
    <div className="rightSide">
      <h1> Contact Us</h1>

      <form id="contact-form" method="POST">
        <label htmlFor="name">Full Name</label>
        <input name="name" placeholder="Enter full name..." type="text" />
        <label htmlFor="email">Email</label>
        <input name="email" placeholder="Enter email..." type="email" />
        <label htmlFor="message">Message</label>
        <textarea
          rows="6"
          placeholder="Enter message..."
          name="message"
          required
        ></textarea>
        <button variant="contained" type="submit"> Send Message</button>
      </form>
    </div>
  </div>
  </div>
);
}

export default Contact;
