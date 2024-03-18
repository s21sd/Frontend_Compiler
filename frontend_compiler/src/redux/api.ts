import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { initialStatetype } from "./slices/comilerSlice"

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            else {
                headers.delete('Authorization');
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        saveCode: builder.mutation<{ url: string, status: string }, { fullCode: initialStatetype["fullCode"], title: string }>({
            query: (fullCode) => ({
                url: "/compile/save",
                method: 'POST',
                body: {
                    "html": fullCode.fullCode.html,
                    "css": fullCode.fullCode.css,
                    "js": fullCode.fullCode.javascript,
                    title: fullCode.title

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
        signup: builder.mutation<UserInfoType, signupCredentialType>({
            query: (body) => ({
                url: "auth/signup",
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
            query: () => ({ url: "/auth/userDetails", cache: "no-store", method: 'GET' })
        }),
        getMyCodes: builder.query<{fullcode:initialStatetype["fullCode"]},void>({
            query: () => "/user/my-codes",
            providesTags: ["myCodes"],
        }),
    })
})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginMutation, useSignupMutation, useLogoutMutation, useGetUserDetailsQuery } = api