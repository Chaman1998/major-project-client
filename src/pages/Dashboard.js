import React,{useEffect} from 'react';
import { MDBBtn, MDBCol, MDBContainer, MDBRow, MDBTypography, MDBIcon, MDBModalTitle } from 'mdb-react-ui-kit';
import { useDispatch,useSelector } from 'react-redux';
import { getContests } from '../redux/feature/contestSlice';
import CardContest from '../components/CardContest';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const {contests,loading} = useSelector((state)=>({...state.contest}));
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getContests());
  },[]);

  if(loading){
    return <Spinner />
  }
  console.log(contests);
  
  return (
    <div style={{margin:'auto',padding:'15px',maxWidth:'10000px',alignContent:'center'}}>
      <MDBRow className='mt-5 pt-4'>
        <MDBContainer className='mt-2' style={{textAlign: 'center'}}>
          <Link to='/finalsubmit'>
            <MDBBtn>Submit</MDBBtn>
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