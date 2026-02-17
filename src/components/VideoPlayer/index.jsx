import ReactPlayer from "react-player";
import screenfull from "screenfull";
import {
  playIcon,
  back15Icon,
  front15Icon,
  volumeIcon,
  fullScreenIcon,
  pauseIcon,
} from "../../constants/assets";
import styles from "./videoPlayer.module.css";
import { useRef, useState } from "react";

function VideoPlayer({ url, title, desc }) {
  const [isPlaying, setPlay] = useState(false);
  const [isMuted, setMute] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const ref = useRef(null);
  const containerRef = useRef(null);

  const handleMouseEnter = () => {
    setHideControls(false);
  };
  const handleMouseLeave = () => {
    setHideControls(true);
  };
  const handleMouseMove = () => {
    setHideControls(false);
    if (isPlaying) {
      setTimeout(() => {
        setHideControls(true);
      }, 1500);
    }
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handleVideoSeek(ref.current.getCurrentTime() / ref.current.getDuration());
      setHideControls(false);
    }
    setPlay(!isPlaying);
  };

  const handleRewind = () => {
    ref.current.seekTo(ref.current.getCurrentTime() - 15, "seconds");
  };

  const handleForward = () => {
    ref.current.seekTo(ref.current.getCurrentTime() + 15, "seconds");
  };

  const handleMute = () => {
    setMute(!isMuted);
  };

  const handleFullScreen = () => {
    screenfull.toggle(containerRef.current);
  };

  const handleSeekbarChange = (e) => {
    ref.current.seekTo(
      (e.target.value * ref.current.getDuration()) / 100,
      "seconds"
    );
    setVideoProgress(e.target.value);
  };

  const handleVideoSeek = (played) => {
    setVideoProgress(played * 100);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        ref={ref}
        playing={isPlaying}
        muted={isMuted}
        progressInterval={100}
        onProgress={(state) => handleVideoSeek(state.played)}
        onEnded={() => setPlay(false)}
      />
      <div
        className={`${styles.controlsBar} ${
          hideControls ? styles.hideControls : ""
        }`}
      >
        <h2>{title}</h2>
        <p>{desc}</p>
        <div className={styles.seekbarContainer}>
          <input
            className={styles.seekbar}
            type="range"
            value={videoProgress}
            onChange={(e) => {
              handleSeekbarChange(e);
            }}
          />
        </div>
        <div className={styles.controlBtns}>
          <div className={styles.leftBtns}>
            <button onClick={handlePlayPause}>
              <img
                src={!isPlaying ? playIcon : pauseIcon}
                alt="play-pause-btn"
                height={25}
                width={25}
              />
            </button>
            <button onClick={handleRewind}>
              <img src={back15Icon} alt="back-15-btn" />
            </button>
            <button onClick={handleForward}>
              <img src={front15Icon} alt="front-15-btn" />
            </button>
          </div>
          <div className={styles.rightBtns}>
            <button onClick={handleMute}>
              {/* add volumeMuteIcon after ':' */}
              <img src={!isMuted ? volumeIcon : volumeIcon} alt="volume-btn" />
            </button>
            <button onClick={handleFullScreen}>
              <img src={fullScreenIcon} alt="full-screen-btn" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
