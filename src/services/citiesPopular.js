import api from "../config/api"

const getCitiesPopular=()=>{
   return api.get('v1/location').then(response=>{
        return response.data.data
    })
}

export { getCitiesPopular }