import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk('products/getProducts', async () => {
    const response = await axios.get('http://localhost:5000/product')
    return response.data
})

export const saveProducts = createAsyncThunk('products/saveProducts', async ({ title, price }) => {
    const response = await axios.post('http://localhost:5000/product', {
        title, price
    })
    return response.data
})

const productEntity = createEntityAdapter({
    selectId: (product) => product.id
})

const productSlice = createSlice({
    name: "product",
    initialState: productEntity.getInitialState(),
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            productEntity.setAll(state, action.payload)
        },
        [saveProducts.fulfilled]: (state, action) => {
            productEntity.addOne(state, action.payload)
        }
    }
})

export const productSelectors = productEntity.getSelectors(state => state.product)
export default productSlice.reducer