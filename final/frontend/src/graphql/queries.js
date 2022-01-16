import { gql } from "@apollo/client";

export const GET_SCORE_QUERY = gql`
    query GetScoreQuery($username: String!, $password: String!, $secretKey: String!, $exam: String!) {
        score(username: $username, password: $password, secretKey: $secretKey, exam: $exam){
            type
            msg
            scores {
                totalScore
                timeStamp
                tasks {
                    name
                    status
                    score
                }
            }
        }
    }
`;

export const GET_EXAM_QUERY = gql`
    query GetExamQuery {
        exam
    }
`;