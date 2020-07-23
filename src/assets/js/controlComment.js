import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteBtn = document.querySelectorAll(".video__comments_delBtn");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment, commentId) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const a = document.createElement("a");
  a.classList.add("video__comments_delBtn");
  a.id = commentId;
  a.innerHTML = "X";
  span.innerHTML = comment;
  li.appendChild(a);
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();

  const newComment = document.getElementById(commentId);
  newComment.addEventListener("click", handleDeleteComment);
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    //console.log(response.data);
    addComment(comment, response.data);
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = (commentId) => {
  const parentEl = document.getElementById(commentId);
  parentEl.parentElement.remove();
  decreaseNumber();
};

const sendDeleteComment = async (commentId) => {
  const videoId = window.location.href.split("/videos/")[1];
  console.log(videoId, commentId);
  const response = await axios({
    url: `/api/${videoId}/deleteComment`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    deleteComment(commentId);
  }
};

const handleDeleteComment = (event) => {
  event.preventDefault();
  //console.log(event.target.id);
  sendDeleteComment(event.target.id);
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);

  for (var i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener("click", handleDeleteComment);
  }
}

if (addCommentForm) {
  init();
}
