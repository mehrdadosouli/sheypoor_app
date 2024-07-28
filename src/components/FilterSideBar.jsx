import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

function FilterSideBar({ allcategory, id }) {
    const allProducts = useSelector((data) => data?.data?.products)
    const allFilterProducts = useSelector((data) => data?.data?.filtersProducts)

    let allFilters = allcategory?.data?.categories.flatMap(i => i.subCategories)
    let filter = allFilters?.filter(i => i._id == id)
    const [filterState,setFilterState]=useState({
        year:'',
        kilometer:''
    })
    const changeHandler=(e)=>{
        if(e.target.id == 'model'){
            setFilterState(prev=>({...prev,year:e.target.value}))
        }
        if(e.target.id == 'operation'){
            setFilterState(prev=>({...prev,kilometer:e.target.value}))
        }
    }

    useEffect(()=>{
        // let result=allFilterProducts.filter(i=>i.dynamicFields.map(item=>item))
    },[filterState])
    return (
        <div>
            {
                filter ? filter.map(i =>(<div key={i._id} className="flex flex-col gap-10 py-12 border-solid border-t-2 border-gray-200">{
                    i.filters.map(item =>{
                        if(item.type == 'selectbox'){
                            return <div key={item._id}>
                            <span>{item.name}</span>
                            <select id={item.slug}  onChange={changeHandler} value={filterState}>
                                {
                                    item?.options?.map(elem=>
                                        <option key={elem} value={elem}>{elem}</option>
                                    )
                                }
                            </select>
                        </div>
                        }
                        // if(item.type == 'checkbox'){
                        //     console.log(item)
                        // }
                    })
                }
                </div>))
                    :
                    ""
            }
        </div>
    )
}

export default FilterSideBar