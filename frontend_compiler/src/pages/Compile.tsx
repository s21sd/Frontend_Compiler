import Codeeditor from "@/components/Codeeditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useLoadCodeMutation } from "@/redux/api"
import { updateFullCode } from "@/redux/slices/comilerSlice"
import { HandleErrors } from "@/utils/HandleErrors"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
const Compile = () => {
    const dispatch = useDispatch()
    const { urlId } = useParams();
    const [loadExistingCode, { isLoading }] = useLoadCodeMutation();

    const loadCode = async () => {
        try {
            if (urlId) {
                const res = await loadExistingCode({ urlId }).unwrap();
                dispatch(updateFullCode(res.fullcode))

            }

        } catch (error) {
           
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