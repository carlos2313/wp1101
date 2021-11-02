/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import createBoard from '../util/createBoard';
import { revealed } from '../util/reveal';
import './css/Board.css'


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(0);        // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        // Calling the function
        freshBoard();
    }, []);

    // Creating a board
    const freshBoard = () => {
        {/* -- TODO 3-1 -- */}
        {/* Useful Hint: createBoard(...) */}
        let temp = createBoard(boardSize, mineNum);
        let tempboard = [];
        for(let y = 0; y < boardSize; y++){
            let subRow = [];
            for(let x = 0; x < boardSize; x++){
                subRow.push(temp.board[x][y]);
            }
            tempboard.push(subRow);
        }
        setBoard(tempboard);
        setMineLocations(temp.mineLocations);
        setRemainFlagNum(mineNum);
    }

    const restartGame = () => {
        {/* -- TODO 5-2 -- */}
        {/* Useful Hint: freshBoard() */}
        
    }

    // On Right Click / Flag Cell
    const updateFlag = (e, x, y) => {
        // To not have a dropdown on right click
        e.preventDefault();
        // Deep copy of a state
        {/* -- TODO 3-2 -- */}
        {/* Useful Hint: A cell is going to be flagged. 'x' and 'y' are the xy-coordinate of the cell. */}
        {/* Reminder: If the cell is already flagged, you should unflagged it. Also remember to update the board and the remainFlagNum. */}
        {/* Reminder: The cell can be flagged only when it is not revealed. */}
        if(board[y][x].revealed===false){
            let tempboard = [...board];
            if(tempboard[y][x].flagged===false){
                tempboard[y][x].flagged = true;
                setRemainFlagNum(remainFlagNum-1);
            }else{
                tempboard[y][x].flagged = false;
                setRemainFlagNum(remainFlagNum+1);
            }
            setBoard(tempboard);
        }
        
    };

    const revealCell = (x, y) => {
        {/* -- TODO 4-1 -- */}
        {/* Reveal the cell */}
        {/* Useful Hint: The function in reveal.js may be useful. You should consider if the cell you want to reveal is a location of mines or not. */}
        {/* Reminder: Also remember to handle the condition that after you reveal this cell then you win the game. */}
        
    };

    return(
        <div className = 'boardPage' >
            <div className = 'boardWrapper' >
            {/* <h1>This is the board Page!</h1>  This line of code is just for testing. Please delete it if you finish this function. */}
            
            {/* -- TODO 3-1 -- */}
            {/* Useful Hint: The board is composed of BOARDSIZE*BOARDSIZE of Cell (2-dimention). So, nested 'map' is needed to implement the board.  */}
            {/* Reminder: Remember to use the component <Cell> and <Dashboard>. See Cell.js and Dashboard.js for detailed information. */}
            <div className = "boardContainer">
                <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver}/>
                {board.map((e, y) => <div id={"row{y}"} style = {{display: "flex"}}>{e.map((ee, x)=> <Cell id={"{y}-{x}"} rowIdx={y} colIdx={x} detail={ee} updateFlag={updateFlag} revealCell={revealCell}/>)}</div>)}
                {/* <Cell id={"0-0"} rowIdx={0} colIdx={0} detail={board[0][0]} updateFlag={updateFlag} revealCell={revealCell}/>) */}
            </div>
            </div>
        </div>
    ); 

    

}

export default Board