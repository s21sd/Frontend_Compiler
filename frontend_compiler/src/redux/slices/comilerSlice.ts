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
        html: `<html lang="en">
        <body>
            <div class="container">
               <h1>Start Building</h1>
            </div>
            <script src="script.js"></script>
        </body>
</html>`,
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
        updateCodeValue: (state, action: PayloadAction<string>) => {
            state.fullCode[state.currlanguage] = action.payload;
        },

    }
})

export default compilerSlice.reducer;
export const { updateCurrLanguage, updateCodeValue } = compilerSlice.actions;