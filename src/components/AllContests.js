import { MDBCard, MDBCardBody, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardTitle, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import React from 'react'
import {Link} from "react-router-dom";
import { deleteContest } from '../redux/feature/contestSlice';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify";

const AllContests = ({imageFile,writing ,title, tags,_id,name}) => {
    const dispatch = useDispatch();
    const excerpt = (str) =>{
        if(str.length>45){
            str = str.substring(0,45) + " ..."
        }else{
            str =str + "     "
        }
        return str;
    }
    const handleDelete=(id)=>{
        if(window.confirm("Are you sure you want to delete?")){
          dispatch(deleteContest({id,toast}));
        }
      }
  return (
    <MDBCardGroup>
        <MDBCard className='h-100 d-sm-flex' style={{maxWidth:'20rem'}}>
            <MDBCardImage src={imageFile} alt={title} position='top' style={{maxwidth:'100%',height:'180px'}}/>
            <div className="top-left">{name}</div>
            <span className="text-start tag-card">
                {tags.map((item)=>`#${item} `)}
            </span>
           <MDBCardBody>
               <MDBCardTitle className='text-start'>{title}</MDBCardTitle>
               <MDBCardText className='text-start'>{excerpt(writing)}
                <Link to={`/contest/${_id}`}>
                    read more
                </Link>
               </MDBCardText>
               
               <MDBBtn className='mt-1 top-right' tag='a' color="none">
                    <MDBIcon fas icon="trash" style={{color:"#dd4b39"}} size="lg" 
                        onClick={()=>handleDelete(_id)}
                    />
                </MDBBtn>
           </MDBCardBody> 
        </MDBCard>
    </MDBCardGroup>
  )
}

export default AllContests