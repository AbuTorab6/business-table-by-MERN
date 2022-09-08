import {createSlice} from '@reduxjs/toolkit'

var productState = createSlice(
    {
        name:"productState",
        initialState:{
            total:0,
            allProduct:[]
        },
        reducers:{
            setTotalFunc:(p1,data)=>
            {
                p1.total=data.payload;
            },
            setAllProductFunc:(p1,data)=>
            {
                p1.allProduct=data.payload
            }
        }
    }
)

export const {setTotalFunc,setAllProductFunc} = productState.actions;
export default productState.reducer;