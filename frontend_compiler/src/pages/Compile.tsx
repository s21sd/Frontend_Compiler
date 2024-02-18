import Codeeditor from "@/components/Codeeditor"
import HelperHeader from "@/components/HelperHeader"
import RenderCode from "@/components/RenderCode"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
const Compile = () => {

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