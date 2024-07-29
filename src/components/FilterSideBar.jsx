import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { increment } from "../redux/dataSlice"

function FilterSideBar({ allcategory, id }) {
    const allProducts = useSelector((data) => data?.data?.products)
    const allFilterProducts = useSelector((data) => data?.data?.filtersProducts)
    const dispatch = useDispatch()

    let allFilters = allcategory?.data?.categories.flatMap(i => i.subCategories)
    let filter = allFilters?.filter(i => i._id == id)
    const [filterState, setFilterState] = useState({
        model: '',
        operation: ''
    })
    const changeHandler = (e) => {
        if (e.target.id == 'model') {
            setFilterState(prev => ({ ...prev, model: e.target.value.slice(0, 4) }))
        }
        if (e.target.id == 'operation') {
            setFilterState(prev => ({ ...prev, operation: e.target.value }))
        }
    }

    useEffect(() => {
        let resultModelFilter = allProducts?.filter(i => i?.dynamicFields?.some(item => {
            if (item.slug == 'model' && filterState.model != 'پیش فرض') {
                return item?.data <= filterState.model
            }
            if (item.slug == 'model' && filterState.model == 'پیش فرض') {
                return allProducts
            }
        }))


        if (filterState.operation) {
            resultModelFilter = resultModelFilter?.filter(i => i?.dynamicFields?.some(item => {
                if (item.slug == 'operation' && filterState.operation != "پیش فرض") {
                    return item?.data == filterState.operation
                }
                if (item.slug == 'operation' && filterState.operation == 'پیش فرض') {
                    return resultModelFilter
                }
            }))
        }
        dispatch(increment(resultModelFilter))
    }, [filterState])
    return (
        <div>
            {
                filter ? filter.map(i => (<div key={i._id} className="flex flex-col gap-10 py-12 border-solid border-t-2 border-gray-200">{
                    i.filters.map(item => {
                        if (item.type == 'selectbox') {
                            return <div key={item._id}>
                                <span>{item.name}</span>
                                <select id={item.slug} onChange={changeHandler} value={filterState.slug}>
                                    <option value="پیش فرض">پیش فرض</option>
                                    {
                                        item?.options?.map(elem =>
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