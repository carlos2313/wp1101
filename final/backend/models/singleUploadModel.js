import {Schema, model} from "mongoose";

const SingleFileSchema = new Schema({
    image: {
        type: String,
        required: true
    }
}, {timestamps: true});

const SingleFileModel = model("SingleFile", SingleFileSchema);

export default SingleFileModel;