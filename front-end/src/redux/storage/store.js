import {configureStore} from '@reduxjs/toolkit'

import productState from '../stateSlice/productState'

export default configureStore(
    {
        reducer:{
            productState
        }
    }
)