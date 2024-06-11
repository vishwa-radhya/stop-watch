import './Stopwatch.styles.css'
import { useState,useEffect,useRef } from 'react'
function Stopwatch(){
    const [isWatchRunning,setIsWatchRunning]=useState(false);
    const [elapsedTime,setElapsedTime]=useState(0);
    const intervalIdRef=useRef(null);
    const startTimeRef=useRef(0);
    useEffect(()=>{
        if(isWatchRunning){
            intervalIdRef.current = setInterval(()=>{
                setElapsedTime(Date.now()-startTimeRef.current)
            },60);
        }
        return ()=>{
            clearInterval(intervalIdRef.current)
        }
    },[isWatchRunning])

    function start(){
        setIsWatchRunning(true);
        startTimeRef.current=Date.now()-elapsedTime;
    }

    function stop(){
        setIsWatchRunning(false);
    }

    function reset(){
        setElapsedTime(0);
        setIsWatchRunning(false);
    }

    function updateWatch(){
        // let hours = Math.floor(elapsedTime/(1000*60*60))
        let minutes = Math.floor(elapsedTime/(1000*60)%60)
        let seconds = Math.floor(elapsedTime/(1000)%60)
        let milliSeconds = Math.floor((elapsedTime %1000)/10);

        minutes=String(minutes).padStart(2,'0');
        seconds=String(seconds).padStart(2,'0');
        milliSeconds=String(milliSeconds).padStart(2,'0');
        return `${minutes}:${seconds}:${milliSeconds}`
    }
    return(
        <>
            <div className="watch-container">
            <h2>STOP WATCH</h2>
                <div className="watch">{updateWatch()}</div>
                <div className='btn-container'>
                <button className="start-btn" onClick={start}>START</button>
                <button className="stop-btn" onClick={stop}>STOP</button>
                <button className="reset-btn" onClick={reset}>RESET</button>
                </div>
            </div>
        </>
    )
}
export default Stopwatch