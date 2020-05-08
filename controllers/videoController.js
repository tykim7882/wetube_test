// export const home = (req, res) => res.send("Home");
export const home = (req, res) => res.render("home", { pageTitle: "Home" }); //veiws/home.pug 를 찾는다
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
  res.render("search", { pageTitle: "Search", searchingBy }); // 정의한 값과 전달대상값이 같으면 생략 가능
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
