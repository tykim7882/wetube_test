// export const join = (req, res) => res.send("Join");
// export const login = (req, res) => res.send("Login");
// export const logout = (req, res) => res.send("Logout");
// export const users = (req, res) => res.send("users Index");
// export const userDetail = (req, res) => res.send("userDetail");
// export const editProfile = (req, res) => res.send("editProfile");
// export const changePassword = (req, res) => res.send("changePassword");
export const join = (req, res) => res.render("join", { pageTitle: "Join" });
export const login = (req, res) => res.render("login", { pageTitle: "Login" });
export const logout = (req, res) =>
  res.render("logout", { pageTitle: "Logout" });
export const userDetail = (req, res) =>
  res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
