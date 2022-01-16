import dotenv from "dotenv-defaults";
import mongoose from "mongoose";
import {graphqlUploadExpress} from "graphql-upload";
import express from "express";
import cors from "cors";
import {ApolloServer} from "apollo-server-express";
import typeDefs from "./typeDefs/uploadTypes";
import resolvers from "./resolvers/index";
import { AllScore, ExamScore, UserScore, Score, Task } from "./models/Score";
import User from "./models/User"

const app = express();
app.use(express.json());
app.use(cors());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers
});

dotenv.config();

async function startServer() {
    app.use(graphqlUploadExpress());
    await apolloServer.start();
    apolloServer.applyMiddleware({app});
    app.use('/', (req, res) => {
        res.send("Welcome to Graphql Upload!")
    })
};

startServer();

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected Successfully!"))
    .catch((err) => console.log("MongoDB Connection Failed!"));

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    console.log(`Graphql EndPoint Path: ${apolloServer.graphqlPath}`);
})


var waitForJudge = [];
const enqueue = (val) => {
    // console.log('enqueue success', waitForJudge);
    return waitForJudge.push(val);
}
const dequeue = () => {
    return waitForJudge.shift();
}

import {PythonShell} from 'python-shell';
const judge = () => {
    if(waitForJudge.length > 0){
        const dirName = waitForJudge[0]
        let options = {
            pythonOptions: ['-u'], // get print results in real-time
            args: [dirName] 
        };
        PythonShell.run('test.py', options, async function (err, data) {
            if (err) throw err;
                console.log('judge finished');
            console.log(data)
            console.log(data[data.length-1]) //score data
            var scoreData = data[data.length-1].split(', {'); //it's string
            scoreData = scoreData.map(data => data.split(', '))
            for(var i=0;i<scoreData.length;i++){
                scoreData[i][0] = scoreData[i][0].split("'name': ")
                scoreData[i][1] = scoreData[i][1].split("'status': ")
                scoreData[i][2] = scoreData[i][2].split("'score': ")
            }
            for(var i=0;i<scoreData.length;i++){
                scoreData[i][2][1] = scoreData[i][2][1].replace('}','')
                scoreData[i][2][1] = scoreData[i][2][1].replace(']','')
                scoreData[i][0][1] = scoreData[i][0][1].slice(1, scoreData[i][0][1].length-1)
                scoreData[i][1][1] = scoreData[i][1][1].slice(1, scoreData[i][1][1].length-1)
                scoreData[i][2][1] = scoreData[i][2][1].slice(1, scoreData[i][2][1].length-1)
                scoreData[i][2][1] = parseInt(scoreData[i][2][1], 10)
            }
            var scoreDataHandled = []
            for(var i=0;i<scoreData.length;i++){
                scoreDataHandled[i] = [scoreData[i][0][1], scoreData[i][1][1], scoreData[i][2][1]]
            }
            console.log(scoreDataHandled)

            var totalScore = 0;
            for(i=0;i<scoreDataHandled.length;i++){
                if(scoreDataHandled[i][1] === 'Passing')
                    totalScore += scoreDataHandled[i][2];
            }
            console.log('totalScore', totalScore)

            const info = dirName.split('-')//name-exam-timestamp
            console.log('info', info) 
            scoreDataHandled = scoreDataHandled.map(task => {
                var tmpTask = new Task({name: task[0], status:task[1], score: task[2]});
                tmpTask.save();
                return tmpTask;
            })
            console.log('taskcreated', scoreDataHandled)
            const score = await Score.create({
                tasks: scoreDataHandled,
                totalScore: totalScore,
            })
            const userScoreExisting = await UserScore.findOne({name: info[0]});
            if(!userScoreExisting) {
                const userScore = await  UserScore.create({name: info[0], scores: [score]});
                await  ExamScore.updateOne({name: info[1]}, { $push: { userScores: userScore } });
                console.log('not exist')
            }else{
                await UserScore.updateOne({name: info[0]}, { $push: { scores: score } });
                console.log('exists')
            }
        });
    }
    dequeue();
    console.log('judgequeue:', waitForJudge)
}

setInterval(judge, 6000);
console.log('judge is online');

export {enqueue, dequeue}