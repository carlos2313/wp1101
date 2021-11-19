var numberA = 0, numberB = 0, numberC = 0, numberD = 0;
function setUserNumber(A, B, C, D){
    numberA = A, numberB = B, numberC = C, numberD = D;
}
function getUserNumber(){
    return [numberA, numberB, numberC, numberD];
}

export {setUserNumber, getUserNumber};