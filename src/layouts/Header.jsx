import { Link } from 'react-router-dom'

function Header({setFilterData, search, changeHandler}) {
  return (
    <div className='container'>
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
          <input className='border border-solid border-gray-300 p-2 rounded-md' placeholder='سرچ کنید...' type="text" value={search} onChange={changeHandler} />
        </div>
      </section>
    </div>
  )
}

export default Header