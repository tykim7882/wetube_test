// export const join = (req, res) => res.send("Join");
// export const login = (req, res) => res.send("Login");
// export const logout = (req, res) => res.send("Logout");
// export const users = (req, res) => res.send("users Index");
// export const userDetail = (req, res) => res.send("userDetail");
// export const editProfile = (req, res) => res.send("editProfile");
// export const changePassword = (req, res) => res.send("changePassword");
import routes from "../routes";
export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = (req, res) => {
  console.log(req.body);
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    // register user
    // log user in
    res.redirect(routes.home);
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = (req, res) => {
  console.log(req.body);
  res.redirect(routes.home);
};
export const logout = (req, res) => {
  // process log out
  res.redirect(routes.home);
};

export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
