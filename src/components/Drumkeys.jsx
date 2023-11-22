import { useEffect, useState } from "react";
import unmute from "../assets/soundon.svg";
import mute from "../assets/soundoff.svg";

function Drumkeys(props) {
  const [playing, setPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const play = () => {
    if (!isMuted) {
      setPlaying(true);

      const audio = new Audio(props.sound);
      audio.play();

      audio.onended = () => {
        setPlaying(false);
      };
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

  return (
    <div className={`drum ${playing}`} onClick={play}>
      <div id={`drum-icons ${props.name}`} className="drum-icons">{props.icon}</div>
      <div className="key-icons">{props.keyIcon}</div>
      <div className="speaker-audio" onClick={toggleMute}>
        {props.isMute ? <img className="mute" src={mute} alt="Mute" /> : <img className="unmute" src={unmute} alt="Unmute" />}
      </div> 
    </div>
  );
}

export default Drumkeys;





