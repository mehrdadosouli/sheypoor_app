import { memo, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCities } from "../services/allCities"
import { filterQuryParams, getCookieCity, setCookieCity } from "../utils/func"

function Header({ search, changeHandler, focusHandler, modal, setQuery, setSearch, closBtnHandler, allcity, loading }) {
  // const queryClient = useQueryClient()
  // const { data: allcitys } = useQuery({ queryKey: ['fetchAllCity'], queryFn: getCities ,initialData:()=>{const cachedData = queryClient.getQueryData(['fetchAllCity']); console.log(cachedData) ;return undefined} })
  const [showModal, setShowModal] = useState(false)
  const [step,setStep]=useState(1)
  const [dataset,setDataset]=useState('')
  const [inputVal, setInputVal] = useState('')
  const cityStorage = getCookieCity()

  let sugestKeyWord = ["لباس", "خودرو", "کفش", "ماشین", "لپ تاپ"]
  // useEffect(()=>{
  //   const cityStorage=getCookieCity()
  //   setCookieCity(cityStorage.city,cityStorage.id)
  // },[])

  const changeCityHandler = (e) => {
    setShowModal(true)
  }
  const closeHandler = (e) => {
    console.log('close btn');
  }
  const selectCityHandler = (e) => {
    setStep(2);
    setDataset(e.target.dataset.provinceId)
  }

  window.addEventListener('click', (e) => {
    if (e.target.id == 'modal') {
      setShowModal(false)
    }
  })


  return (

    <div className='container relative z-50'>
      <h1 className='text-center'>شیپور</h1>
      <section>
        {/* <ul className='flex gap-10 justify-center items-center border-b-2 border-b-black'>
          <li><Link to="/">ثبت آگهی</Link></li>
          <li><Link to="/">درباره دیوار</Link></li>
          <li><Link to="/">دریافت برنامه</Link></li>
          <li><Link to="/">بلاگ</Link></li>
          <li><Link to="/">پشتیبانی</Link></li>
        </ul> */}
        <div className='flex items-center gap-10'>
          <h1 className='font-bold'>شیپور </h1>
          <div>
            {cityStorage?.length == 1 && <div className="flex justify-center items-center gap-2 cursor-pointer select-none" onClick={changeCityHandler}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
              {cityStorage[0]?.city}</div>
            }
            {cityStorage?.length == 2 &&
              <div className="flex justify-center items-center gap-2 cursor-pointer select-none" onClick={changeCityHandler}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
                <span>{cityStorage.length + "شهر"}</span>
              </div>
            }
          </div>
          <div className="relative">
            <input className='w-[300px] border border-solid border-gray-300 p-2 rounded-md' placeholder='سرچ کنید...' type="text" value={search} name="search" onChange={changeHandler} onFocus={focusHandler}
              onKeyUp={(e) => { if (e.keyCode == 13) { closBtnHandler() } }}
            />
            <div className={modal ? `w-[300px] h-20 flex justify-center items-center gap-2 bg-gray-600 absolute top-14 ` : 'hidden'}>
              {sugestKeyWord?.map(item => <span key={item} className="inline-flex border-solid border-white border-2 rounded-2xl p-1 text-xl text-white cursor-pointer" onClick={() => { setSearch(item); setQuery(query => filterQuryParams(query, { search: item })) }}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>
      {
        showModal && <div className="bg-bg-gray-light size-full fixed top-0 left-0" id='modal'>
          <div className={`min-w-[35%] max-h-[500px] flex flex-col gap-10 border border-solid border-gray-300 rounded-lg fixed top-1/2 -translate-y-1/2 right-1/2 transform translate-x-1/2 z-50 overflow-y-auto p-5 bg-white ${showModal ? 'flex' : 'hidden'} scrollbar`}>
            <div className="flex flex-col gap-8 pb-5 border-b-2 border-solid border-gray-200">
              <div className="flex justify-between items-center">
                <span>انتخاب شهر</span>
                <span className="text-red-500">حذف همه</span>
              </div>
              <div>
                <span onClick={closeHandler} className="w-28 h-14 p-1 flex justify-between items-center border border-solid border-red-500 rounded-3xl bg-red-100 hover:cursor-pointer">
                  {cityStorage[0]?.city}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </span>
              </div>
              <input type="text" className="w-[90%] mx-auto border border-solid border-r-gray-400 outline-none p-2 rounded-md" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder="جستجو در شهر ها" />
            </div>
            {
              allcity && <ul className="flex flex-col gap-10"> 
              {(step == 1 ? allcity?.provinces : allcity?.cities?.filter(item =>item.province_id == dataset)).map(item =>
                <li className="w-[90%] mx-auto inline-flex justify-between items-center pb-2 hover:cursor-pointer border-b-2 border-solid border-gray-200" key={item.id} data-province-id={item.id} onClick={selectCityHandler}>
                  {item.name}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#212020" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </li>
              )
            }  
              </ul>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default memo(Header)