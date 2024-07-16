import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import nopic from '../assets/main/noPicture.png'
import { relaitiveTimePost } from '../utils/func'
export default function PostBox({ post }) {
    return (
        <div className='min-h-96 flex justify-center items-center'>
            {
                post?.length ?
                    <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 my-10 mx-auto '>
                        {
                            post?.map(item => {
                                return <div key={item._id} className='flex justify-between p-5 gap-10 border border-solid border-gray-300'>
                                    <div className='w-1/2 flex flex-col justify-between'>
                                        <span className='font-bold'><Link to={`/main/id=${item._id}`}>{item?.title}</Link></span>
                                        <span>{item?.dynamicFields[0].data}</span>
                                        <span className='text-xl'>{item?.price == 0 ? "توافقی" : `${item.price.toLocaleString() + ' تومان'}`}</span>
                                        <span>{item?.city?.name}</span>
                                        <span>{relaitiveTimePost(item?.createdAt)}</span>
                                    </div>
                                    <div className='w-1/2'>
                                        {
                                            item?.pics ? <img className='w-80 h-80 object-cover' src={`https://divarapi.liara.run/${item.pics[0]?.path}`} alt="" />
                                                : <img src={nopic} alt='no pic' />
                                        }
                                    </div>
                                </div>
                            })
                        }
                    </div> :
                 <Loading />
            }
        </div>
    )
}