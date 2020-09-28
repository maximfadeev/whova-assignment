import React from "react";
import { connect } from "react-redux";
import { toggleReply } from "../actions";
import Reply from "./Reply";

class CommentFooter extends React.Component {
  constructor() {
    super();
    this.state = {
      showingReplies: false,
    };
    this.onReplyPress = this.onReplyPress.bind(this);
    this.toggleShowReplies = this.toggleShowReplies.bind(this);
    this.getReplies = this.getReplies.bind(this);
  }

  onReplyPress(e) {
    if (this.props.reply.isReplying && this.props.reply.commentId === this.props.comment.id) {
      this.props.toggleReply({ isReplying: false, commentId: null });
    } else {
      this.props.toggleReply({ isReplying: true, commentId: this.props.comment.id });
    }
  }

  toggleShowReplies() {
    this.setState({ ...this.state, showingReplies: !this.state.showingReplies });
  }

  getReplies() {
    console.log("getReplies", this.props.comment.replies);
    const replies = this.props.comment.replies.map((reply, index) => (
      <Reply key={index} comment={this.props.comment} reply={reply} />
    ));
    return replies;
  }

  render() {
    let replyButtonText;
    if (this.props.reply.isReplying && this.props.comment.id === this.props.reply.commentId) {
      replyButtonText = "Cancel";
    } else {
      replyButtonText = "Reply";
    }

    let repliesText, repliesDisplay;
    if (this.state.showingReplies) {
      repliesText = "Hide";
      repliesDisplay = "replies";
    } else {
      repliesText = "View";
      repliesDisplay = "replies-hidden";
    }
    return (
      <div className='CommentFooter'>
        <div className='likes-replies'>
          <p className='likes-count'>{this.props.comment.likes} likes</p>
          <button className='btn reply-btn' onClick={this.onReplyPress}>
            {replyButtonText}
          </button>
        </div>
        <button className='btn view-replies-btn' onClick={this.toggleShowReplies}>
          {repliesText} replies
        </button>
        <div className={repliesDisplay}>{this.getReplies()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reply: state.toggleReplyReducer.reply,
  comments: state.commentReducer.comments,
});

export default connect(mapStateToProps, { toggleReply })(CommentFooter);
