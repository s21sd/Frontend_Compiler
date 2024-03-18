/// <reference types="vite/client" />

interface UserInfoType {
    username: string,
    picture: string,
    email: string,
    savedCodes: Array<string>
}
interface loginCredentialType {
    email: string,
    password: string
}
interface signupCredentialType {
    username: string,
    email: string,
    password: string

}