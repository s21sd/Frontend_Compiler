import mongoose from "mongoose";
interface IUserSchema {
    username: string
    email: string
    password: string
    picture: string
    savedCodes: Array<{ id: string }>
}
const UserSchema = new mongoose.Schema<IUserSchema>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        picture: {
            type: String,
            default: "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
        },
        savedCodes: [
            { type: mongoose.Schema.Types.ObjectId }
        ]
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
