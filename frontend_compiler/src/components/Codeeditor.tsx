import React from 'react'
import { tags as t } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import { loadLanguage } from '@uiw/codemirror-extensions-langs';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const Codeeditor = () => {
    const currLangValue = useSelector((state: RootState) => state.comilerSlice.currlanguage)
    const [value, setValue] = React.useState("console.log('hello world!');");
    const onChange = React.useCallback((val: any) => {
        console.log('val:', val);
        setValue(val);
    }, []);
    return (
        <CodeMirror
            value={value}
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