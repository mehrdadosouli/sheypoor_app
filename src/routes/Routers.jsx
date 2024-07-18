import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import Home from '../pages/HomePage'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Main from '../pages/Main'


import {  filterCategory, filterInputSearch, filterQuryParams, getCookieCity } from '../utils/func'
import { getPostPoblished } from '../services/getPostPublished'
import { useQuery } from '@tanstack/react-query'



function Routers() {
    const [searchParam,setSearchParam]=useSearchParams()
    const { data: allpost } = useQuery({ queryKey: ['postpoblish'], queryFn: () => getPostPoblished() })
    let cookie = getCookieCity() 
    const [query, setQuery] = useState({})
    const [search,setSearch]=useState('')
    const [datafilter,setDataFilter]=useState()
    const navigate = useNavigate()
    const [categoryId,setCategoryId]=useState()
    const changeHandler = (event) => {
        if(event.target.name == 'search'){
            setSearch(event.target.value)
            setQuery(query=>filterQuryParams(query,{search: event.target.value}))  
        }
    }

    useEffect(() => {    
        if (cookie) { 
            navigate("/main")
        }
    }, [])
    
    useEffect(()=>{
        setDataFilter(allpost?.posts)
    },[allpost])

    useEffect(()=>{
       const filteringFunc=async()=>{
         let result=await filterCategory(allpost,categoryId)
        result=filterInputSearch(result,query.search)
        setDataFilter(result)
       }
       filteringFunc()
       
        setSearchParam(query)
    },[query,categoryId,search])
    
    useEffect(()=>{
        if(categoryId){
            setQuery((query) => filterQuryParams(query, { categoryId: categoryId?.categoryID })); 
           }
        },[categoryId])

    return (
        <>
            <Header search={search} changeHandler={changeHandler} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/main' element={<Main setCategoryId={setCategoryId}  datafilter={datafilter} />} />
            </Routes>
            <Footer />
        </>
    )
}

export default Routers