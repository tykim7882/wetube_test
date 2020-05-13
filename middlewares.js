import routes from "./routes";
import multer from "multer";

// upload되는 파일의 경로를 설정
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

// single : 1개의 파일만 업로드 가능
// upload.pug input type=file 의 name= videoFile
export const uproadVideo = multerVideo.single("videoFile");
