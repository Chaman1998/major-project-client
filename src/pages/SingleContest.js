import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { getContest } from '../redux/feature/contestSlice';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBContainer, MDBIcon } from 'mdb-react-ui-kit';

const SingleContent = () => {
    const dispatch  = useDispatch();
    const {contest} = useSelector((state)=>({...state.contest}));
    const {id} = useParams();
    useEffect(()=>{
        if(id){
            dispatch(getContest(id));
        }
    },[id]);

    // const len = contest.writing.value.length();
    // console.log(len);

  return (
    <>
        <MDBContainer>
            <MDBCard className='mb-3 mt-2'>
                <MDBCardImage position='top' style={{width:'100%',maxHeight:'600px',marginTop: '60px'}} src={contest.imageFile} alt={contest.title}/>
                <MDBCardBody>
                    <pre style={{whiteSpace: 'pre-wrap',fontFamily: 'var(--mdb-font-roboto)'}}>
                        <h3 style={{textAlign:"center"}}>{contest.title}</h3>
                        <span>
                            <p className="text-start tourName">Created By: {contest.name}</p>
                        </span>
                        {/* <div style={{float:'left'}}>
                            <span className="text-start">
                                {content && content.tags && content.tags.map((item)=>`#${item}`)}
                            </span>
                        </div> */}
                        {/* <br /> */}
                        
                        <MDBCardText className='text-start mt-2'>
                            <MDBIcon style={{float:'left',margin:'5px'}} far icon='calendar-alt' size="lg" />
                            <small className="text-muted">
                                {moment(contest.createdAt).fromNow()}
                            </small>
                        </MDBCardText>
                        {/* <pre style={{whiteSpace: 'pre-wrap'}}> */}
                        <MDBCardText className="mb-0 text-start" style={{fontSize: '1.2rem'}}>
                            {contest.writing}
                        </MDBCardText>
                    </pre>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    </>
  )
}

export default SingleContent