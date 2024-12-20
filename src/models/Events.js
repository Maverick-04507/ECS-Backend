import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const eventSchema= new Schema({
    EventName: {
        type:String,
    },
    EventType:{
        type:String ,
    }
})

eventSchema.plugin(mongooseAggregatePaginate)
export const Event=mongoose.model("Event",eventSchema)