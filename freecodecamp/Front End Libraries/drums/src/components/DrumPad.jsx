import '../styles/drumpad.css'

export function DrumPad({name, source, trigger, setClip}){
    

    function handleSoundOnClick(){
        playSound();
        setClip(name);
    }

    function playSound(){
        const sound= document.getElementById(trigger);
        sound.currentTime = 0;
        sound.play();
    }

    
    return(
        <div className="drum_pad" id={name} trigger={trigger} onClick={handleSoundOnClick}>
            
            {trigger}
            <audio src={source} id={trigger}></audio>
        </div>
    )
}