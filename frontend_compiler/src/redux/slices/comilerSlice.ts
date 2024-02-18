import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface initialStatetype {
    fullCode: {
        html: string,
        css: string,
        javascript: string,
    };
    currlanguage: "html" | "css" | "javascript",
}
const initialState: initialStatetype = {
    fullCode: {
        html: "",
        css: "",
        javascript: "",
    },
    currlanguage: "html",


};
const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrLanguage: (state, action: PayloadAction<initialStatetype["currlanguage"]>) => {
            state.currlanguage = action.payload
        },
        updateCodeValue: (state, action: PayloadAction<{ language: initialStatetype["currlanguage"]; code: string }>) => {
            const { code, language } = action.payload;
            state.fullCode[language] = code;
        },


    }
})

export default compilerSlice.reducer;
export const { updateCurrLanguage, updateCodeValue } = compilerSlice.actions;