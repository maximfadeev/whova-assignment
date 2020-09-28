import React from "react";
// import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <div id="Header">
      <div className="Avatar">
        <img src="nasa-profile.png" alt="profile" className="poster-picture"></img>
        <div id="profile-info">
          <b>
            <p className="profile-text">nasa</p>
          </b>
          <p className="profile-text location-text">Milky Way</p>
        </div>
      </div>{" "}
      <div className="icon">
        <FontAwesomeIcon icon={faEllipsisH} />
      </div>
    </div>
  );
}

export default Header;
