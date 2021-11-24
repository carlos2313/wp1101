import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
dotenv.config();

async function connect(){
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("mongo db connection created");
    }).catch(() => {
        console.log("mongo db connection failed");
    });
    return mongoose.connection;
}

export default connect;

