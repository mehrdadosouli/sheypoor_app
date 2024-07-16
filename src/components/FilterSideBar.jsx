
function FilterSideBar({ allcategory, id }) {
    let allFilters = allcategory?.data?.categories.flatMap(i => i.subCategories)
    let filter = allFilters?.filter(i => i._id == id)

    return (
        <div>
            {
                filter ? filter.map(i =>(<div key={i._id} className="flex flex-col gap-10 pt-10 border-solid border-t-2 border-gray-200">{
                    i.filters.map(item =>{
                        if(item.type == 'selectbox'){
                            return <div key={item._id}>
                            <span>{item.name}</span>
                            <select name="" id="">
                                {
                                    item?.options?.map(elem=>
                                        <option key={elem._id} value={elem}>{elem}</option>
                                    )
                                }
                            </select>
                        </div>
                        }
                        if(item.type == 'checkbox'){
                            console.log(item)
                        }
                    })
                }</div>))
                    :
                    ""
            }
        </div>
    )
}

export default FilterSideBar