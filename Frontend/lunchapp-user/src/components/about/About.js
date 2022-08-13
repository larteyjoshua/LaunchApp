import React from 'react';
import Food from '../../assets/images/food.jpeg'
import './About.css';

function About() {
  return (
    <div className="about">
    <div className="aboutTop"
        style={{ backgroundImage: `url(${Food})` }}
      ></div>
    <div className="aboutBottom">
      <h1 className='aboutHeader'> ABOUT US</h1>
      <h3 className='aboutUs'>
       LunchApp as the name goes is a system that allow you to book your prefer tomorrow lunch today and got it delivery
       to you at work on behave of your company. This App include admins Management App for managing services of the app.
       The Admin have roles for Accountant, Order Manager, Admin, Super Admin, Cook and jobs that generates monthly bill for companies
       with Automatic invoice emailing services. The service is built with Python FastApi, the Admin app in Angular and the User 
       App in React. This project is a learning process for a full stack developer to enriched my CV. Contact me for your python, react and 
       Angular Software Engineer. 
      </h3>
    </div>
  </div>
);
}

export default About;
