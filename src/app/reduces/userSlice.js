import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        // id: "",
        // photoURL: "",
        // name: "",
        // email: "",
    }
}

export const userSlice = createSlice({
    name: 'user', // Đây là tên của reducer này, nó sẽ được dùng làm định danh trong file store.js
    initialState, //Giá trị khởi tạo của state
    reducers: {
        setUser: (state, action) => {
            state.value = action.payload;
        },
        clearUser: (state) => {
            state.value = {
                // id: "",
                // photoURL: "",
                // name: "",
                // email: "",
            };
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer