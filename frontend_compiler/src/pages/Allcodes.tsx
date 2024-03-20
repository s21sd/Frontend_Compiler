import CodeItem from "@/components/Codeitems";
import { useGetAllCodesQuery } from "@/redux/api";


export default function Allcodes() {
    const { data: allCodes } = useGetAllCodesQuery();
    return allCodes?.length !== 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3 p-3">
            {allCodes?.map((codeItem) => {
                return (
                    <CodeItem deleteBtn={false} key={codeItem._id} data={codeItem} />
                );
            })}
        </div>
    ) : (
        <p className="block w-full text-slate-500 font-mono text-center p-3">No Codes Found!</p>
    );
}