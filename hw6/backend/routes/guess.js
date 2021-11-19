import express from 'express';
import {getNumber, genNumber} from '../core/getComputerNumber';
import {setUserNumber, getUserNumber} from '../core/getUserNumber';
import {restart, updateRecords, guessNumber} from '../core/AI';
const router = express.Router();

function roughScale(x, base) {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)){
        return 0;
    }
    return parsed;
}

router.post('/start', (_, res) => {
    genNumber();  // 用亂數產生一個猜數字的 number
    res.json({ msg: 'The game has started.' });
    restart();
});

router.post('/setAnswer', async (req, res) => {
    // console.log('q', req.query.number);
    const answer = roughScale(req.query.number, 10);
    const answerA = Math.floor(answer/1000), answerB = Math.floor((answer%1000)/100), answerC = Math.floor((answer%100)/10), answerD = answer%10;
    // check if NOT a num or not in range [0000, 9999]
    console.log(answerA, answerB, answerC, answerD);
    if(!answer || answer < 0 || answer > 10000) {
        res.status(406).send({ msg: 'Error: ' + req.query.number + ' is not a valid answer (0000 - 9999)', answer: answer});
    }else{
        const same = (answerA === answerB) + (answerA === answerC) + (answerA === answerD) + (answerB === answerC) + (answerB === answerD) + (answerC === answerD);  
        if(same>0){
            res.status(406).send({ msg: 'Error: ' + req.query.number + ' is not a valid answer (some digits are the same)', answer: answer});
        }else{
            setUserNumber(answerA, answerB, answerC, answerD);
            res.send({ msg: 'valid answer', answer: answerA.toString() + answerB.toString() + answerC.toString() + answerD.toString()});
        }
    }
});

router.get('/guess', (req, res) => {
    const guessed = roughScale(req.query.number, 10);
    const guessA = Math.floor(guessed/1000), guessB = Math.floor((guessed%1000)/100), guessC = Math.floor((guessed%100)/10), guessD = guessed%10;
    const [numberA, numberB, numberC, numberD] = getNumber();
    console.log(numberA, numberB, numberC, numberD, guessA, guessB, guessC, guessD);
    //AI turn
    const AIguessed = guessNumber();
    const Usernumber = getUserNumber();
    const AIA = (AIguessed[0] === Usernumber[0]) + (AIguessed[1] === Usernumber[1]) + (AIguessed[2] === Usernumber[2]) + (AIguessed[3] === Usernumber[3]);
    const AIB = (AIguessed[0] === Usernumber[1]) + (AIguessed[0] === Usernumber[2]) + (AIguessed[0] === Usernumber[3]) + 
                (AIguessed[1] === Usernumber[0]) + (AIguessed[1] === Usernumber[2]) + (AIguessed[1] === Usernumber[3]) +
                (AIguessed[2] === Usernumber[0]) + (AIguessed[2] === Usernumber[1]) + (AIguessed[2] === Usernumber[3]) +
                (AIguessed[3] === Usernumber[0]) + (AIguessed[3] === Usernumber[1]) + (AIguessed[3] === Usernumber[2]);
    const record = {number: AIguessed, response: AIA + 'A' + AIB + 'B'};
    // console.log('in guess, record is: ', record);
    updateRecords(record);
    // check if NOT a num or not in range [0000, 9999]
    if(!guessed || guessed < 0 || guessed > 10000) {
        res.status(406).send({ msg: 'Error: ' + req.query.number + ' is not a valid number (0000 - 9999)' , AIguessed: AIguessed, AIstatus: AIA + 'A' + AIB + 'B'});
    }else{
        const A = (numberA === guessA) + (numberB === guessB) + (numberC === guessC) + (numberD === guessD);
        const B = (numberA === guessB) + (numberA === guessC) + (numberA === guessD) + 
                  (numberB === guessA) + (numberB === guessC) + (numberB === guessD) + 
                  (numberC === guessA) + (numberC === guessB) + (numberC === guessD) +
                  (numberD === guessA) + (numberD === guessB) + (numberD === guessC);
        const same = (guessA === guessB) + (guessA === guessC) + (guessA === guessD) + (guessB === guessC) + (guessB === guessD) + (guessC === guessD);  
        if(same>0){
            res.status(406).send({ msg: 'Error: ' + req.query.number + ' is not a valid number (some digits are the same)', AIguessed: AIguessed, AIstatus: AIA + 'A' + AIB + 'B' });
        }else{
            res.send({ msg: A + 'A' + B + 'B' , AIguessed: AIguessed, AIstatus: AIA + 'A' + AIB + 'B'});
        }
    }
});

router.post('/restart', (_, res) => {
    genNumber();
    restart();
    res.send({msg: 'restart'});
});

export default router;
