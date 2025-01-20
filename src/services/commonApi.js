import axios from "axios"

const commonAPI=async(httpMethod,url,reqBody)=>{
    const reqConfig={
        method: httpMethod,
        url,
        data: reqBody
    }
    return await axios(reqConfig).then(res=>{   //returning await statement will avoid the delay in api .
        return res
    }).catch(err=>{
        return err
    })
}

export default commonAPI