import { useQuery } from '@tanstack/react-query'
import img1 from '../assets/main/enamad.png'
import img2 from '../assets/main/etehadie.png'
import img3 from '../assets/main/neshan.png'
import { getSoshalMedia } from '../services/soshalMedia'
import { Link } from 'react-router-dom'
// icons
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

function Footer() {
  const { data: allSoshal } = useQuery({ queryKey: ['getsoshal'], queryFn: () => getSoshalMedia() })
  return (
    <footer className='container flex flex-col justify-center items-center gap-20 border-t-2 border-gray-200 border-solid pt-10'>
      <div className='flex'>
        <img src={img1} alt="" />
        <img src={img2} alt="" />
        <img src={img3} alt="" />
      </div>

      <div className='grid grid-cols-2 gap-5 self-center place-items-center mb-10'>
        {
          allSoshal?.socials.map((item) => <div key={item._id}>
            <Link to={item.link}>{item.name}</Link>
          </div>)
        }
        <FaInstagram />
        <FaTwitter />
      </div>
    </footer>
  )
}

export default Footer
