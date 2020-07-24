import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import aws from "aws-sdk";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  // console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;

  if (password !== password2) {
    eq.flash("error", "Passwords don't match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // register user
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }

    // log user in
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't log in. Check email and/or password!",
});

// Github Login
export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

// 필요없는 prams(accessToken,refreshToken ) 는 명시방법 변경
export const githubLoginCallback = async (_, __, profile, cb) => {
  // console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });

    return cb(null, newUser);
  } catch (error) {
    console.log(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

// // instagram login
export const instagramLogin = passport.authenticate("instagram", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});

export const instagramLoginCallback = async (_, __, profile, cb) => {
  console.log(profile, cb);
  /*
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
  }*/
};

export const postInstagramLogin = (req, res) => {
  res.redirect(routes.home);
};

// kakaotalk Login

export const kakaoTalkLogin = passport.authenticate("kakao", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time",
});
export const kakaoTalkLoginCallback = async (_, __, profile, cb) => {
  console.log(profile, cb);
  const {
    id,
    _json: {
      properties: { nickname: name, profile_image: avatarUrl },
      kakao_account: { email },
    },
  } = profile;

  //console.log(id, name, avatarUrl, email);

  try {
    const user = await User.findOne({ email });

    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }

    const newUser = await User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl,
    });
  } catch (error) {
    return cb(error);
  }
};

export const postKakaoTalkLogin = (req, res) => {
  res.redirect(routes.home);
};

// // npm install -g localtunnel
// //lt -h http://serverless.social -p 4000 (매번 주소가 변경됨)
// export const facebookLogin = passport.authenticate("facebook", {
//   successFlash: "Welcome",
//   failureFlash: "Can't log in at this time",
// });

// export const facebookLoginCallback = async (_, __, profile, cb) => {
//   //console.log(accessToken, refreshToken, profile, cb);
//   const {
//     _json: { id, name, email },
//   } = profile;

//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       user.facebookId = id;
//       user.save();
//       return cb(null, user);
//     }

//     const newUser = await User.create({
//       email,
//       name,
//       facebookId: id,
//       avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
//     });
//   } catch (error) {
//     return cb(error);
//   }
// };

// export const postFacebookLogin = (req, res) => {
//   res.redirect(routes.home);
// };

// //

export const logout = (req, res) => {
  // process log out
  req.flash("info", "Logged out, see you later");
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    req.flash("success", "Profile updated");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't update profile");
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords don't match");
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    req.flash("success", "Password changed");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "Can't change password");
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
