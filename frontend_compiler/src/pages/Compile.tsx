import Codeeditor from "@/components/Codeeditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { updateFullCode } from "@/redux/slices/comilerSlice"
import { HandleErrors } from "@/utils/HandleErrors"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
const Compile = () => {
    const dispatch = useDispatch()
    const { urlId } = useParams();

    const loadCode = async () => {
        try {
            const response = await axios.post("http://localhost:4000/compile/load", {
                urlId: urlId
            })
            console.log(response.data)
            dispatch(updateFullCode(response.data.fullcode))
            console.log(response)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 500) {
                    toast("Invalid Url,Default Code Loaded")
                }
            }
            HandleErrors(error)
        }

    }
    useEffect(() => {
        if (urlId) {
            loadCode()
        }
    }, [urlId])

    return (
        <ResizablePanelGroup
            direction="horizontal"
        >
            <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px] overflow-auto">
                <div>
                    <HelperHeader />
                </div>
                <Codeeditor />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel className="h-[calc(100dvh-60px)] min-w-[350px] overflow-auto" defaultSize={50}>
                <RenderCode />
            </ResizablePanel>

        </ResizablePanelGroup>
    )
}

export default Compile