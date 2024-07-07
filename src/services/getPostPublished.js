import api from "../config/api"
import { getCookieCity } from "../utils/func"

const getPostPoblished=async()=>{
    const city=getCookieCity()
    try {
        const res=await api.get(`v1/post?city=${city[0].id}`)
        const data=await res.data
        return data.data
    } catch (error) {
        return error
    }
}
export {getPostPoblished}