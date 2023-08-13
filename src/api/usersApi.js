import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const API_URL = 'https://api.escuelajs.co/api/v1/'

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery(
        {baseUrl: API_URL}
    ),
    endpoints: (builder) => ({
        createUsers: builder.mutation({
            query: ({name, email, password, avatar}) => {
                return {
                    url: `users`,
                    method: 'POST',
                    body: {
                        name: name,
                        email: email,
                        password: password,
                        avatar: avatar
                    }
                }
            }
        }),

        updateUser: builder.mutation({
            query: (data) => {
                return {
                    url: `users/${data.id}`,
                    method: 'PUT',
                    body: {
                        email: data.email,
                        name: data.name,
                        password: data.password,
                    }
                }
            }
        }),


        loginUser: builder.mutation({
            query: ({email, password}) => {
                return {
                    url: 'auth/login',
                    method: 'POST',
                    body: {
                        email: email,
                        password: password,
                    }
                }
            }
        }),
        profileUser: builder.mutation({
            query: (token) => {
                return {
                    url: 'auth/profile',
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            }
        })
    })
})

export const {
    useCreateUsersMutation,
    useLoginUserMutation,
    useProfileUserMutation,
    useUpdateUserMutation,
} = usersApi