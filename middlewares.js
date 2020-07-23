import routes from "./routes";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import multer from "multer";

// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_KEY,
//   secretAccessKey: process.env.AWS_PRIVATE_KEY,
//   region: "ap-northeast-1"
// });

// const multerVideo = multer({
//   storage: multerS3({
//     s3,
//     acl: "public-read",
//     bucket: "wetube/video"
//   })
// });
// const multerAvatar = multer({
//   storage: multerS3({
//     s3,
//     acl: "public-read",
//     bucket: "wetube/avatar"
//   })
// });

// upload되는 파일의 경로를 설정
const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatar/" });

// single : 1개의 파일만 업로드 가능
// upload.pug input type=file 의 name= videoFile
export const uproadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  // console.log(req.user);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
