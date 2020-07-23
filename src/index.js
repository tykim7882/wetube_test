import express from "express"; // 최신 javascript 로 작성
//const express = require("express");
// reguire : node module 을 어딘가에서 가져옴
// 1. express라는 이름의 파일을 내 파일들에서 찾음
// 2. 없으면 node_modules 폴더에서 찾음
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

const handleListening = () => {
  console.log(`Listening on : http://localhost:${PORT}`);
};

function handleHome(req, res) {
  //   console.log(req);
  res.send("Hello from Home sssseeees!");
}
// arrow function
const handleProfile = (req, res) => res.send("You are on my profile!");

// const middleWare = (req, res, next) => {
//   console.log("This is MiddleWare Func.");
//   next();
// };

// // 하위의 모든 get 에 대한 미들웨어
// app.use(middleWare);
app.use(cookieParser()); // user의 정보를 쿠키에 저장, session 관리
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ exteded: true })); // 서버가 유저로부터 전달받은 데이터를 이해
app.use(helmet());
app.use(morgan("tiny")); //GET /profile 304 - - 2.669 ms
// app.use(morgan("combined"));
// app.use(morgan("dev"));

app.get("/", handleHome);
app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
