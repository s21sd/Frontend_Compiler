import Codeeditor from "@/components/Codeeditor"
import HelperHeader from "@/components/HelperHeader"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
const Compile = () => {
    const html = useSelector((state: RootState) => state.comilerSlice.html)
    // console.log(html);
    return (
        <ResizablePanelGroup
            direction="horizontal"
            className=""
        >
            <ResizablePanel defaultSize={50} className="h-[calc(100dvh-60px)] min-w-[350px]">

                <HelperHeader />
                <Codeeditor />

            </ResizablePanel>
            <ResizableHandle />

            <ResizablePanel defaultSize={50}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam porro ea, recusandae doloribus ex autem quidem aut culpa est ut inventore explicabo dignissimos quis voluptatem, officiis animi voluptate quo velit?
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default Compile