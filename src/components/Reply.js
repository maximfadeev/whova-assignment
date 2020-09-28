import React from "react";
import { connect } from "react-redux";
import LikeButtonIcon from "./LikeButton";
import { updateComment } from "../redux/actions";
import db from "../db";

class Reply extends React.Component {
  toggleLiked = () => {
    const { reply } = this.props;
    if (reply.isReplyLiked) {
      this.changeLikes(-1);
    } else {
      this.changeLikes(1);
    }
  };

  changeLikes(n) {
    const { reply, comment, updateComment } = this.props;

    // update reply likes in db then in state
    reply.likes += n;
    db.updateReplyLikes(comment, reply);
    reply.isReplyLiked = !reply.isReplyLiked;
    updateComment(comment);
  }

  //   <div className='reply-landscape'>
  //   <img src='profile-picture.png' alt='profile' className='user-picture' />
  //   <div className='comment-and-reply'>
  //     <div className='Comment'>
  //       <p className='comment-text'>
  //         <b>{reply.name}</b>&nbsp;{reply.text}
  //       </p>
  //     </div>
  //   </div>
  //   <button className='btn like-btn' onClick={this.toggleLiked} type='button'>
  //     <LikeButtonIcon isLiked={reply.isReplyLiked} />
  //   </button>
  // </div>

  render() {
    const { reply } = this.props;
    return (
      <div className='reply-landscape'>
        <img src='profile-picture.png' alt='profile' className='user-picture' />
        <div className='comment-and-reply'>
          <div className='Comment'>
            <p className='comment-text'>
              <b>{reply.name}</b>&nbsp;{reply.text}
            </p>
          </div>
          <div className='likes-replies'>
            <p className='likes-count'>
              {reply.likes} {reply.likes === 1 ? " like" : " likes"}
            </p>
          </div>
        </div>
        <button className='btn like-btn' onClick={this.toggleLiked} type='button'>
          <LikeButtonIcon isLiked={reply.isReplyLiked} />
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
