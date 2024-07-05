import api from "../config/api"

const getCities=()=>{
   return api.get('v1/location').then(response=>{
        return response.data.data
    })
}

export { getCities }