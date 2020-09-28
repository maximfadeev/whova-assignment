const db = {
  getComments() {
    const comments = JSON.parse(localStorage.getItem("comments"));
    if (comments === null) {
      return [];
    }

    // check each comment to make sure they are all in the right format
    let i = comments.length;
    while (i--) {
      const comment = comments[i];
      if (
        !("name" in comment) ||
        !("text" in comment) ||
        !("likes" in comment) ||
        !("replies" in comment) ||
        !("id" in comment)
      ) {
        comments.splice(i, 1);
      }
    }
    return comments;
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
