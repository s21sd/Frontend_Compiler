import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { initialStatetype } from "./slices/comilerSlice"
import { UserInfoType, loginCredentialType, signupCredentialType } from "@/vite-env";

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
    tagTypes: ["myCodes", "allCodes"],
    endpoints: (builder) => ({
        saveCode: builder.mutation<{ url: string, status: string }, { fullCode: initialStatetype["fullCode"], title: string }>({
            query: (fullCode) => {
                return {
                    url: "/compile/save",
                    method: 'POST',
                    body: {
                        "html": fullCode.fullCode.html,
                        "css": fullCode.fullCode.css,
                        "js": fullCode.fullCode.javascript,
                        title: fullCode.title

                    }
                };
            },
            invalidatesTags: ["myCodes"],
        }),

        loadCode: builder.mutation<{ fullCode: initialStatetype["fullCode"]; isOwner: boolean }, { urlId: string }>({
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
        getMyCodes: builder.query<{ fullCode: initialStatetype["fullCode"] }[], void>({
            query: () => "/auth/my-codes",
            providesTags: ["myCodes"],
        }),

        getAllCodes: builder.query<
            Array<{ _id: string; title: string; ownerName: string }>,
            void
        >({
            query: () => ({
                url: "/compile/get-all-codes",
                cache: "no-store",
            }),
            providesTags: ["allCodes"],
        }),

        deleteCode: builder.mutation<void, string>({
            query: (_id) => ({
                url: `/compile/delete/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["myCodes", "allCodes"],
        }),
        editCode: builder.mutation<
            void,
            { fullCode: initialStatetype["fullCode"]; id: string }
        >({
            query: ({ fullCode, id }) => {

                return {
                    url: `/compile/edit/${id}`,
                    method: "PUT",
                    body: {
                        "html": fullCode.html,
                        "css": fullCode.css,
                        "js": fullCode.javascript,

                    }
                };
            },
        }),
    })
})

export const { useSaveCodeMutation, useLoadCodeMutation, useLoginMutation, useSignupMutation, useLogoutMutation, useGetUserDetailsQuery, useGetMyCodesQuery, useDeleteCodeMutation, useEditCodeMutation, useGetAllCodesQuery } = api