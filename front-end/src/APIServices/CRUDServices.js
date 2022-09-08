
import axios from 'axios'
import cogoToast from 'cogo-toast'

var baseURL = "http://localhost:5000"

var productList = (pageNo,perPage,searchKey)=>
{
    //console.log(baseURL+'/productList/'+pageNo+'/'+perPage+'/'+searchKey);
    
    return axios.get(baseURL+'/productList/'+pageNo+'/'+perPage+'/'+searchKey).then
    (
        (res)=>
        {
            if(res.status===200)
            {
                if(res.data[0].allData.length==0)
                {
                    
                    cogoToast.error("no data found");
                    return false;
                }
                else
                {
                    return res.data;
                }
            }
            else if(res.status===206)
            {
                cogoToast.warn(res.data);
                return false
            }
            else
            {
                cogoToast.warn("something is wrong");
                return false
            }
        }
    ).catch
    (
        (err)=>
        {
            cogoToast.warn(err.message)
            return false;
        }
    )
}


export {productList};