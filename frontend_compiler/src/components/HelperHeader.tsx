
import { Button } from './ui/button'
import { Save, Share2 } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useDispatch, useSelector } from 'react-redux'
import { initialStatetype, updateCurrLanguage } from '@/redux/slices/comilerSlice'
import { RootState } from '@/redux/store'
const HelperHeader = () => {
    const dispathch = useDispatch();
    const currLangValue = useSelector((state: RootState) => state.comilerSlice.currlanguage)
    return (
        <div className="__helper_header h-[50px] bg-black text-white p-2 flex justify-between items-center">
            <div className="__btn_container flex gap-1">
                <Button className='flex justify-center items-center gap-1' variant="success"><Save size={16} /> Save</Button>
                <Button className='flex justify-center items-center gap-1' variant="secondary"><Share2 size={16} /> Share</Button>
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