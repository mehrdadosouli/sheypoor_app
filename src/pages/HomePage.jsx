import React, { useEffect, useState } from 'react'
import { getCities } from '../services/allCities'
import { useQuery } from '@tanstack/react-query'
import { setCookieCity } from '../utils/func'
import { useNavigate } from 'react-router-dom'

function Home() {
  const [search, setSearch] = useState('')
  const [filterCity, setFilterCity] = useState([])
  const navigate = useNavigate()
  const { data: allcity, isLoading } = useQuery({ queryKey: ['fetch-All-City'], queryFn: getCities })

  const searchHandler = (e) => {
    setSearch(e.target.value)
  }

  const clickHandler = (e) => {
    setCookieCity(e.target.innerText)
    navigate(`/main?city=${e.target.innerText}`)
  }
  useEffect(() => {
    const result = allcity?.cities.filter(item => item.name.includes(search))
    if (search) {
      setFilterCity(result)
    } else {
      setFilterCity([])
    }
  }, [search])

  const resultCity = allcity?.cities?.filter(item => item.popular == true)
  return (
    <div className='container flex flex-col gap-10'>
      <p className='text-center'>اﮔﻪ دﻧﺒﺎل ﭼﯿﺰی ﻫﺴﺘﯽ، ﺷﻬﺮت رو اﻧﺘﺨﺎب ﮐﻦ و ﺗﻮ دﺳﺘﻪ‌ﺑﻨﺪی‌ﻫﺎ ﺑﻪ دﻧﺒﺎﻟﺶ
        ﺑﮕﺮد. اﮔﺮ ﻫﻢ ﻣﯽ‌ﺧﻮای ﭼﯿﺰی ﺑﻔﺮوﺷﯽ، ﭼﻨﺪ ﺗﺎ ﻋﮑﺲ ﺧﻮب ازش ﺑﮕﯿﺮ و آﮔﻬﯿﺖ رو
        ﺑﭽﺴﺒﻮن ﺑﻪ شیپور</p>
      <input type="text" value={search} onChange={searchHandler} placeholder='جستجوی شهر' className='w-full p-3 border border-solid' />
      <div className={`${search ? 'flex' : 'hidden'} flex-col gap-10 -mt-10 size-full shadow-lg shadow-gray-300 p-5`}>
        {filterCity && filterCity.map(item => <span className='' key={item.id} onClick={clickHandler}>{item.name}</span>)}
      </div>
      <h2 className='font-extrabold font-iransans-bold'>شهر های پر بازدید</h2>
      <div className='grid grid-cols-5 gap-10 my-5'>
        {
          isLoading ? <h1>Loading....</h1> :
            resultCity.map(item => <span className='w-fit cursor-pointer' key={item.id} onClick={clickHandler}>{item.name}</span>)
        }
      </div>
    </div>
  )
}

export default Home