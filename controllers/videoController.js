// import { videos } from "../db";
import routes from "../routes";
import Video from "../models/Video";

// export const home = (req, res) => res.send("Home");
export const home = async (req, res) => {
  try {
    // javascript 는 한번에 많은 일을 할 수 있기 때문에
    // 이 곳에서 시간이 걸리는 작업이 있더라도 기다리지 않고
    // 다음 작업(render) 실행, async 를 추가해야 선작업이 끝난 후 진행
    const videos = await Video.find({}); // await: 작업이 끝날때까지 대기시킴 / find: db에 있는 모든 VIdoe를 가져옴
    console.log(videos);
    // throw Error("lalalalal");
    res.render("home", { pageTitle: "Home", videos }); //veiws/home.pug 를 찾는다
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

// export const search = (req, res) => res.send("Search");
// export const videos = (req, res) => res.send("Video index");
// export const upload = (req, res) => res.send("upload");
// export const videoDetail = (req, res) => res.send("videoDetail");
// export const editVideo = (req, res) => res.send("editVideo");
// export const deleteVideo = (req, res) => res.send("deleteVideo");
export const search = (req, res) => {
  //   console.log(req.query);
  //const {query:{term}} = req;
  const {
    query: { term: searchingBy },
  } = req; // searchingBy 라는 값으로 정의
  //res.render("search", { pageTitle: "Search", searchingBy: searchingBy });
  res.render("search", { pageTitle: "Search", searchingBy, videos }); // 정의한 값과 전달대상값이 같으면 생략 가능
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  // console.log(req.body);
  // const {
  //   body: { file, title, description }
  // } = req;
  //console.log(req);

  const {
    body: { title, discription },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    discription,
  });
  // todo : uplaod and save video
  // res.render("upload", { pageTitle: "Upload" });
  //res.redirect(routes.videoDetail(100005));
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
