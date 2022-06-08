import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

export const login = createAsyncThunk('auth/login',async({formValue,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.signIn(formValue);
        toast.success('Login Successfully');
        navigate('/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const register = createAsyncThunk('auth/register',async({formValue,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.signUp(formValue);
        toast.success('Register Successfully');
        navigate('/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const googleSignIn = createAsyncThunk('auth/googleSignIn',async({result,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.signUp(result);
        toast.success('Google sign in Successfully');
        navigate('/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// ================Get only user update=================
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile',
    async({id,updatedUser,toast,navigate},{rejectWithValue})=>{
    try {
        const response = await api.updateUserProfile(updatedUser,id);
        toast.success("User updated successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:"",
        loading:false,
    },
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
        },
        setLogout:(state,action)=>{
            state.user=null;
            localStorage.clear();
        }
    },
    extraReducers:{
        [login.pending]:(state,action)=>{
            state.loading = true;
        },
        [login.fulfilled]:(state,action)=>{
            state.fulfilled=false;
            localStorage.setItem('profile',JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [login.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        [register.pending]:(state,action)=>{
            state.loading = true;
        },
        [register.fulfilled]:(state,action)=>{
            state.fulfilled=false;
            localStorage.setItem('profile',JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [register.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        [googleSignIn.pending]:(state,action)=>{
            state.loading = true;
        },
        [googleSignIn.fulfilled]:(state,action)=>{
            state.fulfilled=false;
            localStorage.setItem('profile',JSON.stringify({...action.payload}));
            state.user = action.payload;
        },
        [googleSignIn.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },

        // =============For User update==========
        [updateUserProfile.pending]:(state,action)=>{
            state.loading = true;
        },
        [updateUserProfile.fulfilled]:(state,action)=>{
            state.loading=false;
            const {arg:{id}} = action.meta;
            if(id){
                state.userContests = state.userContests.filter((item)=>item._id !== id);
                state.contests = state.contests.filter((item)=>item._id !== id);
            }
        },
        [updateUserProfile.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
    },
});

export const {setUser,setLogout} =authSlice.actions;
export default authSlice.reducer;