import React from 'react'
import { Link } from 'react-router-dom'
import api from '../config/api';
export default function PostBox({ post }) {
    console.log(post);
    return (
        <div>
            <div className='flex flex-wrap gap-10 my-10 mx-auto justify-center items-center '>
                {
                    post?.posts.map(item => {
                        return <div key={item._id} className='w-[50rem] flex p-5 gap-10 border border-solid border-gray-300'>
                            <div className='flex flex-col'>
                                <span><Link to={`/main/id=${item._id}`}>{item?.title}</Link></span>
                                <span>{item?.dynamicFields[0].data}</span>
                                <span>{item?.price == 0 ? "توافقی" : `${item.price + ' تومان'}`}</span>
                                <span>{item?.city?.name}</span>
                            </div>
                            <div>
                               {
                                item?.pics.length ? <img className='max-w-96 object-cover' src={`https://divarapi.liara.run/${item.pics[0].path}`} alt="" /> 
                                : <h1>hi</h1>
                               }
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
