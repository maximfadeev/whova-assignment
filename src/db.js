const db = {
  getComments() {
    const comments = localStorage.getItem("comments");
    if (comments === null) {
      return [];
    }
    return JSON.parse(comments);
  },

  setComments(comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
  },

  addComment(comment) {
    const comments = db.getComments();
    comments.push(comment);
    db.setComments(comments);
  },

  updateCommentLikes(comment) {
    const comments = db.getComments();
    const commentFromDb = comments[comment.id];
    commentFromDb.likes = comment.likes;
    db.setComments(comments);
  },

  addReply(reply, commentId) {
    const comments = db.getComments();
    const comment = comments[commentId];
    comment.replies.push(reply);
    db.setComments(comments);
  },

  updateReplyLikes(comment, reply) {
    const comments = db.getComments();
    const commentFromDb = comments[comment.id];
    const replyFromDb = commentFromDb.replies[reply.id];
    replyFromDb.likes = reply.likes;
    db.setComments(comments);
  },
};
export default db;
