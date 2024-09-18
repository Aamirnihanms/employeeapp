import axios from "axios";

const commonapi = async (httpMethod,url,reqbody)=>{
     const reqconfig = {
        url,
        method:httpMethod,
        data:reqbody
     }
    return await axios(reqconfig).then((response)=>{
      return response
    }).catch((error)=>{
        return error
    })
}

export default commonapi