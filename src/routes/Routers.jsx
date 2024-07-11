import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from '../pages/HomePage'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Main from '../pages/Main'
import { getCookieCity } from '../utils/func'
import { useQuery } from '@tanstack/react-query'

function Routers() {
    const { data: allpost } = useQuery({ queryKey: ['postpoblish'] })

    const [filterData, setFilterData] = useState({
        search: '',
        category: ''
    })
    const [datafilter,setDataFilter]=useState()

    const navigate = useNavigate() 
    let cookie = getCookieCity() 

    const changeHandler = (e) => {
        setFilterData(prev => ({ ...prev, search: e.target.value }))
        const resultFilterSearch=datafilter?.filter(item=>item.title.includes(e.target.value))
    }

    useEffect(() => {  
        setDataFilter(allpost?.posts)  
        if (cookie) { 
            navigate(`/main`)
        }
    }, [datafilter,filterData])
    return (
        <>
            <Header setFilterData={setFilterData} search={filterData.search} changeHandler={changeHandler} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/main' element={<Main />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Routers