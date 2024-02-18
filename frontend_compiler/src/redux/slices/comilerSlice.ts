import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface initialStatetype {
    html: string,
    css: string,
    javascript: string,
    currlanguage: "html" | "css" | "javascript";
}
const initialState: initialStatetype = {
    html: "",
    css: "",
    javascript: "",
    currlanguage: "html",

};
const compilerSlice = createSlice({
    name: "compilerSlice",
    initialState,
    reducers: {
        updateCurrLanguage: (state, action: PayloadAction<initialStatetype["currlanguage"]>) => {
            state.currlanguage = action.payload
        }
    }
})

export default compilerSlice.reducer;
export const { updateCurrLanguage } = compilerSlice.actions;