import { toast } from "sonner"

export const HandleErrors = (error: any) => {
    console.log(error.data.message)
    toast(error.data.message);
}