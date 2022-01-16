import { Schema, model, Types } from 'mongoose';

const ExamScoreSchema = new Schema({
    name: { type: String, required: true },
    userScores: [{ type: Types.ObjectId, ref: "UserScore" }]
});

const UserScoreSchema = new Schema({
    name: { type: String, required: true },
    scores: [{ type: Types.ObjectId, ref: "Score" }]
});

const ScoreSchema = new Schema({
    tasks: [{ type: Types.ObjectId, ref: "Task" }],
    totalScore: { type: Number, required: true },
    timestamp: Date
});

const TaskSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    score: { type: Number, required: true }
});

const ExamScore = model("ExamScore", ExamScoreSchema);
const UserScore = model("UserScore", UserScoreSchema);
const Score = model("Score", ScoreSchema);
const Task = model("Task", TaskSchema);

export {ExamScore, UserScore, Score, Task}