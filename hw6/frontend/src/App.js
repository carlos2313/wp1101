import React from 'react';
import { useState } from 'react';
import { startGame, setAnswer, guess, restart } from './axios';
import './App.css';
import Table from './table';

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [hasWon, setHasWon] = useState(false);
    const [hasSet, setHasSet] = useState(false);
    const [myAnswer, setMyAnswer] = useState('');
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('');
    const [records, setRecords] = useState([]);
    const [AIrecords, setAIrecords] = useState([]);
    const [AIhasWon, setAIhasWon] = useState(false);

    const handleGuess = async () => {
        const [response, AIguessed, AIstatus] = await guess(number);
        if(response === 'Network Error'){
            setStatus('HTTP 500 error: server not responding or not connected');
        }else{
            console.log('in APP_A_B, response: ', response, 'AIstatus: ', AIstatus);
            setStatus(response);
            setRecords(records.concat({number: number, response: response}));
            setAIrecords(AIrecords.concat({number: AIguessed, response: AIstatus}));
            document.getElementById("guess_input").value = '';
            if(response === '4A0B'){
                setHasWon(true);
            }else if(AIstatus === '4A0B'){
                setAIhasWon(true);
            }
        }
    }

    const handleSet = async () => {
        const [response, answer] = await setAnswer(myAnswer);
        console.log(response, answer);
        setMyAnswer(answer);
        document.getElementById("set_input").value = '';
        if(response === 'Network Error'){
            setStatus('HTTP 500 error: server not responding or not connected');
        }else if(response === 'valid answer'){
            setHasSet(true);
            setStatus('');
        }else{
            setStatus(response);
        }
    }

    const startMenu =
    <div className = 'Wrapper'>
        <p className = 'title'>Guess Number</p>
        <button  className = 'btn' onClick={async () => {
            const message = await startGame();
            if(message === 'Network Error')
                setStatus('HTTP 500 error: server not responding or not connected');
            else{
                setStatus('');
                setHasStarted(true);
            }   
        }}>start game</button>
        <p className='paragraph'>{status}</p>
    </div>

    const setMode = 
    <div  className = 'Wrapper'>
        <p className='paragraph'>Set a number between 0000 to 9999(Each digit is different) as your answer</p>
        <input className='input' id='set_input'  onChange={() => {
            let input = document.getElementById("set_input");
            setMyAnswer(input.value);
        }}></input>
        <button className='btn' disabled={!myAnswer} onClick={handleSet} style = {{'fontSize': '20px'}}>set number</button>
        <p className='paragraph'>{status}</p>
    </div>

    const handleChange = () => {
        let input = document.getElementById("guess_input");
        setNumber(input.value);
    }

    const gameMode =
    <div>
        <p className='paragraph'>Guess a number between 0000 to 9999(Each digit is different)</p>
        <input className='input' id='guess_input' onChange={handleChange}  disabled={hasWon || AIhasWon}></input>
        <button className="btn" onClick={handleGuess} disabled={!number || (hasWon || AIhasWon) } style = {{'fontSize': '20px'}}><span>guess!</span></button>
        <p className='paragraph'>My answer is {myAnswer}</p>
        <p className='paragraph'>{status}</p>
        <div style={{display: (hasWon || AIhasWon) ? '': 'none'}}>
            {hasWon? <p className='paragraph'>you won! the number was {number}.</p>: <p className='paragraph'>you lose! AI guessed your number.</p>}
            <button className='btn' onClick={async () => {
                const message = await restart();
                if(message === 'Network Error')
                    setStatus('HTTP 500 error: server not responding or not connected');
                else{
                    setHasWon(false);
                    setHasSet(false);
                    setMyAnswer('');
                    setNumber('');
                    setStatus('');
                    setRecords([]);
                    setAIrecords([]);
                    setAIhasWon(false);
                }   
            }}>restart</button>
        </div>
        <div>
            <Table caption='Human' records = {records}/>
            <Table caption='AI' records = {AIrecords}/>
        </div>
    </div>
    
    const game =
    <div>
        {hasSet ? gameMode : setMode}
    </div>

    return(
        <div className='App'>
            {hasStarted ? game : startMenu}
        </div>
    );
    
}

export default App;
