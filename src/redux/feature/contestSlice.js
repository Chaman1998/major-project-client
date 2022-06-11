import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

// ================Post Contest=================
export const createContest = createAsyncThunk('contest/createContest',
    async({updatedContData,navigate,toast},{rejectWithValue})=>{
    try {
        const response = await api.createContest(updatedContData);
        toast.success('Content added Successfully');
        navigate('/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
// ================Get All Contest=================
export const getContests = createAsyncThunk('contest/getContests',
    async(_,{rejectWithValue})=>{
    try {
        const response = await api.getContests();
        // console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// ================Get one Content=================
export const getContest = createAsyncThunk('contest/getContest',
    async(id,{rejectWithValue})=>{
    try {
        const response = await api.getContest(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getUploadedFiles = createAsyncThunk('users/getFiles',
    async(_,{rejectWithValue})=>{
    try {
        const response = await api.getUploadedFiles();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// ================Get only user contents=================
export const getContestsByUser = createAsyncThunk('contest/getContestsByUser',
    async(userId,{rejectWithValue})=>{
    try {
        const response = await api.getContestsByUser(userId);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// ================Get only user delete Contents=================
export const deleteContest = createAsyncThunk('contest/deleteContest',
    async({id,toast},{rejectWithValue})=>{
    try {
        const response = await api.deleteContest(id);
        toast.success("contest deleted successfully");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const deleteContests = createAsyncThunk('users/deleteContests',
    async({ toast },{rejectWithValue})=>{
    try {
        const response = await api.deleteContests();
        toast.success("contest deleted successfully");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

// ================Get only user update Contents=================
export const updateContest = createAsyncThunk('contest/updateContest',
    async({id,updatedContData,toast,navigate},{rejectWithValue})=>{
    try {
        const response = await api.updateContest(updatedContData,id);
        toast.success("Content updated successfully");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const postUploadedFiles = createAsyncThunk('contest/uploadFiles',
    async({ filecreator, filecreatedAt, fileImage, data,navigate,toast},{ rejectWithValue })=>{
    try {
        const response = await api.postUploadedFiles({ filecreator, filecreatedAt, fileImage, data });
        toast.success('Content added Successfully');
        navigate('/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const contestSlice = createSlice({
    name:"contest",
    initialState:{
        contest:{},
        contests:[],
        files: [],
        userContests:[],
        error:"",
        loading:false,
    },

    extraReducers:{
        [createContest.pending]:(state,action)=>{
            state.loading = true;
        },
        [createContest.fulfilled]:(state,action)=>{
            state.loading=false;
            state.contests = [action.payload];
        },
        [createContest.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        [postUploadedFiles.pending]:(state,action) => {
            state.loading = true;
        },
        [postUploadedFiles.fulfilled]:(state,action)=>{
            state.loading=false;
            state.contests = [action.payload];
        },
        [postUploadedFiles.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },

        [getContests.pending]:(state,action)=>{
            state.loading = true;
        },
        [getContests.fulfilled]:(state,action)=>{
            state.loading=false;
            state.contests = action.payload;
        },
        [getContests.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        // =============get one content===============
        [getContest.pending]:(state,action)=>{
            state.loading = true;
        },
        [getContest.fulfilled]:(state,action)=>{
            state.loading=false;
            state.contest = action.payload;
        },
        [getContest.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        [getUploadedFiles.pending]:(state,action)=>{
            state.loading = true;
        },
        [getUploadedFiles.fulfilled]:(state,action)=>{
            state.loading=false;
            state.files = action.payload;
        },
        [getUploadedFiles.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },

        [getContestsByUser.pending]:(state,action)=>{
            state.loading = true;
        },
        [getContestsByUser.fulfilled]:(state,action)=>{
            state.loading=false;
            state.userContests = action.payload;
        },
        [getContestsByUser.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        // =============For contests delete==========
        [deleteContest.pending]:(state,action)=>{
            state.loading = true;
        },
        [deleteContest.fulfilled]:(state,action)=>{
            state.loading=false;
            console.log("action",action);
            const {arg:{id}} = action.meta;
            if(id){
                state.userContests = state.userContests.filter((item)=>item._id !== id);
                state.contests = state.contests.filter((item)=>item._id !== id);
            }
        },
        [deleteContest.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        [deleteContests.pending]:(state,action)=>{
            state.loading = true;
        },
        [deleteContests.fulfilled]:(state,action)=>{
            state.loading=false;
        },
        [deleteContests.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
        // =============For contests update==========
        [updateContest.pending]:(state,action)=>{
            state.loading = true;
        },
        [updateContest.fulfilled]:(state,action)=>{
            state.loading=false;
            console.log("action",action);
            const {arg:{id}} = action.meta;
            if(id){
                state.userContests = state.userContests.map((item)=>item._id === id ? action.payload : item);
                state.contests = state.contests.map((item)=>item._id === id ? action.payload : item);
            }
        },
        [updateContest.rejected]:(state,action)=>{
            state.loading=false;
            state.error=action.payload.message;
        },
    },
});

export default contestSlice.reducer;