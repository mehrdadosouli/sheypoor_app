import React, { useEffect, useState } from 'react'
import { getCitiesPopular } from '../services/citiesPopular'
import { useQuery } from '@tanstack/react-query'

function Home() {
  const [search, setSearch] = useState('')
  const { data: allcity, isLoading } = useQuery({ queryKey: ['fetch-All-City'], queryFn: getCitiesPopular })

  const searchHandler = (e) => {
    setSearch(e.target.value)
  }
  const resultCity = allcity?.cities?.filter(item => item.popular == true)
  return (
    <div className='container flex flex-col gap-10'>
      <p className='text-center'>اﮔﻪ دﻧﺒﺎل ﭼﯿﺰی ﻫﺴﺘﯽ، ﺷﻬﺮت رو اﻧﺘﺨﺎب ﮐﻦ و ﺗﻮ دﺳﺘﻪ‌ﺑﻨﺪی‌ﻫﺎ ﺑﻪ دﻧﺒﺎﻟﺶ
        ﺑﮕﺮد. اﮔﺮ ﻫﻢ ﻣﯽ‌ﺧﻮای ﭼﯿﺰی ﺑﻔﺮوﺷﯽ، ﭼﻨﺪ ﺗﺎ ﻋﮑﺲ ﺧﻮب ازش ﺑﮕﯿﺮ و آﮔﻬﯿﺖ رو
        ﺑﭽﺴﺒﻮن ﺑﻪ دﯾﻮار</p>
      <input type="text" value={search} onChange={searchHandler} placeholder='جستجوی شهر' className='w-full p-3 border border-solid' />
      <h2>شهر های پر بازدید</h2>
      <div className='grid grid-cols-5 gap-10 my-5'>
        {
          isLoading ? <h1>Loading....</h1> :
            resultCity.map(item => <span>{item.name}</span>)
        }
      </div>
    </div>
  )
}

export default Home