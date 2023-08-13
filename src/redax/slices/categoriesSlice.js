import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (_, thunkAPI) => {
        const {data} = await axios.get('https://api.escuelajs.co/api/v1/categories')
        return data
    }
)


export const status = {
    LOADING: "loading",
    SUCCES: 'succes',
    ERROR: 'error',
}

const initialState = {
    categories: [],
    isLoading: status.LOADING,
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setList(state, action) {
            state.categories = action.payload
        },
    },

    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = status.LOADING
            state.categories = []
        });

        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.isLoading = status.SUCCES
            state.categories = action.payload
        });

        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = status.ERROR
            state.categories = []
        });
    }
})

export const {setList} = categoriesSlice.actions

export default categoriesSlice.reducer

