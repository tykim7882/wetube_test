import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
// import { userRouter } from "./routers/userRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();
app.set("view engine", "pug");

// const handleHome = (req, res) => res.send("Hello from Home sssseeees!");
// const handleProfile = (req, res) => res.send("You are on my profile!");

// middleware
app.use(helmet());
app.use(cookieParser()); // user의 정보를 쿠키에 저장, session 관리
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exteded: true })); // 서버가 유저로부터 전달받은 데이터를 이해
app.use(morgan("dev"));

// app.get("/", handleHome);
// app.get("/profile", handleProfile);

// routes.js 에 정의된 값을 사용하기 위한 미들웨어 생성
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
// /user 경로에 들어오면, userRouter의 모든 경로를 사용(./router 에 정의된 경로)
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; // 다른 곳에서 이 파일을 import 할 때 app object를 전송한다.
