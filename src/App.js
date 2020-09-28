import React from "react";
import "./App.css";
import { connect } from "react-redux";
import Header from "./components/Header";
import Actions from "./components/Actions";
import Comment from "./components/Comment";
import PostComment from "./components/PostComment";
import { getCommentsFromDb, toggleLandscape, toggleReply } from "./redux/actions";

class App extends React.Component {
  componentDidMount() {
    const { getCommentsFromDb } = this.props;
    getCommentsFromDb();
  }

  onViewBtnClick = () => {
    const { toggleLandscape, toggleReply } = this.props;
    toggleLandscape();
    toggleReply({ isReplying: false, commentId: null });
  };

  render() {
    const { isLandscape, comments } = this.props;
    const hours = <p className='info-text hours'>14 hours ago</p>;
    const viewHide = isLandscape ? "Hide" : "View";
    let commentComponents = comments.map((comment, index) => (
      <Comment key={index} comment={comment} />
    ));

    // if vertical only show 4 comments
    if (!isLandscape) commentComponents = commentComponents.slice(Math.max(comments.length - 4, 0));

    if (!isLandscape) {
      return (
        <div className='center'>
          <div className='App vertical'>
            <Header />
            <img id='post-image' src='sample-post.jpg' alt='sample-post' />
            <Actions />
            <b>
              <p className='info-text'>54 likes</p>
            </b>
            <div className='comments-vertical'>
              <div className='Comment'>
                <p className='comment-text'>
                  <b>nasa</b>&nbsp;Starry night
                </p>
              </div>
              <button className='view-comments-btn btn' onClick={this.onViewBtnClick} type='button'>
                <b>
                  {viewHide} all {comments.length}
                  {comments.length === 1 ? " comment" : " comments"}
                </b>
              </button>
              {commentComponents}
            </div>
            {hours}
            <PostComment />
          </div>
        </div>
      );
    }
    return (
      <div className='center'>
        <div className='App landscape'>
          <div id='post-image-wrap'>
            <img id='post-image' src='sample-post.jpg' alt='sample-post' />
          </div>
          <div className='landscape-right'>
            <Header />
            <div className='comments-landscape'>
              <div className='comment-landscape'>
                <img src='nasa-profile.png' alt='profile' className='poster-picture' />
                <div className='comment-and-reply'>
                  <div className='Comment'>
                    <p className='comment-text'>
                      <b>nasa</b>&nbsp;Starry night
                    </p>
                  </div>
                </div>
              </div>

              <button className='view-comments-btn btn' onClick={this.onViewBtnClick} type='button'>
                <b>
                  {viewHide} all {comments.length}
                  {comments.length === 1 ? " comment" : " comments"}
                </b>
              </button>
              {commentComponents}
            </div>
            <Actions />
            <b>
              <p className='info-text'>54 likes</p>
            </b>
            {hours}
            <PostComment />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.commentReducer.comments,
  isLandscape: state.toggleLandscapeReducer.isLandscape,
  reply: state.toggleReplyReducer.reply,
});

export default connect(mapStateToProps, { getCommentsFromDb, toggleLandscape, toggleReply })(App);
