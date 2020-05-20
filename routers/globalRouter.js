import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getLogin,
  postLogin,
  logout,
  getJoin,
  postJoin,
} from "../controllers/userController";
import { onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
// 가입 후 바로 로그인되도록
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPublic, logout);

export default globalRouter;
