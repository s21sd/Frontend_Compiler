import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { initialStatetype } from "./slices/comilerSlice"

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
                url: "/user/login",
                method: 'POST',
                body: body
            })
        })
    })
})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginMutation } = api