import { useEffect } from 'react';
import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import {useDispatch} from "react-redux";
import {setUser} from "./redux/feature/authSlice";
import AddEditContest from './pages/AddEditContest';
import SingleContent from './pages/SingleContest';
import Posts from './pages/Posts';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(()=>{
    dispatch(setUser(user));
  },[]);

  return (
    <div className='App'>
      <Header />
      <ToastContainer />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin' element={<Dashboard />} />

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/addcontest' element={
              <PrivateRoute>
                <AddEditContest />
              </PrivateRoute>} />
            <Route path='/addcontest/:id' element={
              <PrivateRoute>
                <AddEditContest />
              </PrivateRoute>} />
            <Route path='/contest/:id' element={<SingleContent />} />
            <Route path='/posts' element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>} />
            <Route path='/profile' element={<Profile />} />
          </Routes>
    </div>
  );
}

export default App;
