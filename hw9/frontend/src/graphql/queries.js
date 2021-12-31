import { gql } from '@apollo/client';

export const MESSAGES_QUERY = gql`
    query messages(
        $chatBoxName: String!
    ) {
        messages(chatBoxName: $chatBoxName) {
            sender {
                username
            }
            body
        }
    }
`;
