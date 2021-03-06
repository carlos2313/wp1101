import express from 'express';
import ScoreCard from '../../models/ScoreCard';
const router = express.Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());

router.get('/query-cards', async (req, res) => {
    var ScoreCards;
    var messages = [];
    var responseMessage = `Querying ${req.query.type} (${req.query.queryString})`;
    try{
        if(req.query.type === 'Name'){
            ScoreCards = await ScoreCard.find({Name: req.query.queryString});
            messages = ScoreCards.map(card => `Found card with ${req.query.type}: (${card.Name}, ${card.Subject}, ${card.Score})`);
        }else if(req.query.type === 'Subject'){
            ScoreCards = await ScoreCard.find({Subject: req.query.queryString});
            messages = ScoreCards.map(card => `Found card with ${req.query.type}: (${card.Name}, ${card.Subject}, ${card.Score})`);
        }
        if(ScoreCards.length === 0){
            ScoreCards = '';
            responseMessage = `${req.query.type} (${req.query.queryString}) not found!`;
        }
    }catch(e){
        throw new Error("Database query failed"); 
    }
    res.json({ queryData: ScoreCards, message: responseMessage});
});

export default router;
