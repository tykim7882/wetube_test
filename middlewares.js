import routes from "./routes";
import multer from "multer";

// upload되는 파일의 경로를 설정
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
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

// single : 1개의 파일만 업로드 가능
// upload.pug input type=file 의 name= videoFile
export const uproadVideo = multerVideo.single("videoFile");
