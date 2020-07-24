import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useFindAndModify: false,
// });
mongoose.connection
  .once("open", function () {
    console.log("Conection has been made!");
  })
  .on("error", function (error) {
    console.log("Error is: ", error);
  });

const db = mongoose.connection;

const handleOpen = () => console.log("@@@ Connected to DB");
const handleError = (error) =>
  console.log(`@@@ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
