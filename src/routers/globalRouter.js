import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  getLogin,
  postLogin,
  logout,
  getJoin,
  postJoin,
  githubLogin,
  postGithubLogin,
  getMe,
  facebookLogin,
  postFacebookLogin,
  postInstagramLogin,
  instagramLogin,
  kakaoTalkLogin,
  postKakaoTalkLogin,
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";
import passport from "passport";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
// 가입 후 바로 로그인되도록
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.me, getMe);

// GitHub Login

globalRouter.get(routes.github, githubLogin);

globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

// Facebook Login

// globalRouter.get(routes.facebook, facebookLogin);
// globalRouter.get(
//   routes.facebookCallback,
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   postFacebookLogin
// );

// instagram Login

globalRouter.get(routes.instagram, instagramLogin);

globalRouter.get(
  routes.instagramCallback,
  passport.authenticate("instagram", { failureRedirect: "/login" }),
  postInstagramLogin
);

// kakaotalk Login

globalRouter.get(routes.kakaotalk, kakaoTalkLogin);

globalRouter.get(
  routes.kakaoTalkCallback,
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  postKakaoTalkLogin
);

export default globalRouter;
