import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username field is required.']
    },
    password: {
        type: String,
        required: [true, 'password field is required.']
    }
})
// Creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema)
// Exporting table for querying and mutating
export {User, UserSchema};
