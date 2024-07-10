import { useQuery } from '@tanstack/react-query'
import { getPostPoblished } from '../services/getPostPublished'
import PostBox from '../components/PostBox'
import { getAllCategory } from '../services/getAllCategory'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function Main() {
  const [searchParam,setSearchParam]=useSearchParams()
  const navigate=useNavigate()
  const [id,setId]=useState()
  const [id2,setId2]=useState()
  const { data: postPoblished } = useQuery({ queryKey: ['postpoblish'], queryFn: () => getPostPoblished() })
  const { data: allcategory } = useQuery({ queryKey: ['getcategory'], queryFn: () => getAllCategory() })

  return (
    <div className='flex px-40'>
      <ul className='w-1/5 mt-20 pr-10 flex flex-col gap-10'>
        {
          !id ? 
          allcategory?.data?.categories.map(item => {
            return <li key={item._id} onClick={()=>{setId(item._id);setSearchParam({categoryID:item._id})}} className='flex flex-col gap-10 p-5'>{item.title}</li>
          })
          :
          (()=>{
            let result=allcategory?.data?.categories.filter(item =>item._id == id )
            if(result[0].subCategories){
              return <div className='flex flex-col gap-10'><li onClick={()=>navigate('/main')}>همه</li><li>{result[0].title}</li>{
                result[0].subCategories.map(i=><li key={i._id} onClick={()=>{setId2(i._id),setSearchParam({categoryID:i._id})}}>{
                  (()=>{
                    let res1=i.subCategories.filter(subs=>subs._id == id2)
                    if(res1[0].subCategories){
                      console.log('jj');
                    }else{
                    return <div className='flex flex-col gap-10 p-5'><li>همه</li><li>{result[0].title}</li></div>
                    }
                  })()
                }</li>)
              }</div>
            }else{
              return <div className='flex flex-col gap-10 p-5'><li>همه</li><li>{result[0].title}</li></div>
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

// i.subCategories ?
//                      (()=>{
//                       let data=i.subCategories.filter(elems=>elems._id == id2 )
//                        console.log(data);
//                      })()
//                   :
//                      <div className='flex flex-col gap-10 p-5'><li>همه</li><li>{result[0].title}</li></div>