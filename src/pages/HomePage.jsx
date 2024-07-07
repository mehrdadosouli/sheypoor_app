import React, { useEffect, useState } from 'react'
import { getCities } from '../services/allCities'
import { useQuery } from '@tanstack/react-query'
import { setCookieCity } from '../utils/func'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { FaSearch } from 'react-icons/fa'

function Home() {
  const [search, setSearch] = useState('')
  const [filterCity, setFilterCity] = useState([])
  const navigate = useNavigate()
  const { data: allcity, isLoading } = useQuery({ queryKey: ['fetch-All-City'], queryFn: getCities })

  const searchHandler = (e) => {
    setSearch(e.target.value)
  }

  const clickHandler = (e,id) => {
    let city=e.target.innerText
    setCookieCity(city,id)
    navigate(`/main?city=${city}`)
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
      <p className='text-center my-10'>اﮔﻪ دﻧﺒﺎل ﭼﯿﺰی ﻫﺴﺘﯽ، ﺷﻬﺮت رو اﻧﺘﺨﺎب ﮐﻦ و ﺗﻮ دﺳﺘﻪ‌ﺑﻨﺪی‌ﻫﺎ ﺑﻪ دﻧﺒﺎﻟﺶ
        ﺑﮕﺮد. اﮔﺮ ﻫﻢ ﻣﯽ‌ﺧﻮای ﭼﯿﺰی ﺑﻔﺮوﺷﯽ، ﭼﻨﺪ ﺗﺎ ﻋﮑﺲ ﺧﻮب ازش ﺑﮕﯿﺮ و آﮔﻬﯿﺖ رو
        ﺑﭽﺴﺒﻮن ﺑﻪ شیپور</p>
      <input type="text" value={search} onChange={searchHandler} placeholder='جستجوی شهر' className='w-full p-3 border border-solid' />
      <div className={`${search.length ? 'flex' : 'hidden'} flex-col gap-10 -mt-10 size-full shadow-lg shadow-gray-300 p-5`}>
        {filterCity.length ? filterCity.map(item => <span className='' key={item.id} onClick={(e)=>clickHandler(e,item.id)}>{item.name}</span>) : <div className='flex flex-col justify-center items-center gap-20 p-20'><FaSearch /><span>نتیجه ای برای جستجو یافت نشد</span></div>}
      </div>
      <h2 className='font-extrabold font-iransans-bold'>شهر های پر بازدید</h2>
      <div className='grid grid-cols-5 gap-10 my-5'>
        {
          isLoading ? <Loading /> :
            resultCity?.map(item => <span className='w-fit cursor-pointer' key={item.id} onClick={(e)=>clickHandler(e,item.id)}>{item.name}</span>)
        }
      </div>
    </div>
  )
}

export default Home