var records = [];
function restart(){
    records = [];
}
function updateRecords(record){
    records = records.concat(record);
}

function guessNumber(){
    for(let i=0;i<9999;i++){
        const guessA = Math.floor(i/1000), guessB = Math.floor((i%1000)/100), guessC = Math.floor((i%100)/10), guessD = i%10;
        var validate = 0;//check if the guessed number validate to the records
        const same = (guessA === guessB) + (guessA === guessC) + (guessA === guessD) + (guessB === guessC) + (guessB === guessD) + (guessC === guessD);  
            if(same>0)
                continue;
        for(let j=0;j<records.length;j++){
            const numberA = records[j].number[0], numberB = records[j].number[1], numberC = records[j].number[2], numberD = records[j].number[3];
            const A = (numberA === guessA) + (numberB === guessB) + (numberC === guessC) + (numberD === guessD);
            const B = (numberA === guessB) + (numberA === guessC) + (numberA === guessD) + 
                  (numberB === guessA) + (numberB === guessC) + (numberB === guessD) + 
                  (numberC === guessA) + (numberC === guessB) + (numberC === guessD) +
                  (numberD === guessA) + (numberD === guessB) + (numberD === guessC);
            if(A + 'A' + B + 'B' !== records[j].response){
                validate++;
                break;
            }
        }
        if(validate>0)
            continue;
        else{
            return [guessA, guessB, guessC, guessD];
        }
    }
}

export {restart, updateRecords, guessNumber};