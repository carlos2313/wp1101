import mongoose from 'mongoose';
import {UserSchema} from './User';
import {MessageSchema} from './Message';

const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM
const ChatBoxSchema = new Schema({
    users:[String],
    messages:[MessageSchema]
})
// Creating a table within database with the defined schema
const CheckBox = mongoose.model('chatBox', ChatBoxSchema)
// Exporting table for querying and mutating
export default CheckBox;
