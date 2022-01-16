import {gql} from "apollo-server-express";

const schema = gql`
    scalar Upload
    scalar Date

    type Query {
        greetings: String
        score(username: String!, password: String!, secretKey: String!, exam: String!): ScoresWithType
        exam: [String]
    }
    type Mutation {
        singleUpload(username: String!, password: String!, secretKey: String!, exam: String!, file: Upload!): MessageWithType
        signUp(username: String!, password: String!): MessageWithType
        login(username: String!, password: String!, secretKey: String!): MessageWithType
        logout: MessageWithType
    }

    type MessageWithType {
        type: String
        msg: String
    }

    type ScoresWithType {
        type: String
        msg: String
        scores: [Score]
    }

    type Score {
        tasks: [Task]!
        totalScore: Int!
        timeStamp: Date
    }

    enum VerdictType {
        Passing
        Failing
        Pending
        Skipped
    }

    type Task {
        name: String!
        status: VerdictType!
        score: Int!
    }
`;

export default schema;