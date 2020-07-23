import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import InstagramStrategy from "passport-instagram";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {
  githubLoginCallback,
  facebookLoginCallback,
  instagramLoginCallback,
  kakaoTalkLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

// 로그인하는 방식 설정
passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FB_ID,
//       clientSecret: process.env.FB_SECRET,
//       callbackURL: `http://localhost:4000${routes.facebookCallback}`,
//       profileFields: ["id", "displayName", "photos", "email"],
//       scope: ["pubilc_profile", "email"],
//     },
//     facebookLoginCallback
//   )
// );

// passport.use(
//   new InstagramStrategy(
//     {
//       clientID: process.env.INSTAGRAM_ID,
//       clientSecret: process.env.INSTAGRAM_SECRET,
//       callbackURL: `http://localhost:4000${routes.instagramCallback}`,
//     },
//     instagramLoginCallback
//   )
// );

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: `http://localhost:4000${routes.kakaoTalkCallback}`,
    },
    kakaoTalkLoginCallback
  )
);

// passport 가 쿠키에는 오직 user.id만 담도록
passport.serializeUser(User.serializeUser());
//
passport.deserializeUser(User.deserializeUser());
