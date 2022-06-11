import React,{useEffect} from 'react';
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTypography, MDBIcon, MDBModalTitle } from 'mdb-react-ui-kit';
import { useDispatch,useSelector } from 'react-redux';
import { deleteContests, getContests, postUploadedFiles } from '../redux/feature/contestSlice';
import CardContest from '../components/CardContest';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";

const Dashboard = () => {
  const {contests,loading} = useSelector((state)=>({...state.contest}));
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getContests());
  },[]);

  if(loading){
    return <Spinner />
  }
  console.log(contests);

  const handleSubmit = (e) => {
    e.preventDefault();

    const profile = JSON.parse(localStorage.getItem('profile'))

    let data = [];

    contests.forEach((contest) => {
      data.push({
        title: contest.title,
        writing: contest.writing,
        name: `${contest.fname} ${contest.lname}`,
        creator: contest.creator,
        tags: contest.tags,
        imageFile: contest.imageFile,
        createdAt: new Date()
      })
    })

    dispatch(postUploadedFiles({  
      filecreator: profile.result.email,
      filecreatedAt: new Date(),
      fileImage: "Some Image Url",
      data: data,
      navigate,
      toast
  }))

 // dispatch(deleteContests())

    
  }
  
  return (
    <div style={{margin:'auto',padding:'15px',maxWidth:'10000px',alignContent:'center'}}>
      <MDBRow className='mt-5 pt-4'>
        <MDBContainer className='mt-2' style={{textAlign: 'center'}}>
          <Link to='/finalsubmit'>
            <MDBBtn onClick={handleSubmit}>Submit</MDBBtn>
          </Link>
        </MDBContainer>
      </MDBRow>
      
      <MDBRow className='mt-5 pt-3'>
        {contests.length===0 && (
          <MDBTypography className='text-center mb-0' tag='h2'>
            No Tours Found
          </MDBTypography>
        )}
        <MDBCol>
          <MDBContainer>
            <MDBRow className="row-cols-1 row-cols-md-4 g-2">
              {contests && contests.map((item,index) => <CardContest key={index} {...item} />)}
            </MDBRow>
          </MDBContainer>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default Dashboard