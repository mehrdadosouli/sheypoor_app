import React, { useEffect, useState } from 'react'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import Home from '../pages/HomePage'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Main from '../pages/Main'


import {  filterInputSearch, filterQuryParams } from '../utils/func'



function Routers() {
    const [searchParam,setSearchParam]=useSearchParams()

    const [query, setQuery] = useState({})
    const [search,setSearch]=useState('')
    const [datafilter,setDataFilter]=useState()

    const changeHandler = (event) => {
        if(event.target.name == 'search'){
            setSearch(event.target.value)
            setQuery(query=>filterQuryParams(query,{search: event.target.value}))  
        }
    }
    
    useEffect(()=>{
        let result=filterInputSearch(datafilter,query.search)
        setDataFilter(result)
        setSearchParam(query)
        },[query])

        useEffect(()=>{
            setDataFilter(datafilter)
        },[datafilter])
        
    return (
        <>
            <Header search={search} changeHandler={changeHandler} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/main' element={<Main datafilter={datafilter} setDataFilter={setDataFilter} changeHandler={changeHandler} setQuery={setQuery} />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Routers