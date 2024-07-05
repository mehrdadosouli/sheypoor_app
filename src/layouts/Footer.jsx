import { useQuery } from '@tanstack/react-query'
import img1 from '../assets/main/enamad.png'
import img2 from '../assets/main/etehadie.png'
import img3 from '../assets/main/neshan.png'
import { getSoshalMedia } from '../services/soshalMedia'
const Icon1 = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141..." /></svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="curreredtColor" viewBox="0 0 24 24">
    <path d="M12 2.21c-4.96 0-5.56.02-7.5.06-1.44.03-2.78.14-3.84.29-2.15.28-3.51 1.1-4.67 2.26a7.56 7.56 0 0 0-2 3.87C.24 10.45.2 11.02.2 12..."/>
  </svg>
);
import { Link } from 'react-router-dom'

function Footer() {
  const { data: allSoshal } = useQuery({ queryKey: ['getsoshal'], queryFn: () => getSoshalMedia() })
  console.log(allSoshal);
  return (
    <footer className='flex justify-center container'>
      <img src={img1} alt="" />
      <img src={img2} alt="" />
      <img src={img3} alt="" />
      <div>
        {
          allSoshal?.socials.map((item,index) => <div key={item._id}>
            {index === 0 ? <Icon1 /> : <InstagramIcon />}
            <Link to={item.link}>{item.name}</Link>
          </div>)
        }
      </div>
    </footer>
  )
}

export default Footer
