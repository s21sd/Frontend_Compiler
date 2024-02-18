import React from 'react'
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateCodeValue } from '@/redux/slices/comilerSlice';

const Codeeditor = () => {
    const dispatch = useDispatch();
    const currLangValue = useSelector((state: RootState) => state.comilerSlice.currlanguage);
    const fullCode = useSelector((state: RootState) => state.comilerSlice.fullCode)
    const onChange = React.useCallback((val: string) => {
        dispatch(updateCodeValue({
            language: currLangValue,
            code: val
        }))
    }, []);
    return (
        <CodeMirror
            value={fullCode[currLangValue]}
            height="100vh"
            width='50vw'
            extensions={[loadLanguage(currLangValue)!]}
            onChange={onChange}
            theme={draculaInit({
                settings: {
                    caret: '#c6c6c6',
                    fontFamily: 'monospace',
                },
                styles: [
                    { tag: t.comment, color: '#6272a4' },
                ]
            })}
        />
    )
}

export default Codeeditor