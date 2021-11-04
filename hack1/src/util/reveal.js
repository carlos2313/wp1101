/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount) => {
    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the cell is already revealed, do nothing. */}
    {/* Useful Hint: If the value of the cell is not 0, only show the cell value. */}
    if(board[y][x].revealed===false){
        board[y][x].revealed = true;
        if(board[y][x].value!==0){
            if(board[y][x].value!=='💣')
                newNonMinesCount--;
        }else{
            newNonMinesCount--;
            for(let j=-1;j<=1;j++){
                for(let i=-1;i<=1;i++){
                    if(board[y+j]!==undefined && board[y+j][x+i]!==undefined){
                        // console.log("(x, y)= (", x,", ", y, ")", "revealed= ", board[y+j][x+i].revealed);
                        let temp = revealed(board, x+i, y+j, newNonMinesCount);
                        board = temp.board;
                        newNonMinesCount = temp.newNonMinesCount;
                    }
                }
            }
        }
    }
    {/* -- TODO 4-2 -- */}
    {/* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */}
    {/* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */}
    
    
    return {board, newNonMinesCount};
};
