import { MDBBtn, MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react'
import {useDispatch,useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Spinner from '../components/Spinner';
import { getContestsByUser,deleteContest } from '../redux/feature/contestSlice';
import {toast} from "react-toastify";

const Posts = () => {
  const {user} = useSelector((state)=>({...state.auth}));
  const {userContests,loading} = useSelector((state) => ({...state.contest}));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  console.log(userContests.length);
  useEffect(()=>{
    if(userId){
      dispatch(getContestsByUser(userId));
      console.log(userId);
    }
  },[userId]);

  const excerpt = (str) =>{
    if(str.length>40){
        str = str.substring(0,40) + " ...";
    }
    return str;
  }
  if(loading){
    return <Spinner />
  }
  const handleDelete=(id)=>{
    if(window.confirm("Are you sure you want to delete?")){
      dispatch(deleteContest({id,toast}));
    }
  }
  return (
    <div style={{margin:"auto",padding:'100px',maxWidth:'900px',alignContent:'center'}}>
      <h4 className="text-center">Posts: {user?.result?.name}</h4>
      <hr style={{maxWidth:"570px"}}/>
      {userContests && userContests.map((item)=>(
        <MDBCardGroup>
          <MDBCard style={{maxWidth:"600px"}} key={item._id} className="mt-2">
            <MDBRow className='g-0'>
              <MDBCol md="4">
                <MDBCardImage className='rounded' src={item.imageFile} alt={item.title} fluid />
              </MDBCol>
              <MDBCol md='8'>
                <MDBCardBody>
                  <MDBCardTitle className='text-start'>
                    {item.title}
                  </MDBCardTitle>
                  <MDBCardText className='text-start'>
                    <small className='text-muted'>
                      {excerpt(item.writing)}
                    </small>
                  </MDBCardText>
                  <div style={{marginLeft:"5px",float:"right",marginTop:"-60px"}}>
                    <MDBBtn className='mt-1' tag='a' color="none">
                      <MDBIcon fas icon="trash" style={{color:"#dd4b39"}} size="lg" onClick={()=>handleDelete(item._id)}/>
                    </MDBBtn>
                    <Link to={`/addcontest/${item._id}`}>
                      <MDBIcon fas icon="edit" style={{color:"#55acee",marginLeft:"10px"}} size="lg"/>
                    </Link>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCardGroup>
      )
      )}
    </div>
  )
}

export default Posts