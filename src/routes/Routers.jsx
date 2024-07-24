import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import Home from '../pages/HomePage'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Main from '../pages/Main'


import {  filterCategory, filterInputSearch, filterQuryParams, getCookieCity } from '../utils/func'
import { getPostPoblished } from '../services/getPostPublished'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from '../redux/dataSlice'



function Routers() {
    const dispatch=useDispatch()
    const allProducts=useSelector((data)=>data?.data?.products)
    const [modal,setModal]=useState(false)
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
            setQuery(query => filterQuryParams(query,{search: event.target.value}))  
        }
    }
  
    const focusHandler=()=>{
        setModal(true)
    }  
    const closBtnHandler=()=>{
        setModal(false)
    }

    useEffect(() => {    
        if (cookie) { 
            navigate("/main")
        } 
    }, [])
    
    useEffect(()=>{
        setDataFilter(allpost?.posts) 
        if(allpost?.posts){
            dispatch(increment(allpost?.posts)) 
        }
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
        <div>
            <Header search={search} changeHandler={changeHandler} focusHandler={focusHandler} modal={modal} setQuery={setQuery} setSearch={setSearch} closBtnHandler={closBtnHandler} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/main' element={<Main setCategoryId={setCategoryId} datafilter={datafilter} setDataFilter={setDataFilter} />} />
            </Routes>
            <Footer />
            <div className={modal && `size-full z-20 fixed top-0 left-0 bg-gray-50 opacity-50`} onClick={closBtnHandler}></div>
        </div>
    )
}

export default Routers