import { MDBBtn, MDBCard, MDBCardBody, MDBInput, MDBSpinner, MDBValidation } from 'mdb-react-ui-kit'
import React,{useState,useEffect} from 'react';
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from 'react-redux';
import useDrivePicker from 'react-google-drive-picker';
import { useParams } from 'react-router-dom';

const initialState ={
    fname:"",
    lname:"",
    tags:[]
}
const Profile = () => {
    const [userData,setUserData] = useState(initialState);
    const {error,loading} = useSelector((state)=>({...state.auth}));
    
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>({...state.user}));

    const {id} = useParams();
    useEffect(() => {
        if(id){
            // const singleUser = ;
        }
    },[id])
    // const {email,password,firstName,lastName,} = formValue;

    const OnInputChange = (e) =>{
        let {name,value} = e.target;
        setFormValue({...formValue,[name]:value});
    }

    const updateProfile = (e) => {
        e.preventDefault();
    }
    const [file,setFile] =useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

  return (
    <div style={{margin:"auto",padding:"15px",maxWidth:"450px",alignContent:"center",marginTop:"120px"}} className='container'>
        <MDBCard alignment='center'>
            <h5>Updated Profile</h5>
            <MDBCardBody>
                <MDBValidation className='row g-3'>
                    <div className='col-md-6'>
                        <MDBInput label="First Name" type="text"  name="firstName"  required invalid="true" validation="Please provide first name"
                            // value={user.result.fname}
                            onChange={OnInputChange}
                        />
                    </div>
                    <div className='col-md-6'>
                        <MDBInput label="Last Name" type="text" name="lastName" required invalid="true" validation="Please provide last name"
                            onChange={OnInputChange}
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput type="email" name="email" readonly onChange={OnInputChange}/>
                    </div>
                    <div className='col-md-12'>
                        <MDBInput type="text" name="role" readonly onChange={OnInputChange}/>
                    </div>
                    <div className='col-md-12'>
                        <MDBInput label="department" type="text" name="department"  required invalid="true" validation="Department"
                            onChange={OnInputChange}
                        />
                    </div>
                    <div className='col-md-6'>
                        <MDBInput label="work" type="text" name="currentWord"  required invalid="true" validation="Currently work"
                            onChange={OnInputChange}
                        />
                    </div>
                    <div className='col-md-6'>
                        <MDBInput label="date" type="date" name="joiningdate"  required invalid="true" validation="Date of Joining"
                            onChange={OnInputChange}
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput label="Password" type="password" name="password" required invalid="true" validation="Please provide password"
                            onChange={OnInputChange}
                        />
                    </div>
                    <div className='col-md-12'>
                        <MDBInput label="Confirm Password" type="password" name="confirmPassword" required invalid="true" validation="Please provide confirm password"
                            onChange={OnInputChange}
                        />
                    </div>
                    <div className='col-md-12'>
                    <FileBase type="file" multiple={false} 
                        // onDone={({base64}) => 
                        //     setConstData({...contData,imageFile:base64})
                        // }
                    />
                    </div>
                   
                    <div className="col-12">
                        <MDBBtn style={{width:"100%"}} className="mt-2" onClick={updateProfile}>
                            {/* {loading && ( */}
                                {/* <MDBSpinner size='sm' role="status" tag="span" className="me-2" /> */}
                            {/* )} */}
                            Update Profile
                        </MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
        </MDBCard>
    </div>
  )
}

export default Profile