const db = {
  getComments: function () {
    let comments = localStorage.getItem("comments");
    if (comments === null) {
      return [];
    } else {
      return JSON.parse(comments);
    }
  },

  setComments: function (comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
  },

  addComment: function (comment) {
    let comments = db.getComments();
    comments.push(comment);
    db.setComments(comments);
  },

  updateCommentLikes: function (comment) {
    let comments = db.getComments();
    let commentFromDb = comments[comment.id];
    commentFromDb.likes = comment.likes;
    db.setComments(comments);
  },

  addReply: function (reply, commentId) {
    let comments = db.getComments();
    let comment = comments[commentId];
    comment.replies.push(reply);
    db.setComments(comments);
  },

  updateReplyLikes: function (comment, reply) {
    let comments = db.getComments();
    let commentFromDb = comments[comment.id];
    let replyFromDb = commentFromDb.replies[reply.id];
    replyFromDb.likes = reply.likes;
    db.setComments(comments);
  },
};
export default db;
