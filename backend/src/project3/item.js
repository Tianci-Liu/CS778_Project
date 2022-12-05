import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    input : String,
    output : String,
    rank: Number,
    comment: String
});

export default mongoose.model('project3', itemSchema);
