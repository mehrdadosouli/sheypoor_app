import api from "../config/api"

const getSoshalMedia=()=>{
    return api.get('v1/social/').then(res=>res.data.data)
}
export {getSoshalMedia}