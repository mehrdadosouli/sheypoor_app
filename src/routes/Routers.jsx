import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../pages/HomePage'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Main from '../pages/Main'
import { getCookieCity } from '../utils/func'

function Routers() {
    const navigate = useNavigate()
    let cookie=getCookieCity()
    useEffect(()=>{
        if(cookie){
            navigate(`/main`)
        }
    },[])
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/main' element={<Main />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Routers