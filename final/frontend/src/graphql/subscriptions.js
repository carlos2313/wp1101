import { gql } from "@apollo/client";

export const GRADE_UPDATE_SUBSCRIPTION = gql`
    subscription OnGradeUpdated($username: String!, $password: String!, $secretKey: String!) {
        gradeUpdated(username: $username, password: $password, secretKey: $secretKey) {
            grade
        }
    }
`
