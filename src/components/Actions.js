import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faPaperPlane, faBookmark } from "@fortawesome/free-regular-svg-icons";

function Actions() {
  return (
    <div id="Actions">
      <div id="left-actions">
        <FontAwesomeIcon icon={faHeart} size="2x" />
        <FontAwesomeIcon icon={faComment} size="2x" />
        <FontAwesomeIcon icon={faPaperPlane} size="2x" />
      </div>
      <FontAwesomeIcon icon={faBookmark} size="2x" />
    </div>
  );
}

export default Actions;
