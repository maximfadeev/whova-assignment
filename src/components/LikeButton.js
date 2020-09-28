import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as hollowHeart } from "@fortawesome/free-regular-svg-icons";

function LikeButtonIcon(props) {
  const { isLiked } = props;
  if (isLiked) {
    return <FontAwesomeIcon className='like-btn-landscape like-btn liked' icon={solidHeart} />;
  }
  return <FontAwesomeIcon className='like-btn-landscape like-btn' icon={hollowHeart} />;
}

export default LikeButtonIcon;
