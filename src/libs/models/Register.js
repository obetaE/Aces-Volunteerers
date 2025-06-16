import mongoose, {Schema, models} from "mongoose"

const RegisterSchema = new Schema({
    fullname: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    expectation: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Register = models.Register || mongoose.model("Register", RegisterSchema);
export default Register;