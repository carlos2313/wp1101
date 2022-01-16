import Query from "./Query";
import Mutation from "./Mutation";
// import Subscription from "./Subscription";
import {GraphQLUpload} from "graphql-upload";

const resolvers = {
    Upload: GraphQLUpload,
    Query,
    Mutation,
//    Subscription
}

export default resolvers;