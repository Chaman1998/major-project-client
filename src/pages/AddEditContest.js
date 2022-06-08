import React, { useState,useEffect } from 'react'
import { MDBBtn, MDBCard, MDBCardBody, MDBValidation } from 'mdb-react-ui-kit';
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import {toast} from "react-toastify";
import {useNavigate,useParams} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { createContest, updateContest } from '../redux/feature/contestSlice';

const initialState ={
    title:"",
    writing:"",
    tags:[]
}
const AddEditContest = () => {

    const [contData,setConstData] = useState(initialState);
    const {error,loading ,userContests} = useSelector((state)=>({...state.contest}));
    const {user} = useSelector((state)=>({...state.auth}));
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {title,writing,tags}= contData;
    const {id} =useParams();

    console.log(userContests);
    useEffect(()=>{
        if(id){
            const singleContest = userContests.find((contest)=>contest._id===id);
            setConstData({...singleContest});
        }
    },[id])

    useEffect(()=>{
        error && toast.error(error);
    },[error])
    
    const handelSubmit= (e) =>{
        e.preventDefault();
        if(title && writing && tags){
            const updatedContData = {...contData,fname:user?.result?.fname,lname:user?.result?.lname};
            try {
                if(!id){
                    dispatch(createContest({updatedContData,navigate,toast}));
                }else{
                    dispatch(updateContest({id,updatedContData,toast,navigate}));
                }
                handelClear();
            } catch (error) {
                console.log(error);
            }
            
        }
    };
    const onInputChange = (e) =>{
        const {name,value} = e.target;
        setConstData({...contData,[name]:value});
    };
    const handelAddTag = (tag) => {
        setConstData({...contData,tags:[...contData.tags,tag]});
    };
    const handelDeleteTag = (deleteTag) => {
        setConstData({...contData,
            tags: contData.tags.filter((tag)=>tag !== deleteTag),
        });
    };
    const handelClear= () => {
        setConstData({title:"",writing:"",tags:[]})
    };
  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}} className='container'>
    <MDBCard alignment='center'>
        <h5>{id ? "Update Content" : "Add Contents"}</h5>
        <MDBCardBody>
            <MDBValidation onSubmit={handelSubmit} className='row g-3' noValidate>
                <div className="col-md-12">
                    <input placeholder='Title' type='text' value={title} name='title' onChange={onInputChange} 
                    className='form-control' required invalid='true' validation='Please provide title' />
                </div>
                <div className="col-md-12">
                    <textarea placeholder='Enter your content' type='text' value={writing} name='writing' onChange={onInputChange} 
                    className='form-control' required invalid='true' validation='Please provide your content' 
                        style={{height:'150px'}}
                    />
                </div>
                <div className="col-md-12">
                    <ChipInput name='tags' variant='outlined' placeholder='Enter Tag' fullWidth value={tags}
                        onAdd={(tag)=>handelAddTag(tag)}
                        onDelete={(tag)=>handelDeleteTag(tag)}
                    />
                </div>
                <div className="d-flex justify-content-start">
                    <FileBase type="file" multiple={false} 
                        onDone={({base64}) => 
                            setConstData({...contData,imageFile:base64})
                        }
                    />
                </div>
                <div className="col-12">
                    <MDBBtn style={{width:'100%'}}>{id ? "Update" : "Submit"}</MDBBtn>
                    <MDBBtn style={{width:'100%'}} className='mt-2' color='danger' onClick={handelClear}>Clear</MDBBtn>
                </div>
            </MDBValidation>
        </MDBCardBody>
    </MDBCard>
    </div>
  )
}

export default AddEditContest