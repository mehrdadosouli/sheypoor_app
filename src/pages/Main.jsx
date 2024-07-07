import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getPostPoblished } from '../services/getPostPublished'

function Main() {
 const {data:postPoblished}=useQuery({queryKey:['postpoblish'],queryFn:()=>getPostPoblished()})
   
  return (
    <div>Main</div>
  )
}

export default Main