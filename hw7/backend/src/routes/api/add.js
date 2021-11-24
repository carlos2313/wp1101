import express from 'express';
import ScoreCard from '../../models/ScoreCard';
const router = express.Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());

router.post('/create-card', async (req, res) => {
    const existing = await ScoreCard.findOne({Name: req.body.name, Subject: req.body.subject});
    var responseMessage = '';
    var newScoreCard;
    try{
        if (existing) {
            newScoreCard = await ScoreCard.updateOne(
                {Name: req.body.name, Subject: req.body.subject},
                {
                    $set: {Score: req.body.score}
                }
            );
            responseMessage = `Updating (${req.body.name}, ${req.body.subject}, ${req.body.score})`;
        }else{
            newScoreCard = await ScoreCard.create({Name: req.body.name, Subject: req.body.subject, Score: req.body.score});
            responseMessage = `Adding (${req.body.name}, ${req.body.subject}, ${req.body.score})`;
        }
    }catch(e){
        throw new Error("add card failed"); 
    }
    res.json({ message: responseMessage, card: newScoreCard});//what inside the newScoreCard doesn't matter, it just have to return something to match frontend.
});



export default router;
