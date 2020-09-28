import React from "react";
import { connect } from "react-redux";
import { toggleReply } from "../redux/actions";
import Reply from "./Reply";

class CommentFooter extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingReplies: false,
    };

    this.onReplyPress = this.onReplyPress.bind(this);
    this.toggleShowReplies = this.toggleShowReplies.bind(this);
    this.getReplies = this.getReplies.bind(this);
  }

  onReplyPress() {
    const { reply, comment, toggleReply } = this.props;
    if (reply.isReplying && reply.commentId === comment.id) {
      toggleReply({ isReplying: false, commentId: null });
    } else {
      toggleReply({ isReplying: true, commentId: comment.id });
    }
  }

  getReplies() {
    const { comment } = this.props;
    const repliesComponents = comment.replies.map((reply, index) => (
      <Reply key={`${index}, ${comment.id}`} comment={comment} reply={reply} />
    ));
    return repliesComponents;
  }

  toggleShowReplies() {
    this.setState((prevState) => ({ ...prevState, isShowingReplies: !prevState.isShowingReplies }));
  }

  render() {
    const { reply, comment } = this.props;
    const { isShowingReplies } = this.state;
    let replyButtonText;
    if (reply.isReplying && comment.id === reply.commentId) {
      replyButtonText = "Cancel";
    } else {
      replyButtonText = "Reply";
    }
    let repliesText;
    let repliesDisplay;
    if (isShowingReplies) {
      repliesText = "Hide";
      repliesDisplay = "replies";
    } else {
      repliesText = "View";
      repliesDisplay = "replies-hidden";
    }
    return (
      <div className='CommentFooter'>
        <div className='likes-replies'>
          <p className='likes-count'>
            {comment.likes}
            {comment.likes === 1 ? " like" : " likes"}
          </p>
          <button className='btn reply-btn' onClick={this.onReplyPress} type='button'>
            {replyButtonText}
          </button>
        </div>
        <button className='btn view-replies-btn' onClick={this.toggleShowReplies} type='button'>
          {repliesText} {comment.replies.length}
          {comment.replies.length === 1 ? " reply" : " replies"}
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
