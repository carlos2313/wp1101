import checkUser from './utilities';
import { ExamScore, UserScore, Score, Task } from "../models/Score";

const Query = {
    greetings() {
        return "Hello World";
    },
    async exam() {
        console.log('In exam')
        const examScore = await ExamScore.find({});
        return examScore.map(x => x.name);
    },
    async score(_, { username, password, secretKey, exam }) {
        console.log("In score");
        console.log("username:", username);
        console.log("password:", password);
        console.log("secretKey:", secretKey);
        console.log("exam:", exam);
        
        const checkUserMessage = await checkUser(username, password, secretKey);
        if (checkUserMessage.type != 'success') {
            return checkUserMessage;
        }

        const examScoreExisting = await ExamScore.findOne({name: exam});
        if (!examScoreExisting) {
            return { type: 'error', msg: 'This exam does not exist' };
        }

        console.log('here')
        console.log('examScoreExisting: ', examScoreExisting);
        console.log('userScores in ExamScore: ', examScoreExisting.userScores);

        if (!(examScoreExisting.userScores) || examScoreExisting.userScores.length === 0) {
            return { type: 'error', msg: 'There is no grade here.' };
        }
        let userScores = null;
        for (const _id of examScoreExisting.userScores) { 
            const existing = await UserScore.findOne({ _id: _id, name: username })
            if (existing)
                userScores = existing;
        }
        console.log('userScores: ', userScores)
        if (!userScores || !userScores.scores || userScores.scores.length === 0) {
            return { type: 'error', msg: 'There is no your grade here.' };
        }

        console.log('userScores.scores: ', userScores.scores);
        
        let scores = [];
        for (let _id of userScores.scores) { 
            let dbScores = await Score.findOne({ _id: _id })
            console.log("dbScores: ", dbScores)
            let tasks = []
            for (let _id2 of dbScores.tasks) {
                let task = await Task.findOne({ _id: _id2 })
                console.log("task: ", task)
                tasks.push({name: task.name, status: task.status, score: task.score})
            }
            scores.push({totalScore: dbScores.totalScore, tasks: tasks, timeStamp: parseInt(_id.valueOf(), 16)});
        }

        console.log(scores);

        /*
        const oldscores = [
        {
            tasks: [
                { name: '1 (20%)', status: 'Passing', score: 20 }, 
                { name: '2-(1) (10%)', status: 'Passing', score: 10 }
            ],
            totalScore: 30,
            timeStamp: 0,
        },
        {
            tasks: [
                { name: '1 (20%)', status: 'Passing', score: 20 }, 
                { name: '2-(1) (10%)', status: 'Failing', score: 0 }
            ],
            totalScore: 20,
            timeStamp: 1,
        }]
        */
        return { type: 'success', msg: `Query success!`, scores };
    },
};

export { Query as default };
