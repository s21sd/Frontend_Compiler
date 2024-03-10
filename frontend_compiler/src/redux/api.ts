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
        })
    })
})

export const { useSaveCodeMutation } = api