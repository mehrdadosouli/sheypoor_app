
function FilterSideBar({ allcategory, id }) {
    let allFilters = allcategory?.data?.categories.flatMap(i => i.subCategories)
    let filter = allFilters?.filter(i => i._id == id)
    console.log(filter);

    return (
        <div>
            {
                filter ? filter.map(i => (<>{
                    i.filters.map(item => <div>
                        <span>{item.name}</span>
                        <select name="" id="">
                            {
                                item?.options?.map(elem=>
                                    <option value={elem}>{elem}</option>
                                )
                            }
                        </select>
                    </div>)
                }</>))
                    :
                    ""
            }
        </div>
    )
}

export default FilterSideBar