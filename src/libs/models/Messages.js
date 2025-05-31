import mongoose, {Schema, models} from "mongoose"


const MessageSchema = new Schema({
    firstname: { 
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Messages = models.Messages || mongoose.model("Messages", MessageSchema);
export default Messages;