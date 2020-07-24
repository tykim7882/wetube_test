import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao";
import InstagramStrategy from "passport-instagram";
import User from "./models/User";
import {
  githubLoginCallback,
  kakaoTalkLoginCallback,
  instagramLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

// 로그인하는 방식 설정
passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `https://intense-peak-88035.herokuapp.com${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new InstagramStrategy(
    {
      clientID: process.env.INSTAGRAM_ID,
      clientSecret: process.env.INSTAGRAM_SECRET,
      callbackURL: `https://intense-peak-88035.herokuapp.com${routes.instagramCallback}`,
    },
    instagramLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET, // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
      callbackURL: `./${routes.kakaoTalkCallback}`,
    },
    kakaoTalkLoginCallback
  )
);

// passport 가 쿠키에는 오직 user.id만 담도록
passport.serializeUser(User.serializeUser());
//
passport.deserializeUser(User.deserializeUser());
