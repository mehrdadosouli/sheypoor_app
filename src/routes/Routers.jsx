import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
Home
function Routers() {
    return (
        <>
        <Header />
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        <Footer />
        </>
    )
}

export default Routers