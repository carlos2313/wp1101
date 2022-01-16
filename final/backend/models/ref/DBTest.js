import { ExamScore, UserScore, Score, Task } from "../Score";

const dbtest = () => {

    const scoreA =
    {
        tasks: [
            { name: '1 (20%)', status: 'Passing', score: 20 },
            { name: '2-(1) (10%)', status: 'Passing', score: 10 }
        ],
        totalScore: 30,
        timeStamp: 0,
    };
    const scoreB = {
        tasks: [
            { name: '1 (20%)', status: 'Passing', score: 20 },
            { name: '2-(1) (10%)', status: 'Failing', score: 0 }
        ],
        totalScore: 20,
        timeStamp: 1,
    };

    const UserAScore = { name: 'A', userScores: [scoreA, scoreB] };
    const UserBScore = { name: 'B', userScores: [scoreA, scoreB, scoreA] };
    const UserCScore = { name: 'C', userScores: [scoreB] };
    const UserDScore = { name: 'D', userScores: [scoreA, scoreA, scoreB] };
    const UserEScore = { name: 'E', userScores: [scoreB, scoreA] };

    const ExamXScore = { name: 'EXAM-X', examScores: [UserAScore, UserBScore] }
    const ExamYScore = { name: 'EXAM-Y', examScores: [UserCScore, UserDScore, UserEScore] }

    /*
    const task = new Task({name: '1 (20%)', status: 'Passing', score: 20});
    await task.save();
    
    const tasks = [
                { name: '1 (20%)', status: 'Passing', score: 20 }, 
                { name: '2-(1) (10%)', status: 'Failing', score: 0 }
    ].map(x => new Task(x))
    const score = new Score({ task, totalScore: 20, timeStamp: 1 })
    
    const newScore = scores.map(score => new Score({ tasks: score.tasks.map(task => new Task(task)), totalScore: 20, timeStamp: 1 })) 
    
    await score.save();
    */

    const toTask = (task) => {
        return new Task(task);
    }

    const toScore = (score) => {
        return new Score({
            tasks: score.tasks.map(task => toTask(task)),
            totalScore: score.totalScore,
            timeStamp: score.timeStamp
        })
    }

    // const UserAScore = { name: 'A', scores: [scores, scores] };
    const toUserScore = (userScore) => {
        return new UserScore({
            name: userScore.name,
            scores: userScore.userScores.map(score => toScore(score))
        })
    }

    // const ExamXScore = { name: 'EXAM-X', scores: [UserAScore, UserBScore] }
    const toExamScore = (examScore) => {
        return new ExamScore({
            name: examScore.name,
            userScores: examScore.examScores.map(score => toUserScore(score))
        })
    }

    // const AllSampleScore = [ExamXScore, ExamYScore]
    const toAllScore = (allScore) => {
        return new AllScore({
            examScores: allScore.allScores.map(score => toExamScore(score))
        })
    }

    console.log(toAllScore(AllSampleScore))

}

export default dbtest;