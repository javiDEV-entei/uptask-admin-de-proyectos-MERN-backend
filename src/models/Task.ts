import mongoose, {Schema, Document} from "mongoose";

export interface ITask extends Document  {
    projectName: string
    description: string

}

export const TaskSchema: Schema = new Schema({
    name:{
        type: String,
        trim: true,
        require: true
    },
    description:{
        type: String,
        trim: true,
        require: true
    },


})

const Task = mongoose.model<ITask>('Task',TaskSchema)