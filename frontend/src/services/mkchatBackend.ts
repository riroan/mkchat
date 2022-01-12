import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const mkchatBackendApi = createApi({
    reducerPath:'mkchatBackendApi',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:8000/'}),
    endpoints:(builder)=>({}),
})

export const {} = mkchatBackendApi