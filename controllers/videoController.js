import routes from "../routes";
import Video from "../models/Video";

// export const home = (req, res) => res.send("Home");
export const home = async (req, res) => {
  try {
    // javascript 는 한번에 많은 일을 할 수 있기 때문에
    // 이 곳에서 시간이 걸리는 작업이 있더라도 기다리지 않고
    // 다음 작업(render) 실행, async 를 추가해야 선작업이 끝난 후 진행
    const videos = await Video.find({}).sort({ _id: -1 }); // await: 작업이 끝날때까지 대기시킴 / find: db에 있는 모든 VIdoe를 가져옴
    console.log(videos);
    // throw Error("lalalalal");
    res.render("home", { pageTitle: "Home", videos }); //veiws/home.pug 를 찾는다
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  //   console.log(req.query);
  //const {query:{term}} = req;
  const {
    query: { term: searchingBy },
  } = req; // searchingBy 라는 값으로 정의

  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    }); // $options: "i"  insensitive
  } catch (error) {
    console.log(error);
  }

  //res.render("search", { pageTitle: "Search", searchingBy: searchingBy });
  res.render("search", { pageTitle: "Search", searchingBy, videos }); // 정의한 값과 전달대상값이 같으면 생략 가능
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  // todo : uplaod and save video
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  // console.log(req.params);
  // req.params.id => routes.js 의 :id 의 명칭으로 진행됨
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    console.log(video);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// edit 하기 전 정보를 세팅
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// edit 할 내용으로 업데이트
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    // res.render("editVideo", { pageTitle: "Edit Video" });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

const fs = require("fs");

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    console.log(video); // video.fileUrl
    console.log(video.fileUrl);

    await Video.findOneAndDelete({ _id: id });

    // db삭제가 성공하면 해당 경로의 파일도 삭제
    fs.unlink(`${video.fileUrl}`, (err) => {
      if (err) throw err;
      console.log(`${video.fileUrl} was deleted!!`);
    });

    // res.render("deleteVideo", { pageTitle: "Delete Video" });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
