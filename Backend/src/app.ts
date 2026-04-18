import express, { response } from 'express';
import runGraph from './ai/graph.ai.js';
import cors from 'cors';
import { Battle } from './models/ai.model.js';


const app = express();
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST", "DELETE"]
}));


app.get('/', async (req, res) => {
    const result = await runGraph("what is the best way to Learn programming?")
    res.json(result);
});

app.post("/invoke", async ( req, res ) => {
    const { input } = req.body;
    const result = await runGraph(input);

    const aibattle = await Battle.create({
    problem: input,
    solution_1: result.solution_1,
    solution_2: result.solution_2,
    judge: {    
        solution_1_score: result.judge.solution_1_score,
        solution_2_score: result.judge.solution_2_score,
        solution_1_reasoning: result.judge.solution_1_reasoning,
        solution_2_reasoning: result.judge.solution_2_reasoning,
}});


    res.status(201).json({
        message:"Graph invoked successfully",
        result,
        aibattle,
        response:true
    }
    )
});


app.get('/aiQuestions', async ( req, res) => {
    const battles = await Battle.find()
    res.status(200).json({
        message:"AI Questions retrieved successfully",
        battles,
        response:true
    });
});

app.delete("/delete/:id", async ( req, res ) => {
    
    await Battle.findByIdAndDelete(req.params.id);
    res.status(200).json({      

        message:" deleted successfully",
        response:true
    });
}); 


export default app




