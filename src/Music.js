import React from "react";
import "./music.css";
const Music = ({ title, preview, image, albumtitle, next }) => {
  return (
    <>
      <div className="music_content">
        <h1>{title}</h1>
        <img src={image} alt="" className="image" />
        <br />
        <audio controls>
          <source src={preview} type="audio/mp3" />.
        </audio>
        <p>{albumtitle}</p>
        <p>{next}</p>
      </div>
    </>
  );
};
export default Music;
