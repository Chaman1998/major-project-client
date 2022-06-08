import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './feature/authSlice';
import ContestReducer from "./feature/contestSlice";

export default configureStore({
    reducer:{
        auth: AuthReducer,
        contest:ContestReducer,
    },
});