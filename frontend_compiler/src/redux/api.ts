import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { initialStatetype } from "./slices/comilerSlice"
import { url } from "inspector"

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),
    endpoints: (builder) => ({
        saveCode: builder.mutation<{ url: string, status: string }, initialStatetype["fullCode"]>({
            query: (fullCode) => ({
                url: "/compile/save",
                method: 'POST',
                body: {
                    "html": fullCode.html,
                    "css": fullCode.css,
                    "js": fullCode.javascript

                }
            })
        }),

        loadCode: builder.mutation<{ fullcode: initialStatetype["fullCode"] }, { urlId: string }>({
            query: (body) => ({
                url: '/compile/load',
                method: "POST",
                body: body

            })
        }),

        login: builder.mutation<UserInfoType, loginCredentialType>({
            query: (body) => ({
                url: "/auth/login",
                method: 'POST',
                body: body,
                credentials: 'include'
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: 'POST',

            })
        }),
        getUserDetails: builder.query<UserInfoType, void>({
            query: () => ({ url: "/auth/userDetails", cache: "no-store" ,method:'GET'})
        })
    })
})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginMutation, useLogoutMutation, useGetUserDetailsQuery } = api