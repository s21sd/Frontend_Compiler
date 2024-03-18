import { Request, Response } from "express";
import { Code } from "../models/Code";
import { AuthRequest } from "../middlewares/verifyTokenAnonynomous";
import { User } from "../models/User";

export const saveCode = async (req: AuthRequest, res: Response) => {
    const { html, css, javascript, title } = req.body;

    let ownerName = "Anonymous";
    let ownerInfo = undefined
    let user = undefined
    let isAuthenicated = false
    
    if (req._id) {
        user = await User.findById(req._id)
        if (!user) {
            return res.status(404).send({ message: "User not found!" })
        }
        ownerName = user?.username
        ownerInfo = user._id
        isAuthenicated = true
    }
    // console.log(req.body);
    console.log(title);
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
            },
            ownerName: ownerName,
            ownerInfo: ownerInfo,
            title: title
        })
        if (isAuthenicated && user) {
            console.log(newCode)
            user?.savedCodes.push(newCode._id);
            await user.save();
        }
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



export const getMyCodes = async (req: AuthRequest, res: Response) => {
    const userId = req._id;
    try {
        const user = await User.findById(userId).populate({
            path: "savedCodes",
            options: { sort: { createdAt: -1 } },
        });

        if (!user) {
            return res.status(404).send({ message: "Cannot find User!" });
        }
        return res.status(200).send(user.savedCodes);
    } catch (error) {
        return res.status(500).send({ message: "Error loading my codes!", error });
    }
};