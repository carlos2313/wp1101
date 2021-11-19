var numberA = 0, numberB = 0, numberC = 0, numberD = 0;
function getNumber(){
    return [numberA, numberB, numberC, numberD];
}

function genNumber(){
    numberA = Math.floor(Math.random() * 10);
    numberB = tilldifferent(numberA);
    numberC = tilldifferent(numberA, numberB);
    numberD = tilldifferent(numberA, numberB, numberC);
    console.log("computer answer: ", numberA, numberB, numberC, numberD);
}

function tilldifferent(...nums){
    let n = nums[0];
    let same = 1;
    while(same === 1){
        same = 0;
        n = Math.floor(Math.random() * 10);
        for(let i=0;i<nums.length;i++){
            if(n === nums[i])
                same = 1;
        }
    }
    return n;
}

export {getNumber, genNumber};