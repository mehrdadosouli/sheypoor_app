import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom'
import Home from '../pages/HomePage'
import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import Main from '../pages/Main'


import { filterInputSearch, filterQuryParams as filterQuayParams, getCookieCity } from '../utils/func'
import { getPostPoblished } from '../services/getPostPublished'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { addToProducts, increment } from '../redux/dataSlice'



function Routers() {
    const allProducts = useSelector((data) => data?.data?.products)
    const allFilterProducts = useSelector((data) => data?.data?.filtersProducts)
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [searchParam, setSearchParam] = useSearchParams()
    const { data: allposts } = useQuery({ queryKey: ['postpoblish'], queryFn:()=> getPostPoblished() })
    let cookie = getCookieCity()
    const [query, setQuery] = useState({})
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const [categoryId, setCategoryId] = useState()
    const changeHandler = (event) => {
        if (event.target.name == 'search') {
            setSearch(event.target.value)
            setQuery(query => filterQuayParams(query, { search: event.target.value }))
        }
    }

    const focusHandler = () => {
        setModal(true)
    }
    const closBtnHandler = () => {
        setModal(false)
    }
    const filterCategory = (product, category) => {
        if (category) {
          return getPostPoblished({ categoryId: category?.categoryID }).then(
            (res) => {dispatch(addToProducts(res?.posts));dispatch(increment(res?.posts)); return res?.posts}
          );
        } else {
          return product;
        }
      };
    
    useEffect(() => {
        if (cookie) {
            navigate("/main")
        }
    }, [])

    useEffect(() => {
        dispatch(addToProducts(allposts?.posts))
        // dispatch(increment(allposts?.posts))
    }, [allposts])


    useEffect(() => { 
        if (checked2) {
          let resultFilter = allProducts?.filter(i => i.pics.length)
          dispatch(increment(resultFilter))
        } else {
          dispatch(increment(allProducts))
        }
        if (checked1) {

        }
      }, [checked1, checked2])

    useEffect(() => {
        const filteringFunc = async () => { 
            let result = await filterCategory(allProducts, categoryId)
            
            result =await filterInputSearch(result, query.search)
            dispatch(increment(result))
        }  
        filteringFunc()

        setSearchParam(query)
    }, [query, categoryId, search])

    useEffect(() => {
        if (categoryId) {
            setQuery((query) => filterQuayParams(query, { categoryId: categoryId?.categoryID }));
        }
    }, [categoryId])

    return (
        <div>
            <Header search={search} changeHandler={changeHandler} focusHandler={focusHandler} modal={modal} setQuery={setQuery} setSearch={setSearch} closBtnHandler={closBtnHandler} />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/main' element={<Main setCategoryId={setCategoryId} checked1={checked1} checked2={checked2} setChecked1={setChecked1} setChecked2={setChecked2} />} />
            </Routes>
            <Footer />
            <div className={modal && `size-full z-20 fixed top-0 left-0 bg-gray-50 opacity-50`} onClick={closBtnHandler}></div>
        </div>
    )
}

export default Routers