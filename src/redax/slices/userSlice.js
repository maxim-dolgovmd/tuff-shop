import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { isDisabled } from '@testing-library/user-event/dist/utils'
import axios from 'axios'

// export const getCategories = createAsyncThunk(
//     'categories/getCategories',
//     async (_, thunkAPI) => {
//         const {data} = await axios.get('https://api.escuelajs.co/api/v1/categories')
//         return data
//     }
// )

export const status = {
    LOADING: "loading",
    SUCCES: 'succes',
    ERROR: 'error',
}

const initialState = {
    addItemToCart: [],
    showForm: false,
    formType: 'signup',
    authUser: [],
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

        setAddItemToCart(state, action) {
            let newCart = [...state.addItemToCart]

            const found = state.addItemToCart.find(({id, sizes}) => id === action.payload.id && sizes === action.payload.sizes)

            if (found) {
                newCart = newCart.map((obj) => {
                    return obj.id === action.payload.id && obj.sizes === action.payload.sizes ? {...obj, quantity: action.payload.quantity || obj.quantity + 1}
                      : obj
                })
            } else {
                newCart.push({...action.payload, quantity: 1})
            }

            state.addItemToCart = newCart
        },

        setDeleteProduct(state, action) {

            state.addItemToCart = state.addItemToCart.filter((_, index) => index !== action.payload)

        },

        setAddItemToFavorites(state, action) {
            let newCart = [...state.addItemToCart]

            const found = state.addItemToCart.find(({id, sizes}) => id === action.payload.id && sizes === action.payload.sizes)

            if (found) {
                newCart = newCart.map((obj) => {
                    return obj.id === action.payload.id ? {...obj, quantity: action.payload.quantity || obj.quantity + 1}
                      : obj
                })
            } else {
                newCart.push({...action.payload, quantity: 1})
            }

            state.addItemToCart = newCart
        },

        setShowForm(state, action) {
            if (action.payload === true) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }

            state.showForm = action.payload
        },

        setFormType(state, action) {
            state.formType = action.payload
        },

        setAuthUser(state, action) {
            state.authUser = action.payload
        }
    },

    extraReducers: (builder) => {
       
    }
})

export const {
    setAddItemToCart, 
    setAddItemToFavorites, 
    setShowForm, 
    setFormType, 
    setAuthUser, 
    setCountPlus, 
    setCountMinus, 
    setDeleteProduct
} = userSlice.actions

export default userSlice.reducer