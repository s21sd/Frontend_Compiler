import { Request, Response } from "express";
import { Code } from "../models/Code";

export const saveCode = async (req: Request, res: Response) => {
    // console.log(req.body);
    const { html, css, javascript } = req.body;
    if (!html && !css && !javascript) {
        return res.status(404).send({ message: "Code can not be blank!" })
    }
    // console.log(html, css, javascript);
    try {
        const newCode = await Code.create({
            fullCode: {
                html,
                css,
                javascript
            }
        })
        return res.status(201).send({ url: newCode._id, status: "Saved" })
    } catch (error) {
        return res.status(500).send({ message: "Error in the Saving code", error });
    }
}
export const loadCode = async (req: Request, res: Response) => {
    const { urlId } = req.body;
    try {
        const existingCode = await Code.findById(urlId);
        if (!existingCode) {

            return res.status(401).send({ message: "code not found" });
        }
        return res.status(201).send({
            fullcode: existingCode.fullCode
        })
    } catch (error) {
        return res.status(500).send({ message: "Error in the Loading code", error });

    }

}
