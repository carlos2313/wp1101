import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
    mutation SignupMutation($username: String!, $password: String!) {
        signUp(username: $username, password: $password) {
            type
            msg
        }
    }
`

export const UPLOAD_FILE = gql`
    mutation singleUpload($username: String!, $password: String!, $secretKey: String!, $file: Upload!, $exam: String!){
        singleUpload(username: $username, password: $password, secretKey: $secretKey, file: $file, exam: $exam){
            type
            msg
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation LoginMutation($username: String!, $password: String!, $secretKey: String!) {
        login(username: $username, password: $password, secretKey: $secretKey) {
            type
            msg
        }
    }
`

export const LOGOUT_MUTATION =  gql`
    mutation LogoutMutation {
        logout{
            type
            msg
        }
    }
`