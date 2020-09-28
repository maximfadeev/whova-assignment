import React from "react";
import { connect } from "react-redux";
import { addComment, updateComment, toggleReply, changePostCommentValue } from "../redux/actions";
import db from "../db";

class PostComment extends React.Component {
  onTextChange = (event) => {
    const { changePostCommentValue } = this.props;
    changePostCommentValue(event.target.value);
  };

  onCommentSubmit = (event) => {
    const { value, comments, addComment, changePostCommentValue } = this.props;
    const newComment = {
      name: "username",
      text: value,
      likes: 0,
      replies: [],
      id: comments.length,
    };

    // add comment to db, then add isLiked item, then add to state
    db.addComment(newComment);
    newComment.isLiked = false;
    addComment(newComment);

    // clear post comment text
    changePostCommentValue("");

    event.preventDefault();
  };

  onReplySubmit = (event) => {
    const {
      comments,
      reply,
      value,
      updateComment,
      toggleReply,
      changePostCommentValue,
    } = this.props;
    const comment = comments[reply.commentId];
    const replyId = comment.replies.length;

    const newReply = {
      name: "username",
      text: value,
      likes: 0,
      id: replyId,
    };

    // add reply to db, then add isLiked item, then add to state
    db.addReply(newReply, comment.id);
    newReply.isReplyLiked = false;
    comment.replies.push(newReply);
    updateComment(comment);

    // change the state of isReplying for postComment
    toggleReply({ isReplying: false, commentId: null });

    // clear post comment text
    changePostCommentValue("");

    event.preventDefault();
  };

  render() {
    const { value, reply } = this.props;
    const btnDisabled = value.length === 0;
    return (
      <form
        id='PostComment'
        onSubmit={reply.isReplying ? this.onReplySubmit : this.onCommentSubmit}
      >
        <textarea
          type='text'
          className='post-comment-input'
          placeholder='Add a comment...'
          value={value}
          onChange={this.onTextChange}
        />
        <button type='submit' className='post-comment-btn btn' disabled={btnDisabled}>
          <b>{reply.isReplying ? "Reply" : "Post"}</b>
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.commentReducer.comments,
    reply: state.toggleReplyReducer.reply,
    value: state.postCommentValueReducer.value,
  };
};

export default connect(mapStateToProps, {
  addComment,
  updateComment,
  toggleReply,
  changePostCommentValue,
})(PostComment);
