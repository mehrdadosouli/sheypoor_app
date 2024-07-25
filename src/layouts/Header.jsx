import { filterQuryParams } from "../utils/func"

function Header({ search, changeHandler, focusHandler, modal, setQuery, setSearch, closBtnHandler }) {
  let sugestKeyWord = ["لباس", "خودرو", "کفش", "ماشین", "لپ تاپ"]

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
          <div className="relative">
            <input className='w-[300px] border border-solid border-gray-300 p-2 rounded-md' placeholder='سرچ کنید...' type="text" value={search} name="search" onChange={changeHandler} onFocus={focusHandler} onKeyUp={(e) => {
              if (e.keyCode == 13) {
                closBtnHandler()
              }
            }} />
            <div className={modal ? `w-[300px] h-20 flex justify-center items-center gap-2 bg-gray-600 absolute top-14 ` : 'hidden'}>
              {sugestKeyWord?.map(item => <span key={item} className="inline-flex border-solid border-white border-2 rounded-2xl p-1 text-xl text-white cursor-pointer" onClick={() => { setSearch(item); setQuery(query => filterQuryParams(query, { search: item })) }}>{item}</span>)}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header