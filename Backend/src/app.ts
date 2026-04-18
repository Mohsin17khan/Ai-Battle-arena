import express, { response } from 'express';
import runGraph from './ai/graph.ai.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
    origin:"http://localhost:5174",
    credentials:true,
    methods:["GET","POST"]
}));


app.get('/', async (req, res) => {
    const result = await runGraph("what is the best way to Learn programming?")
    res.json(result);
});

app.post("/invoke", async ( req, res ) => {
    const { input } = req.body;

    const result = await runGraph(input);

    res.status(201).json({
        message:"Graph invoked successfully",
        result,
        response:true
    }
    )
});


export default app




