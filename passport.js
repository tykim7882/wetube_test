import passport from "passport";
import User from "./models/User";

// 로그인하는 방식 설정
passport.use(User.createStrategy());

// passport 가 쿠키에는 오직 user.id만 담도록
passport.serializeUser(User.serializeUser());
//
passport.deserializeUser(User.deserializeUser());
