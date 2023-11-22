import React, {useState} from 'react';
import Drumkeys from './Drumkeys';
import tomOneSound from "../assets/sounds/tom-1.wav";
import tomTwoSound from "../assets/sounds/tom-2.wav";
import hiHatSound from "../assets/sounds/hihat.wav";
import kickSound from "../assets/sounds/kick.wav";
import crashSound from "../assets/sounds/crash.wav";
import rideSound from "../assets/sounds/ride.wav";
import snareSound from "../assets/sounds/snare.wav";
import splashSound from "../assets/sounds/splash.wav";
import floorTomSound from "../assets/sounds/floor-tom.wav";

import tomOne from "../assets/drumicons/Tom-1.svg";
import tomTwo from "../assets/drumicons/Tom-2.svg";
import hiHat from "../assets/drumicons/Hi-Hat.svg";
import kick from "../assets/drumicons/Kick.svg";
import crash from "../assets/drumicons/Crash.svg";
import ride from "../assets/drumicons/Ride.svg";
import snare from "../assets/drumicons/Snare.svg";
import splash from "../assets/drumicons/Splash.svg";
import floorTom from "../assets/drumicons/Floor.svg";

import gKey from "../assets/keyicons/G-Key.svg";
import hKey from "../assets/keyicons/H-Key.svg";
import fKey from "../assets/keyicons/F-Key.svg";
import spacebarKey from "../assets/keyicons/Spacebar-Key.svg";
import tKey from "../assets/keyicons/T-Key.svg";
import uKey from "../assets/keyicons/U-Key.svg";
import vKey from "../assets/keyicons/V-Key.svg";
import yKey from "../assets/keyicons/Y-Key.svg";
import jKey from "../assets/keyicons/J-Key.svg";

import unmute from "../assets/soundon.svg";
import mute from "../assets/soundoff.svg";


function Drumkit() {
    const [sounds, setSounds] = useState([
        {
            name: "kick",
            sound: kickSound,
            key: " ",
            icon: <img className="kick" src={kick} alt="Kick" />,
            keyIcon: <img className="spacebar-key" src={spacebarKey} alt="Use Spacebar key for Kick" />,
        },
        {
            name: "floor-tom",
            sound: floorTomSound,
            key: "J",
            icon: <img className="floor-tom" src={floorTom} alt="Floor Tom" />,
            keyIcon: <img className="j-key" src={jKey} alt="Use J key for Floor Tom" />,
        },
        {
            name: "snare",
            sound: snareSound,
            key: "V",
            icon: <img className="snare" src={snare} alt="Snare" />,
            keyIcon: <img className="v-key" src={vKey} alt="Use V key for Snare" />,
        },
        {
            name: "tom-2",
            sound: tomTwoSound,
            key: "H",
            icon: <img className="tom-2" src={tomTwo} alt="Tom 2" />,
            keyIcon: <img className="h-key" src={hKey} alt="Use H key for Tom 2" />,
        },
        {
            name: "tom-1",
            sound: tomOneSound,
            key: "G",
            icon: <img className="tom-1" src={tomOne} alt="Tom 1" />,
            keyIcon: <img className="g-key" src={gKey} alt="Use G key for Tom 1" />,
        },
        {
            name: "hihat",
            sound: hiHatSound,
            key: "F",
            icon: <img className="hihat" src={hiHat} alt="Hi Hat" />,
            keyIcon: <img className="f-key" src={fKey} alt="Use F key for Hi Hat" />,
        },
        {
            name: "ride",
            sound: rideSound,
            key: "U",
            icon: <img className="ride" src={ride} alt="Ride" />,
            keyIcon: <img className="u-key" src={uKey} alt="Use U key for Ride" />,
        },
        {
            name: "crash",
            sound: crashSound,
            key: "T",
            icon: <img className="crash" src={crash} alt="Crash" />,
            keyIcon: <img className="t-key" src={tKey} alt="Use T key for Crash" />,
        },
        {
            name: "splash",
            sound: splashSound,
            key: "Y",
            icon: <img className="splash" src={splash} alt="Splash" />,
            keyIcon: <img className="y-key" src={yKey} alt="Use Y key for Splash" />,
        },
    ]);
    
    const [isShortcut, setIsShortcut] = useState(false);
    const [isMute, setIsMute] = useState(true);
    
    const toggleShortcuts = () => {
        setIsShortcut(!isShortcut);
    }

    const toggleMuteButton = () => {
        setIsMute(!isMute);
    } 
    
    return (
            <>
            <h3 className="try-me">TRY ME!</h3>
            <div className="drums">
                <button onClick={() => toggleShortcuts()}>
                    {isShortcut ? "Hide shortcuts" : "Show shortcuts" }
                </button>
                <div className="speaker-audio" onClick={() => toggleMuteButton()}>
                    {isMute ? <img className="mute" src={mute} alt="mute" /> : <img className="unmute" src={unmute} alt="unmute" />}
                </div>
                {sounds.map((sound, index) => (
                    <Drumkeys 
                    key={index} 
                    name={sound.name}
                    letter={sound.key} 
                    sound={isMute ? sound.sound : null} 
                    icon={sound.icon} 
                    keyIcon={isShortcut ? sound.keyIcon : null}
                    isMute={isMute}
                    toggleMute={toggleMuteButton}
                    />
                    ))}
            </div>
            </>
    )
}

export default Drumkit;