import express from 'express';
import {getNumber, genNumber} from '../core/getNumber';
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
});

router.get('/guess', (req, res) => {
    const guessed = roughScale(req.query.number, 10);
    const number = getNumber();
    console.log(number, guessed);
    // check if NOT a num or not in range [1,100]
    if(!guessed || guessed < 1 || guessed > 100) {
        console.log("sdasda");
        res.status(406).send({ msg: 'Error: ' + req.query.number + ' is not a valid number (1 - 100)' });
    }else if(number === guessed){
        res.send({ msg: 'Equal' });
    }else if(number < guessed){
        res.send({ msg: 'Smaller' });
    }else if(number > guessed){
        res.send({ msg: 'Bigger' });
    }
});

router.post('/restart', (_, res) => {
    genNumber();
    res.send({msg: 'restart'});
});

export default router;
