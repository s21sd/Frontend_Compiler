import mongoose from "mongoose";
interface initialStatetype {
    fullCode: {
        html: string,
        css: string,
        javascript: string,
    };

}
const codeSchema = new mongoose.Schema({
    fullCode: {
        html: String,
        css: String,
        javascript: String,
    },
})

export const Code = mongoose.model("CodeSchema", codeSchema);