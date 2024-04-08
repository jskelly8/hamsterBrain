import { useState, useEffect } from 'react';

export default function PomodoroTimer() {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60); // 25 min work interval
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('Work'); // 'Work' or 'Break' mode swaps

    useEffect(() => {
        let interval = null;

        if (isActive && secondsLeft > 0) {
            interval = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            if (mode === 'Work') {
                setMode('Break');
                setSecondsLeft(5 * 60); // 5 min break interval
            } else {
                setMode('Work');
                setSecondsLeft(25 * 60); // 25 min work interval
            }
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, secondsLeft, mode]);

    const toggleIsActive = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setSecondsLeft(25 * 60); // 25 min work interval
        setMode('Work');
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className="timer">
            <h2>Pomodoro Timer</h2>
            <p className="timerMode">Mode: {mode}</p>
            <p className="timerDisplay">{formatTime(secondsLeft)}</p>
            <div className='timerControls'>
                <button onClick={toggleIsActive} className="timerButton">
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer} className="timerButton">Reset</button>
            </div>
        </div>
    );
}
