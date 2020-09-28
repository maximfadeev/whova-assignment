import React from "react";
import "./App.css";
import Header from "./components/Header";
import Actions from "./components/Actions";
import Comment from "./components/Comment";
import PostComment from "./components/PostComment";

import { connect } from "react-redux";
import { getCommentsFromDb, toggleLandscape } from "./actions";

class App extends React.Component {
  componentDidMount() {
    this.props.getCommentsFromDb();
  }

  getCommentsBeta() {
    const comments = this.props.comments.map((comment, index) => (
      <Comment key={index} comment={{ ...comment }} />
    ));
    return comments;
  }

  render() {
    const hours = <p className="info-text hours">14 hours ago</p>;

    let comments = this.props.comments;
    if (this.props.isLandscape) {
      comments = comments.map((comment, index) => <Comment key={index} comment={comment} />);
    } else {
      comments = comments
        .slice(Math.max(comments.length - 4, 0))
        .map((comment, index) => <Comment key={index} comment={comment} />);
    }

    if (!this.props.isLandscape) {
      return (
        <div className="center">
          <div className="App vertical">
            <Header />
            <img id="post-image" src="sample-post.jpg" alt="sample-post"></img>
            <Actions />
            <b>
              <p className="info-text">56 likes</p>
            </b>

            <div className="comments-vertical">
              <div className="Comment">
                <p className="comment-text">
                  <b>nasa</b>&nbsp;Starry night
                </p>
              </div>
              <button className="view-comments-btn btn" onClick={this.props.toggleLandscape}>
                <b>View all {this.props.comments.length} comments</b>
              </button>
              {/* {this.getCommentsBeta()} */}
              {comments}
            </div>

            {hours}

            <PostComment />
          </div>
        </div>
      );
    } else {
      return (
        <div className="center">
          <div className="App landscape">
            <div id="post-image-wrap">
              <img id="post-image" src="sample-post.jpg" alt="sample-post"></img>
            </div>
            <div className="landscape-right">
              <Header />

              <div className="comments-landscape">
                <div className="Comment">
                  <img src="nasa-profile.png" alt="profile" className="poster-picture"></img>
                  <div className="comment-landscape">
                    <p className="comment-text ">
                      <b>nasa</b>&nbsp;Starry night
                    </p>
                  </div>
                </div>
                <button className="view-comments-btn btn" onClick={this.props.toggleLandscape}>
                  <b>Hide all {this.props.comments.length} comments</b>
                </button>
                {/* {this.getCommentsBeta()} */}
                {comments}
              </div>
              <Actions />
              <b>
                <p className="info-text">56 likes</p>
              </b>
              {hours}

              <PostComment />
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  comments: state.commentReducer.comments,
  isLandscape: state.toggleLandscapeReducer.isLandscape,
});

export default connect(mapStateToProps, { getCommentsFromDb, toggleLandscape })(App);
