import axios from 'axios';

const API = axios.create({baseURL:"http://localhost:5000"});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});

export const signIn = (formData) => API.post('/users/signin',formData);
export const signUp = (formData) => API.post('/users/signup',formData);
export const googleSignIn = (result) => API.post('/users/googleSignIn',result);
export const updateUserProfile = (updatedUser,id) => API.patch(`/users/profile/${id}`,updatedUser);

export const createContest = (contestData) => API.post("/contest",contestData);
export const getContests = () => API.get("/contest");
export const getContest = (id) => API.get(`/contest/${id}`);
export const deleteContest = (id) => API.delete(`/contest/${id}`);
export const updateContest = (updatedContData,id) => API.patch(`/contest/${id}`,updatedContData);
export const getContestsByUser = (userId) => API.get(`/contest/userContests/${userId}`); //id== user id