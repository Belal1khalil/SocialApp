import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user.slice";

 export const myStore = configureStore ({
    reducer:{
        userReducer,
        
    }
 })