import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import Home from '../pages/HomePage'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Main from '../pages/Main'
import { useQuery } from '@tanstack/react-query'

import {  filterInputSearch, filterQuryParams, getCookieCity } from '../utils/func'
import { getPostPoblished } from '../services/getPostPublished'


function Routers() {
    const [searchParam,setSearchParam]=useSearchParams()
    const [categoryId,setCategoryId]=useState()
    const [query, setQuery] = useState({})
    const [search,setSearch]=useState('')
    const [datafilter,setDataFilter]=useState()
    const { data: allpost } = useQuery({ queryKey: ['postpoblish'], queryFn: () => getPostPoblished() })

    const navigate = useNavigate() 
    let cookie = getCookieCity() 
    const changeHandler = (event) => {
        if(event.target.name == 'search'){
            setSearch(event.target.value)
            setQuery(query=>filterQuryParams(query,{search: event.target.value}))  
        }
    }
    useEffect(() => {  
         if(categoryId){
            getPostPoblished({ categoryId: categoryId?.categoryID }).then(res=>setDataFilter(res?.posts))
            setQuery((query) => filterQuryParams(query, { categoryId: categoryId?.categoryID })); 
         }
    }, [categoryId]);

    useEffect(()=>{
        const funcGetting=async()=>{
            let result=await filterInputSearch(allpost,query.search)
            setDataFilter(result)
        }
            funcGetting()
            setSearchParam(query)
            
        },[query])
        
    useEffect(() => {  
        setDataFilter(allpost?.posts)
        if (cookie) { 
            navigate(`/main`)
        }
    }, [allpost])

    return (
        <>
            <Header search={search} changeHandler={changeHandler} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/main' element={<Main datafilter={datafilter} changeHandler={changeHandler} setCategoryId={setCategoryId}/>} />
            </Routes>
            <Footer />
        </>
    )
}

export default Routers