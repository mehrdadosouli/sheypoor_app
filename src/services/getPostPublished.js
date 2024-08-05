// import api from "../config/api"
// import { getCookieCity } from "../utils/func"

// const getPostPoblished=async(categoryId)=>{
//     const city=getCookieCity()
//     try {
//         const res=await api.get(`v1/post?city=${city[0]?.id}${categoryId ? `&categoryId=${categoryId.categoryId}` : ""}`)
//         const data=await res.data
//         return data.data
//     } catch (error) {
//         return error
//     }
// }
// export {getPostPoblished}

import api from "../config/api";  
import { getCookieCity } from "../utils/func";  

const getPostPoblished = async (categoryId) => {  
    const city = getCookieCity();  
    
    if (!city || !city[0]) {  
        throw new Error("City information is not available");  
    }  

    try {  
        const res = await api.get(`v1/post?city=${city[0].id}${categoryId ? `&categoryId=${categoryId.categoryId}` : ""}`);  
        return res.data.data;  
    } catch (error) {  
        console.error("Error fetching posts:", error);  
        throw error; // Re-throw to pass the error to the caller  
    }  
}  

export { getPostPoblished };