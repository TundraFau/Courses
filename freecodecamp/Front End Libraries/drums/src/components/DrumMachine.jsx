import {useState} from 'react';
import { DrumPad } from './DrumPad.jsx';

import '../styles/drummachine.css'

export function DrumMachine(){
    const [clip, setClip] = useState('');

    document.addEventListener('keydown', handleKeyDown)

    function handleKeyDown(e){
        const key = e.key.toUpperCase();
        if(handleSoundOnKeyDown(key)){
            const pressedPad = document.querySelector(`[trigger="${key}"]`)
            setClip(pressedPad.attributes.id.value)
        }
        
    }
    function handleSoundOnKeyDown(key){
        
        console.log(key)
        const sound=document.getElementById(key);
        if (sound != null){
            console.log(`playing ${sound}`)
            sound.currentTime = 0;
            sound.play();
            return true
        }
    }

    return (
    <div id='drum_machine'>
        <div id="display">
            <h1>{clip}</h1>   
            <DrumPad name='Heater-1' source='https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' trigger='Q'  setClip={setClip} />
            <DrumPad name='Heater-2' source='https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' trigger='W'  setClip={setClip} />
            <DrumPad name='Heater-3' source='https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' trigger='E'  setClip={setClip} />
            <DrumPad name='Heater-4' source='https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' trigger='A'  setClip={setClip} />
            <DrumPad name='Clap' source='https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' trigger='S'  setClip={setClip} />
            <DrumPad name='Open-HH' source='https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' trigger='D'  setClip={setClip} />
            <DrumPad name="Kick-n'-hat" source='https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' trigger='Z'  setClip={setClip} />
            <DrumPad name="Kick" source='https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' trigger='X'  setClip={setClip} />
            <DrumPad name="Closed-HH" source='https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' trigger='C'  setClip={setClip} />
        </div>
    </div>
)
    
}