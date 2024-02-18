import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const RenderCode = () => {
    const fullCode = useSelector(
        (state: RootState) => state.comilerSlice.fullCode
    );
    console.log(fullCode.css)
    console.log(fullCode.html)
    const combinedCode = `<html><style>${fullCode.css}</style><body>${fullCode.html}</body><script>${fullCode.javascript}</script></html>`;

    const iframeCode = `data:text/html;charset=utf-8,${encodeURIComponent(
        combinedCode
    )}`;
    return (
        <div className='bg-white h-[calc(100dvh-60px)]'>
            <iframe className='w-full h-full' src={iframeCode} />
        </div>
    )
}

export default RenderCode