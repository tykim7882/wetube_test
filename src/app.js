import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import flash from "express-flash";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import apiRouter from "./routers/apiRouter";
import routes from "./routes";
import dotenv from "dotenv";
dotenv.config();

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

// middleware
app.use(helmet());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(cookieParser()); // user의 정보를 쿠키에 저장, session 관리
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exteded: true })); // 서버가 유저로부터 전달받은 데이터를 이해
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// routes.js 에 정의된 값을 사용하기 위한 미들웨어 생성
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
// /user 경로에 들어오면, userRouter의 모든 경로를 사용(./router 에 정의된 경로)
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app; // 다른 곳에서 이 파일을 import 할 때 app object를 전송한다.
