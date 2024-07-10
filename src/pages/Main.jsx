import { useQuery } from '@tanstack/react-query'
import { getPostPoblished } from '../services/getPostPublished'
import PostBox from '../components/PostBox'
import { getAllCategory } from '../services/getAllCategory'
import { Link, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Main() {
  const [searchParam,setSearchParam]=useSearchParams()
  const [id,setId]=useState()
  const { data: postPoblished } = useQuery({ queryKey: ['postpoblish'], queryFn: () => getPostPoblished() })
  const { data: allcategory } = useQuery({ queryKey: ['getcategory'], queryFn: () => getAllCategory() })
  useEffect(()=>{
    setSearchParam({categoryID:id})
  },[])
  return (
    <div className='flex px-40'>
      <ul className='w-1/5 mt-20 pr-10'>
        {allcategory?.data?.categories.map(item => {
          return <li><Link to={`/main?categoryID=${item._id}`} onClick={()=>{setId(item._id);setSearchParam({categoryID:item._id})}} className='flex flex-col gap-10 p-5'>{item.title}</Link></li>
        })}
        </ul>
      <div className='w-4/5'>
        <PostBox post={postPoblished} />
      </div>
    </div>
  )
}

export default Main