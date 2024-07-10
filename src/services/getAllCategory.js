import api from "../config/api"

const getAllCategory=()=>{
   return api.get('v1/category')
    .then(res=>res.data)
    .catch(err=>err)
}

export { getAllCategory }