import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface initialStatetype {
    fullCode: {
        html: string,
        css: string,
        javascript: string,
    };
    currlanguage: "html" | "css" | "javascript",
    isOwner: boolean
}
const initialState: initialStatetype = {
    fullCode: {
        html: `<html lang="en">
        <body>
            <div class="container">
                <h1>Todo App</h1>
                <input type="text" id="todoInput" placeholder="Add a new todo">
                <button onclick="addTodo()">Add Todo</button>
                <ul id="todoList"></ul>
            </div>
            <script src="script.js"></script>
        </body>
</html>`,
        css: `body {
            font-family: Arial, sans-serif;
            background-color: #6a5acd;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        
        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            box-sizing: border-box;
        }
        
        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        
        button:hover {
            background-color: #0056b3;
        }
        
        ul {
            list-style-type: none;
            padding: 0;
        }
        
        li {
            background-color: #f9f9f9;
            padding: 10px;
            margin-bottom: 5px;
            border-radius: 5px;
        }
        
        .delete-btn {
            float: right;
            background-color: #dc3545;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }`,
        javascript: `const todoInput = document.getElementById('todoInput');
        const todoList = document.getElementById('todoList');
        
        function addTodo() {
            const todoText = todoInput.value.trim();
            if (todoText !== '') {
                const li = document.createElement('li');
                li.textContent = todoText;
        
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.onclick = function() {
                    li.remove();
                };
        
                li.appendChild(deleteBtn);
                todoList.appendChild(li);
        
                todoInput.value = '';
            }
        }
        `,
    },
    currlanguage: "html",
    isOwner: false


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
        updateIsOwner: (state, action: PayloadAction<boolean>) => {
            state.isOwner = action.payload;
        },
        updateFullCode: (state, action: PayloadAction<initialStatetype["fullCode"]>) => {
            state.fullCode = action.payload;
        }

    }
})

export default compilerSlice.reducer;
export const { updateCurrLanguage, updateCodeValue, updateIsOwner, updateFullCode } = compilerSlice.actions;