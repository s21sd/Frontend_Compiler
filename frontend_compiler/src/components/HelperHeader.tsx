import axios from 'axios'
import { Button } from './ui/button'
import { Code, Loader, Save, Share2 } from "lucide-react"
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
const HelperHeader = () => {
    const { urlId } = useParams();
    const dispathch = useDispatch();
    const navigator = useNavigate();
    const currLangValue = useSelector((state: RootState) => state.comilerSlice.currlanguage)
    const fullCode = useSelector((state: RootState) => state.comilerSlice.fullCode);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [shareBtn, setShareBtn] = useState<boolean>(false);
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
            const response = await axios.post("http://localhost:4000/compile/save", {
                fullcode: {
                    "html": fullCode.html,
                    "css": fullCode.css,
                    "javascript": fullCode.javascript
                }
            })
            navigator(`/compile/${response.data.url}`, { replace: true })
            setSaveLoading(false)
            console.log(response.data);
        } catch (error) {
            HandleErrors(error);
        }
    }

    const copyURL = () => {
        window.navigator.clipboard.writeText(window.location.href);
        toast("Url copy to clipboard !")
    }

    return (
        <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
            <div className="__btn_container flex gap-1">

                <Button onClick={HandleSave} className='flex justify-center items-center gap-1' variant="success"> {saveLoading ? <><Loader size={16} />saving</> : <> <Save size={16} /> Save</>}</Button>

                {
                    shareBtn && <Dialog>
                        <DialogTrigger asChild>
                            <Button className='flex justify-center items-center gap-1' variant="secondary"><Share2 size={16} /> Share</Button>
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