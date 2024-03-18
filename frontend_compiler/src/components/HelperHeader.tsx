import { Button } from './ui/button'
import { Code, Download, Loader, Save, Share2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CopyIcon } from "@radix-ui/react-icons"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from 'react-redux'
import { initialStatetype, updateCurrLanguage } from '@/redux/slices/comilerSlice'
import { RootState } from '@/redux/store'
import { HandleErrors } from '@/utils/HandleErrors'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useSaveCodeMutation } from '@/redux/api'
const HelperHeader = () => {
    const { urlId } = useParams();
    const dispathch = useDispatch();
    const navigator = useNavigate();
    const currLangValue = useSelector((state: RootState) => state.comilerSlice.currlanguage)
    const fullCode = useSelector((state: RootState) => state.comilerSlice.fullCode);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [shareBtn, setShareBtn] = useState<boolean>(false);
    const [saveCode, { isLoading }] = useSaveCodeMutation();
    useEffect(() => {
        if (urlId) {
            setShareBtn(true)
        }
        else {
            setShareBtn(false)
        }
    }, [urlId])

    const HandleSave = async () => {
        setSaveLoading(true)
        try {
            const res = await saveCode(fullCode).unwrap();
            setSaveLoading(false)
            navigator(`/compile/${res.url}`, { replace: true })


        } catch (error) {

            setSaveLoading(false)
            HandleErrors(error);
        }
    }
    const downloadAllTheCodes = async () => {
        if (fullCode.html === "" && fullCode.css === "" && fullCode.javascript === "") {
            toast("Error: Code is Empty")
        } else {

            const htmlCode = new Blob([fullCode.html], { type: 'text/html' })
            const cssCode = new Blob([fullCode.css], { type: 'text/css' })
            const jsCode = new Blob([fullCode.javascript], { type: 'text/javascript' })

            const htmlLink = document.createElement('a');
            const cssLink = document.createElement('a');
            const javascriptLink = document.createElement('a');

            htmlLink.href = URL.createObjectURL(htmlCode)
            htmlLink.download = "index.html";
            document.body.appendChild(htmlLink);


            cssLink.href = URL.createObjectURL(cssCode)
            cssLink.download = "styles.css";
            document.body.appendChild(cssLink);


            javascriptLink.href = URL.createObjectURL(jsCode)
            javascriptLink.download = "script.js";
            document.body.appendChild(javascriptLink);


            if (fullCode.html !== "") {

                htmlLink.click();
            }
            if (fullCode.css !== "") {

                cssLink.click();
            }
            if (fullCode.javascript !== "") {

                javascriptLink.click();
            }

            document.body.removeChild(htmlLink)
            document.body.removeChild(cssLink)
            document.body.removeChild(javascriptLink)

            toast("Code Downloaded Successfully!")
        }
    }

    const copyURL = () => {
        window.navigator.clipboard.writeText(window.location.href);
        toast("Url copy to clipboard !")
    }

    return (
        <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
            <div className="__btn_container flex gap-1">

                <Button onClick={HandleSave} className='flex justify-center items-center gap-1' variant="success"> {saveLoading ? <><Loader size={16} /></> : <> <Save size={16} /></>}</Button>
                <Button><Download onClick={downloadAllTheCodes} size={16} /></Button>


                {
                    shareBtn && <Dialog>
                        <DialogTrigger asChild>
                            <Button className='flex justify-center items-center gap-1' variant="secondary"><Share2 size={16} /></Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle><div className='flex justify-center items-center gap-1'>

                                    Share your Code! <Code /></div> </DialogTitle>
                                <DialogDescription>
                                    Share this URL with your friend to collaborate
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Input
                                        id="link"
                                        value={window.location.href}

                                    />
                                </div>
                                <Button onClick={copyURL} type="submit" size="sm" className="px-3">
                                    <span className="sr-only">Copy</span>
                                    <CopyIcon className="h-4 w-4" />
                                </Button>
                            </div>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                }



            </div>
            <div className='__tab_switcher flex justify-center items-center gap-2'>
                <p>
                    Current Language:
                </p>
                <Select defaultValue={currLangValue} onValueChange={(value) => dispathch(updateCurrLanguage(value as initialStatetype["currlanguage"]))}>
                    <SelectTrigger className="w-[120px] bg-gray-800 outline focus:ring-0">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="html">HTML</SelectItem>
                            <SelectItem value="css">CSS</SelectItem>
                            <SelectItem value="javascript">JavaScript</SelectItem>

                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default HelperHeader