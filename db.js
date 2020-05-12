// export const videos = [
//   {
//     id: 100000,
//     title: "Video awesome",
//     description: "This is something I love",
//     views: 24,
//     videoFile:
//       "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: "mong",
//       name: "Monkey D. Ruffy",
//       email: "mongD.google.com",
//     },
//   },
//   {
//     id: 100001,
//     title: "Video awesome 1",
//     description: "This is something I love",
//     views: 24,
//     videoFile:
//       "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: "mong",
//       name: "Monkey D. Ruffy",
//       email: "mongD.google.com",
//     },
//   },
//   {
//     id: 100002,
//     title: "Video awesome 2",
//     description: "This is something I love",
//     views: 24,
//     videoFile:
//       "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
//     creator: {
//       id: "mong",
//       name: "Monkey D. Ruffy",
//       email: "mongD.google.com",
//     },
//   },
// ];
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// mongoose.connect("mongodb://localhost:27017/we-tube", {
//   useNewUrlParser: true,
//   useFindAndModify: false,
// });

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("@@@ Connected to DB");
const handleError = (error) =>
  console.log(`@@@ Error on DB Connection : ${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
