import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Utils/axiosInstance";

const login = createAsyncThunk(
    "auth/login",
    async (data , {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("/auth/login", data);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)


const getUser= createAsyncThunk(
    "auth/getUser",
    async (id , {rejectWithValue}) => {
        const response = await axiosInstance.get(`user/${id}`);
        return response.data;
    }
)
const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
        loginSuccess:false
    },
    reducers:{
        changeLoginSuccess:(state)=>{
            state.loginSuccess=false
        },
        logout:(state)=>{
            state.user=null;
            state.loginSuccess=false;
            localStorage.setItem("isLoggedIn",false);
            localStorage.clear();
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
            state.error=null;
            state.user=action.payload.user;
            console.log(action.payload.user, "user");
            
            localStorage.setItem("user",JSON.stringify(action.payload.user));
            state.loginSuccess=true;
            localStorage.setItem("isLoggedIn",true);
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(getUser.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getUser.fulfilled,(state,action)=>{    
            state.loading=false;
            state.error=null;
            state.user=action.payload.user;
        })
        .addCase(getUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export { login , getUser };
export const { changeLoginSuccess , logout } = authSlice.actions;
export default authSlice.reducer