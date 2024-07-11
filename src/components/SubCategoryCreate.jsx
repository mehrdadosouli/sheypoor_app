
function SubCategoryCreate({ result, setSearchParam, setId, clickHandler }) {
        return <><span onClick={clickHandler} className="cursor-pointer">همه</span><li>{result[0].title}</li>{result[0].subCategories.map(elem => <li key={elem._id} className="cursor-pointer" onClick={() => { setId(elem._id); setSearchParam({ categoryID: elem._id }) }}>{elem.title}</li>)}</>

}

export default SubCategoryCreate