import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='container'>
      <h1 className='text-center'>شیپور</h1>
      <section>
        <ul className='flex gap-10 justify-center items-center border-b-2 border-b-black'>
          <li><Link to="/">ثبت آگهی</Link></li>
          <li><Link to="/">درباره دیوار</Link></li>
          <li><Link to="/">دریافت برنامه</Link></li>
          <li><Link to="/">بلاگ</Link></li>
          <li><Link to="/">پشتیبانی</Link></li>
        </ul>
      </section>
    </div>
  )
}

export default Header