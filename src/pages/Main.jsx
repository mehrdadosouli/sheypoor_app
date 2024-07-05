import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCookieCity } from '../utils/func'

function Main() {
  const [param,setParam]=useSearchParams()
  useEffect(()=>{
    let cookie=getCookieCity()
    if(cookie){
      setParam({city:cookie})
    }
  },[])

  return (
    <div>Main</div>
  )
}

export default Main