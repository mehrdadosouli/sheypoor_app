import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getPostPoblished } from '../services/getPostPublished'
import PostBox from '../components/PostBox'

function Main() {
 const {data:postPoblished}=useQuery({queryKey:['postpoblish'],queryFn:()=>getPostPoblished()})
   console.log(postPoblished);
  return (
    <div>
      <PostBox post={postPoblished} />
    </div>
  )
}

export default Main