import mongoose from "mongoose";

const MONGOURL = "mongodb://localhost:27017/UserDatabase";
const connect = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(MONGOURL, {useNewUrlParser: true})
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((error) => {
        console.log("database connection failed exiting now...");
        console.error(error);
        process.exit(1);
    });
}

export default connect;