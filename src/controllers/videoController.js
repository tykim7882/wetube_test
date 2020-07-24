import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import aws from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

// export const home = (req, res) => res.send("Home");
export const home = async (req, res) => {
  try {
    // javascript 는 한번에 많은 일을 할 수 있기 때문에
    // 이 곳에서 시간이 걸리는 작업이 있더라도 기다리지 않고
    // 다음 작업(render) 실행, async 를 추가해야 선작업이 끝난 후 진행
    const videos = await Video.find({}).sort({ _id: -1 }); // await: 작업이 끝날때까지 대기시킴 / find: db에 있는 모든 VIdoe를 가져옴
    //console.log(videos);
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
    file: { location },
  } = req;

  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  // todo : uplaod and save video
  //console.log(newVideo);
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  // console.log(req.params);
  // req.params.id => routes.js 의 :id 의 명칭으로 진행됨
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    //console.log(video);
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
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
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
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndDelete({ _id: id });

      console.log("here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~" + id);
      const file_url = video.fileUrl.split("/"); // video에 저장된 fileUrl을 가져옴
      const delFileName = url[url.length - 1]; // 버킷에 저장된 객체 URL만 가져옴

      const s3 = new aws.S3({
        accessKeyId: process.env.SSS_AWS_KEY,
        secretAccessKey: process.env.SSS_AWS_PRIVATE_KEY,
      });

      const params_s3 = {
        Bucket: "wetube-final/video",
        Key: delFileName, //if any sub folder-> path/of/the/folder.ext
      };

      await s3.headObject(params_s3).promise();
      console.log("File Found in S3");
      try {
        //await s3.deleteObject(params_s3).promise();
        //console.log("file deleted Successfully");
        s3.deleteObject(params_s3, function (err, data) {
          if (err) {
            console.log("aws video delete error");
            console.log(err, err.stack);
            res.redirect(routes.home);
          } else {
            console.log("aws video delete success" + data);
          }
        });
      } catch (err) {
        console.log("ERROR in file Deleting : " + JSON.stringify(err));
      }

      console.log("here~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~2");
    }
    // db삭제가 성공하면 해당 경로의 파일도 삭제
    // fs.unlink(`${video.fileUrl}`, (err) => {
    //   if (err) throw err;
    //   console.log(`${video.fileUrl} was deleted!!`);
    // });
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
  res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();

    res.writeHead(200, {
      "Content-Type": "text/json",
    });
    res.write(JSON.stringify(newComment.id));
    res.end();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

// deletecomment
export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
    user,
  } = req;
  console.log(id, commentId);

  try {
    const video = await Video.findById(id);
    const comments = await Comment.findById(commentId);

    if (String(comments.creator) !== req.user.id) {
      throw Error();
    } else {
      await Comment.findOneAndDelete({ _id: commentId });
    }
    video.comments.pull(commentId);
    video.save();
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
