import React from 'react';
import { Outlet } from "react-router-dom"
import Footer from '../sharedComponents/footer/Footer';
import Navbar from '../sharedComponents/navbar/Navbar';

const Layout = () => {
    return (
        <main className="App">
        <Navbar />
            
            <Outlet />

        <Footer />
        </main>
    )
}

export default Layout