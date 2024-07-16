
function SubCategoryCreate({ result, setCategoryId, setId ,id}) {
        return <><li className={`${id == result[0]._id ? "active" : "" }`}>{result[0].title}</li>{result[0]?.subCategories?.map(elem => <li key={elem._id} className={`cursor-pointer subcategory`} onClick={() => { setId(elem._id); setCategoryId({ categoryID: elem._id }) }}>{elem.title}</li>)}</>
}

export default SubCategoryCreate