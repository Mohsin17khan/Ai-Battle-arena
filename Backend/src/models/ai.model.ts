import mongoose, { Document, Schema } from "mongoose";

// 1. Interface
export interface IBattle extends Document {
  problem: string;
  solution_1: string;
  solution_2: string;
  judge: {
    solution_1_score: number;
    solution_2_score: number;
    solution_1_reasoning: string;
    solution_2_reasoning: string;
  };
}

// 2. Schema
const BattleSchema = new Schema<IBattle>({
  problem: { type: String, required: true },
  solution_1: { type: String, required: true },
  solution_2: { type: String, required: true },
  judge: {
    solution_1_score: Number,
    solution_2_score: Number,
    solution_1_reasoning: String,
    solution_2_reasoning: String,
  },
}, { timestamps: true });

// 3. Model
export const Battle = mongoose.model<IBattle>("Battle", BattleSchema);