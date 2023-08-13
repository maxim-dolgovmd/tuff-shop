import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async (_, thunkAPI) => {
        const {data} = await axios.get('https://api.escuelajs.co/api/v1/products')
        return data
    }
)


export const status = {
    LOADING: "loading",
    SUCCES: 'succes',
    ERROR: 'error',
}

const initialState = {
    products: [],
    filtered: [],
    related: [],
    isLoading: status.LOADING,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFiltered(state, action) {
            state.filtered = state.products.filter(({price}) => price < action.payload)
        },

        setRelated(state, action) {
            let list = state.products.filter(({category: {id}}) => id === action.payload)
            state.related = [...list].sort(() => 0.5 - Math.random())
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = status.LOADING
            state.products = []
        });

        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = status.SUCCES
            state.products = action.payload
        });

        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = status.ERROR
            state.products = []
        });
    }
})

export const {setFiltered, setRelated} = productsSlice.actions

export default productsSlice.reducer