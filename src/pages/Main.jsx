import { memo, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import PostBox from '../components/PostBox'
import { getAllCategory } from '../services/getAllCategory'
import SubCategoryCreate from '../components/SubCategoryCreate'
import FilterSideBar from '../components/FilterSideBar'


function Main({ datafilter, setCategoryId, setDataFilter }) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [filters, setFilters] = useState([])
  const [id, setId] = useState()
  const navigate = useNavigate()
  const { data: allcategory } = useQuery({ queryKey: ['getcategory'], queryFn: () => getAllCategory() })
  const clickHandler = () => {
    navigate('/main')
    window.location.reload()
  }

  const handleCheck = (e) => {
    if (e.target.id == 'toggle1') {
      setChecked1(!checked1);
    }
    if (e.target.id == 'toggle2') {
      setChecked2(!checked2);
    }
  };
 

  useEffect(()=>{
    console.log(filters);
    if(checked2){
      let resultFilter=datafilter?.filter(i=>i?.pics?.length)
      setDataFilter(resultFilter)
    }else{
      // setDataFilter(filters)
      console.log(filters);
    }
    if(checked1){

    }
  },[checked1,checked2])



  return (
    <div className='flex lg:px-40 px-5'>
      <div className='flex flex-col w-1/5 mt-20 px-5 gap-10'>
        <ul className='flex flex-col gap-10'>
          {
            !id ?
              allcategory?.data?.categories.map(item => {
                return <li key={item._id} onClick={() => { setId(item._id); setCategoryId({ categoryID: item._id }) }} className='flex flex-col gap-10 p-5 cursor-pointer'>{item.title}</li>
              })
              :
              (() => {
                let result = allcategory?.data?.categories.filter(item => item._id == id)
                if (result.length) {
                  return <>
                    <span onClick={clickHandler} className="cursor-pointer">همه</span>
                    <SubCategoryCreate clickHandler={clickHandler} result={result} setId={setId} setCategoryId={setCategoryId} />
                  </>
                } else {
                  let res2 = allcategory?.data?.categories.flatMap(i => i.subCategories).filter(i => i._id == id)
                  if (res2.length) {
                    return <>
                      <span onClick={clickHandler} className="cursor-pointer">همه</span>
                      <SubCategoryCreate clickHandler={clickHandler} result={res2} setId={setId} setCategoryId={setCategoryId} />
                    </>
                  } else {
                    let subSubCategory = allcategory?.data?.categories.flatMap(i => i.subCategories)
                    let allSubSubCategory = subSubCategory.flatMap(i => i.subCategories).filter(i => i._id == id)
                    let parentSubCategory = subSubCategory.find(i => i._id == allSubSubCategory[0].parent)
                    return <>
                      <span onClick={clickHandler} className="cursor-pointer">همه</span>
                      <span>{parentSubCategory.title}</span>
                      <SubCategoryCreate clickHandler={clickHandler} id={id} result={allSubSubCategory} setId={setId} setCategoryId={setCategoryId} />
                    </>
                  }
                }
              })()
          }
        </ul>
        <div>
          <FilterSideBar id={id} allcategory={allcategory} />
          <div className='flex flex-col gap-10'>
            <label htmlFor="toggle1" className="flex gap-28 items-center cursor-pointer">
              <input type="checkbox" id="toggle1" checked={checked1} onChange={handleCheck} className="hidden" />
              <span className="ml-3 text-gray-700 font-medium">معاوضه</span>
              <div className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 ${checked1 ? 'bg-green-500' : 'bg-gray-400'}`}>
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition duration-300 ${!checked1 ? 'translate-x-0' : '-translate-x-6'}`} />
              </div>
            </label>

            <label htmlFor="toggle2" className="flex gap-12 items-center cursor-pointer">
              <input type="checkbox" id="toggle2" checked={checked2} onChange={handleCheck} className="hidden" />
              <span className="ml-3 text-gray-700 font-medium">فقط عکس دار</span>
              <div className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 ${checked2 ? 'bg-green-500' : 'bg-gray-400'}`}>
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition duration-300 ${!checked2 ? 'translate-x-0' : '-translate-x-6'}`} />
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className='w-4/5'>
        <PostBox post={datafilter} />
      </div>
    </div>
  )
}

export default memo(Main)
