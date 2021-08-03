import '../styles/drumpad.css'

export function DrumPad({name, source, trigger, setClip}){
    

    function handleClick(){
        playSound();
        setClip(name);
        changeColor();
    }

    function changeColor(){
        const pressedPad = document.querySelector(`[trigger='${trigger}']`);
        pressedPad.style.backgroundColor = 'orange';
        setTimeout(() => {pressedPad.style.backgroundColor = 'grey'}, 100);
    }

    function playSound(){
        const sound= document.getElementById(trigger);
        sound.currentTime = 0;
        sound.play();
    }

    
    return(
        <div className="drum_pad" id={name} trigger={trigger} onClick={handleClick}>
            
            {trigger}
            <audio src={source} id={trigger}></audio>
        </div>
    )
}