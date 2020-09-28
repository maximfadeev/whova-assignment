import React from "react";
import { connect } from "react-redux";
import { addComment, updateComment, toggleReply, changePostCommentValue } from "../actions";
import db from "../db";

class PostComment extends React.Component {
  constructor() {
    super();

    this.onTextChange = this.onTextChange.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onReplySubmit = this.onReplySubmit.bind(this);
  }

  onTextChange(event) {
    this.props.changePostCommentValue(event.target.value);
  }

  onCommentSubmit(e) {
    e.preventDefault();
    let newComment = {
      name: "username",
      text: this.props.value,
      likes: 0,
      replies: [],
      id: this.props.comments.length,
    };

    db.addComment(newComment);
    newComment.isLiked = false;
    this.props.addComment(newComment);
    this.props.changePostCommentValue("");
  }

  onReplySubmit(e) {
    e.preventDefault();
    const comment = this.props.comments[this.props.reply.commentId];
    let replyId = comment.replies.length;

    let newReply = {
      name: "username",
      text: this.props.value,
      likes: 0,
      id: replyId,
    };

    db.addReply(newReply, comment.id);
    newReply.isReplyLiked = false;
    comment.replies.push(newReply);

    this.props.updateComment(comment);
    this.props.toggleReply({ isReplying: false, commentId: null });
    this.props.changePostCommentValue("");
  }

  render() {
    const btnDisabled = this.props.value.length === 0;
    if (this.props.reply.isReplying) {
      return (
        <form id='PostComment' onSubmit={this.onReplySubmit}>
          <textarea
            type='text'
            className='post-comment-input'
            placeholder='Add a comment...'
            value={this.props.value}
            onChange={this.onTextChange}
          ></textarea>
          <button type='submit' className='post-comment-btn btn' disabled={btnDisabled}>
            <b>Reply</b>
          </button>
        </form>
      );
    }
    return (
      <form id='PostComment' onSubmit={this.onCommentSubmit}>
        <textarea
          type='text'
          className='post-comment-input'
          placeholder='Add a comment...'
          value={this.props.value}
          onChange={this.onTextChange}
        ></textarea>
        <button type='submit' className='post-comment-btn btn' disabled={btnDisabled}>
          <b>Post</b>
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
