import React from 'react';
import { useState } from 'react';
import { startGame, guess, restart } from './axios';
import './App.css';

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');

    const handleGuess = async () => {
        const response = await guess(number);
        if(response === 'Equal'){
            setHasWon(true);
        }else if(response === 'Smaller' || response === 'Bigger'){
            setStatus(response);
            setNumber('');
        }else{
            setStatus(response);
        }
    }

    const handleRestart = async () => {
        restart();
        setHasWon(false);
    }

    const startMenu =
    <div>
        <button onClick={async () => {
            await startGame();
            setHasStarted(true);
        }}>start game</button>
    </div>

    const handleChange = () => {
        let input = document.getElementById("guess_input");
        setNumber(input.value);
    }
    const gameMode =
    <>
        <p>Guess a number between 1 to 100</p>
        <input id="guess_input" onChange={handleChange}></input>
        <button onClick={handleGuess} disabled={!number}>guess!</button>
        <p>{status}</p>
    </>

    const winningMode = 
    <>
        <p>you won! the number was {number}.</p>
        <button  onClick={handleRestart}>restart</button>
    </>
    
    const game =
    <div>
        {hasWon ? winningMode : gameMode}    
    </div>

    return(
        <div className="App">
            {hasStarted ? game : startMenu}
        </div>
    );
}

export default App;
