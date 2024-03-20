import { useGetMyCodesQuery } from '@/redux/api'
import { Link } from 'react-router-dom';
import CodeItem from '@/components/Codeitems';

const Mycodes = () => {
    const { data: myCodes } = useGetMyCodesQuery();

    return myCodes ? (
        <div className="p-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-3">
            {myCodes?.map((item: any) => {
                return (

                    <CodeItem deleteBtn={true} key={item._id} data={item} />
                );
            })}
        </div>

    ) : (
        <>
            <p className="text-center font-mono text-slate-600 p-3">
                You don't have any saved codes. <Link to="/compiler">Create One</Link>
            </p>
        </>
    )
}

export default Mycodes