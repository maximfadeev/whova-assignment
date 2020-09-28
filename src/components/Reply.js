import React from "react";
import LikeButtonIcon from "./LikeButton";
import { connect } from "react-redux";
import { updateComment } from "../actions";
import db from "../db";

class Reply extends React.Component {
  constructor() {
    super();
    this.toggleLiked = this.toggleLiked.bind(this);
  }

  changeLikes(n) {
    let reply = this.props.reply;
    let comment = this.props.comment;
    reply.likes += n;
    db.updateReplyLikes(comment, reply);
    reply.isReplyLiked = !reply.isReplyLiked;
    this.props.updateComment(comment);
  }

  toggleLiked() {
    if (this.props.reply.isReplyLiked) {
      this.changeLikes(-1);
    } else {
      this.changeLikes(1);
    }
  }

  render() {
    return (
      <div className='Comment'>
        <img src='profile-picture.png' alt='profile' className='user-picture'></img>
        <div className='comment-landscape'>
          <p className='comment-text '>
            <b>{this.props.reply.name}</b>&nbsp;{this.props.reply.text}
          </p>
          <div className='likes-replies'>
            <p className='likes-count'>{this.props.reply.likes} likes</p>
          </div>
        </div>
        <button className='btn like-btn' onClick={this.toggleLiked}>
          <LikeButtonIcon isLiked={this.props.reply.isReplyLiked} />
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  comments: state.commentReducer.comments,
});

// export default Comment;
export default connect(mapStateToProps, { updateComment })(Reply);
