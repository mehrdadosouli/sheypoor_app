import { useQuery } from '@tanstack/react-query'
import { getPostPoblished } from '../services/getPostPublished'
import PostBox from '../components/PostBox'
import { getAllCategory } from '../services/getAllCategory'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Main() {
  const [searchParam,setSearchParam]=useSearchParams()
  const [id,setId]=useState()
  const { data: postPoblished } = useQuery({ queryKey: ['postpoblish'], queryFn: () => getPostPoblished() })
  const { data: allcategory } = useQuery({ queryKey: ['getcategory'], queryFn: () => getAllCategory() })
  const clickHandler=()=>{
    navigate('/main')
  }

  return (
    <div className='flex px-40'>
      <ul className='w-1/5 mt-20 pr-10'>
        {!id ?
        allcategory?.data?.categories.map(item => {
          return <li key={item._id}><Link to={`/main?categoryID=${item._id}`} onClick={()=>{setId(item._id);setSearchParam({categoryID:item._id})}} className='flex flex-col gap-10 p-5'>{item.title}</Link></li>
        }) :
        (() => {
          const categoryInfo = allcategory?.data?.categories.filter(item => item._id == id);
          if(!categoryInfo){
            return <li>{categoryInfo.title}</li>
          }else{
            return <>
              <Link onClick={clickHandler}>همه</Link>
              <li>{<span className='font-bold'>{categoryInfo[0].title}</span>}</li>
              {
                categoryInfo[0]?.subCategories.map(item=><ul key={item._id}><li>{item.title}</li></ul>)
              }
            </>
          }
        })()
        }
        </ul>
      <div className='w-4/5'>
        <PostBox post={postPoblished} />
      </div>
    </div>
  )
}

export default Main