// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
const USER_DETAIL = "/:id"; // localhost:4000/users/05B, 변하는 값 (:붙임)
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// Video

const VIDEOS = "/videos";
const UPLOAD_VIDEO = "/upload";
const VIDEO_DETAL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: USER_DETAIL,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD_VIDEO,
  videoDetail: VIDEO_DETAL,
  editVideo: EDIT_VIDEO,
  deleteVideo: DELETE_VIDEO,
};

export default routes;
