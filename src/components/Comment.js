import React from "react";
import { connect } from "react-redux";
import LikeButtonIcon from "./LikeButton";
import CommentFooter from "./CommentFooter";
import { updateComment, toggleLandscape } from "../redux/actions";
import db from "../db";

class Comment extends React.Component {
  toggleLiked = () => {
    const { comment } = this.props;
    if (comment.isLiked) {
      this.changeLikes(-1);
    } else {
      this.changeLikes(1);
    }
  };

  getAvatar = () => {
    const { isLandscape, comment } = this.props;
    if (!isLandscape) {
      return [
        <p className='comment-text'>
          <b>{comment.name}</b>&nbsp;{comment.text}
        </p>,
        <button className='btn like-btn ' onClick={this.toggleLiked} type='button'>
          <LikeButtonIcon isLiked={comment.isLiked} />
        </button>,
      ];
    }
    return [
      <img src='profile-picture.png' alt='profile' className='user-picture' />,
      <div className='comment-landscape'>
        <p className='comment-text'>
          <b>{comment.name}</b>&nbsp;{comment.text}
        </p>
        <button className='btn like-btn ' onClick={this.toggleLiked} type='button'>
          <LikeButtonIcon isLiked={comment.isLiked} />
        </button>
        <CommentFooter comment={comment} />
      </div>,
    ];
  };

  changeLikes(n) {
    const { comment, updateComment } = this.props;

    // update comment likes in db then in state
    comment.likes += n;
    db.updateCommentLikes(comment);
    comment.isLiked = !comment.isLiked;
    updateComment(comment);
  }

  render() {
    const { isLandscape, comment } = this.props;
    if (!isLandscape) {
      return (
        <div className='Comment'>
          <p className='comment-text'>
            <b>{comment.name}</b>&nbsp;{comment.text}
          </p>
          <button className='btn like-btn ' onClick={this.toggleLiked} type='button'>
            <LikeButtonIcon isLiked={comment.isLiked} />
          </button>
        </div>
      );
    }
    return (
      <div className='comment-landscape'>
        <img src='profile-picture.png' alt='profile' className='user-picture' />
        <div className='comment-and-reply'>
          <div className='Comment'>
            <p className='comment-text'>
              <b>{comment.name}</b>&nbsp;{comment.text}
            </p>
            <button className='btn like-btn ' onClick={this.toggleLiked} type='button'>
              <LikeButtonIcon isLiked={comment.isLiked} />
            </button>
          </div>
          <CommentFooter comment={comment} />
        </div>
      </div>
    );
  } // const { comment } = this.props;  }
}
const mapStateToProps = (state) => ({
  comments: state.commentReducer.comments,
  isLandscape: state.toggleLandscapeReducer.isLandscape,
});

// export default Comment;
export default connect(mapStateToProps, { updateComment, toggleLandscape })(Comment);
