import { useEffect, useState, useRef } from "react";
import unmute from "../assets/soundon.svg";
import mute from "../assets/soundoff.svg";

function Drumkeys(props) {
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const touchHandled = useRef(false);

  const play = (e) => {
    const isTouchEvent = e && e.type === "touchstart";
  
    if (!isMuted) {
      const audio = new Audio(props.sound);
  
      if (!playing || !isTouchEvent) {
        setPlaying(true);
        audio.play();
  
        audio.onended = () => {
          setPlaying(false);
        };
      } else {
        if (isTouchEvent && !touchHandled.current) {
          audio.currentTime = 0;
          audio.play();
        }
      }
    }
  
    if (isTouchEvent && e.cancelable) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const drumIconActive = document.getElementById(`drum-icons ${props.name}`);
    
    const handleKeyDown = (e) => {
      if (!isMuted && e.key.toLowerCase() === props.letter.toLowerCase()) {
        play();
        drumIconActive.classList.add("low-opacity");
      }
      if (e.key === " ") {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key.toLowerCase() === props.letter.toLowerCase()) {
        drumIconActive.classList.remove("low-opacity");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [props.isMute]);

  const toggleMute = (e) => {
    props.toggleMute();
    e.stopPropagation();
  };

  const handleTouchEnd = (e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    touchHandled.current = false;
  };

  return (
    <div className={`drum ${playing}`} onClick={play} onTouchStart={play} onTouchEnd={handleTouchEnd}>
      <div id={`drum-icons ${props.name}`} className="drum-icons">{props.icon}</div>
      <div className="key-icons">{props.keyIcon}</div>
      <div className="speaker-audio" onClick={toggleMute} onTouchStart={toggleMute}>
      {props.isMute ? <img className="mute" src={unmute} alt="mute" /> : <img className="unmute" src={mute} alt="unmute" />}
      </div> 
    </div>
  );
}

export default Drumkeys;





