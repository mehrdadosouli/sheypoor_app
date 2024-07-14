import { useQuery } from '@tanstack/react-query'
import { getPostPoblished } from '../services/getPostPublished'
import PostBox from '../components/PostBox'
import { getAllCategory } from '../services/getAllCategory'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SubCategoryCreate from '../components/SubCategoryCreate'
import FilterSideBar from '../components/FilterSideBar'

function Main() {
  const [searchParam, setSearchParam] = useSearchParams()
  const [filter,setFilter]=useState(null)
  const [id, setId] = useState()
  const navigate = useNavigate()
  const { data: postPoblished } = useQuery({ queryKey: ['postpoblish'], queryFn: () => getPostPoblished() })
  const { data: allcategory } = useQuery({ queryKey: ['getcategory'], queryFn: () => getAllCategory() })
  const clickHandler = () => {
    navigate('/main')
    window.location.reload()

  }


  return (
    <div className='flex px-40'>
      <div className='flex flex-col w-1/5 mt-20 pr-10 gap-10'>
        <ul className='flex flex-col gap-10'>
          {
            !id ?
              allcategory?.data?.categories.map(item => {
                return <li key={item._id} onClick={() => { setId(item._id); setSearchParam({ categoryID: item._id }) }} className='flex flex-col gap-10 p-5 cursor-pointer'>{item.title}</li>
              })
              :
              (() => {
                let result = allcategory?.data?.categories.filter(item => item._id == id)
                if (result.length) {
                  return <>
                    <span onClick={clickHandler} className="cursor-pointer">همه</span>
                    <SubCategoryCreate clickHandler={clickHandler} result={result} setId={setId} setSearchParam={setSearchParam} />
                  </>
                } else {
                  let res2 = allcategory?.data?.categories.flatMap(i => i.subCategories).filter(i => i._id == id)
                  if (res2.length) {
                    return <>
                      <span onClick={clickHandler} className="cursor-pointer">همه</span>
                      <SubCategoryCreate clickHandler={clickHandler} result={res2} setId={setId} setSearchParam={setSearchParam} />
                    </>
                  } else {
                    let subSubCategory = allcategory?.data?.categories.flatMap(i => i.subCategories)
                    let allSubSubCategory = subSubCategory.flatMap(i => i.subCategories).filter(i => i._id == id)
                    let parentSubCategory = subSubCategory.find(i => i._id == allSubSubCategory[0].parent)
                    return <>
                      <span onClick={clickHandler} className="cursor-pointer">همه</span>
                      <span>{parentSubCategory.title}</span>
                      <SubCategoryCreate clickHandler={clickHandler} id={id} result={allSubSubCategory} setId={setId} setSearchParam={setSearchParam} />
                    </>
                  }
                }
              })()
          }
        </ul>
        <div>
          <FilterSideBar id={id} allcategory={allcategory} />
        </div>
      </div>
      <div className='w-4/5'>
        <PostBox post={postPoblished} />
      </div>
    </div>
  )
}

export default Main
