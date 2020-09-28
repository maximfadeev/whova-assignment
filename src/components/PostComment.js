import React from "react";
import { connect } from "react-redux";
import { addComment, setLikes, setReplyIsLiked } from "../actions";
import db from "../db";

class PostComment extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
    };

    this.onTextChange = this.onTextChange.bind(this);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onReplySubmit = this.onReplySubmit.bind(this);
  }

  onTextChange(event) {
    this.setState({ value: event.target.value });
  }

  onCommentSubmit(e) {
    e.preventDefault();
    let newComment = {
      name: "username",
      text: this.state.value,
      likes: 0,
      replies: [],
      id: this.props.comments.length,
    };

    db.addComment(newComment);
    newComment.isLiked = false;
    this.props.addComment(newComment);
    this.setState({ value: "" });
  }

  onReplySubmit(e) {
    e.preventDefault();
    const comment = this.props.comments[this.props.reply.commentId];
    let replyId = comment.replies.length;

    let newReply = {
      name: "username",
      text: this.state.value,
      likes: 0,
      id: replyId,
    };

    db.addReply(newReply, comment.id);
    newReply.isReplyLiked = false;
    comment.replies.push(newReply);
    this.props.setReplyIsLiked(comment);
    this.setState({ value: "" });
  }

  render() {
    const btnDisabled = this.state.value.length === 0;
    if (this.props.reply.isReplying) {
      return (
        <form id='PostComment' onSubmit={this.onReplySubmit}>
          <textarea
            type='text'
            className='post-comment-input'
            placeholder='Add a comment...'
            value={this.state.value}
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
          value={this.state.value}
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
    // commentText: state.setCommentText.commentText,
    comments: state.commentReducer.comments,
    reply: state.toggleReplyReducer.reply,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onTextChange: (e) => dispatch(setCommentText(e.target.value)),
    // clearComment: () => dispatch(setCommentText("")),
    // postCommentToDb: (comment) => {
    //   dispatch(addComment(comment));
    // },
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(PostComment);
export default connect(mapStateToProps, { addComment, setLikes, setReplyIsLiked })(PostComment);
