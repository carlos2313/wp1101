import express, { response } from 'express';
import ScoreCard from '../../models/ScoreCard';
const router = express.Router();
import bodyParser from 'body-parser';
router.use(bodyParser.json());

router.delete('/clear-db', async ( _ , res) => {
    try {
        await ScoreCard.deleteMany({});
        // console.log("Database deleted");
    } catch (e) { 
        throw new Error("Database deletion failed"); 
    }
    res.json({ message: "Database cleared"});
});

export default router;
