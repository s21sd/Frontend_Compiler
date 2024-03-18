import mongoose from "mongoose";
interface IcodeSchema {
    fullCode: {
        html: string,
        css: string,
        javascript: string,
    };
    ownerInfo: mongoose.Schema.Types.ObjectId | string;
    ownerName: string;


}
const codeSchema = new mongoose.Schema<IcodeSchema>({
    fullCode: {
        html: String,
        css: String,
        javascript: String,
    },
    ownerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    ownerName: String
})

export const Code = mongoose.model("Code", codeSchema);