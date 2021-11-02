/****************************************************************************
  FileName      [ Modal.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Modal component. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useEffect, useState } from "react";
import './css/Modal.css'

export default function Modal({restartGame, backToHome, win}){
    const [render, setRender] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRender(true);
        }, 1000);
    }, []);

    return (
        // {/* -- TODO 5-1 -- */}
        /* Useful Hint: style = {{opacity: 1 or 0 }} */
        <div className = "modal">
            <div className = "modalWrapper"></div>
            <div className = "modalContent">
                <div className = "modalResult">
                    {win===true? "WIN": "Game Over"}
                </div>
                <div className = "modalBtnWrapper">
                    <div className = "modalBtn">{win===true? "New Game": "Try Again"}</div>
                    <div className = "modalBtn">Back to Home</div>
                </div>
            </div>
            <div className = "modalWrapper"></div>
        </div>

    );
}