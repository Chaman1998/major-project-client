import React,{useState} from 'react'
import { MDBNavbar,MDBContainer,MDBIcon,MDBNavbarNav,MDBNavbarLink,MDBNavbarToggler, MDBNavbarBrand, MDBCollapse, MDBNavbarItem} from "mdb-react-ui-kit";
import { useSelector,useDispatch } from 'react-redux';
import { setLogout } from '../redux/feature/authSlice';

const AdminHeader = () => {
    const [show,setShow] = useState(false);
    const dispatch= useDispatch();

    const handleLogout = () => {
        dispatch(setLogout());
    }

    const {user} = useSelector((state)=>({...state.auth}));
    
  return (
    <MDBNavbar fixed='top' expand="lg" style={{backgroundColor:"#f0e6ea",marginTop:'60px'}}>
        <MDBContainer>
            <MDBNavbarBrand href='/' style={{color:"#606080", fontWeight:"600", fontSize:"22px"}}>
                {/* Explore */}
            </MDBNavbarBrand>
            <MDBNavbarToggler type='button' aria-expanded="false" aria-label='Toogle-navvigation' 
            onClick={()=>setShow(!show)}
            style={{color:"#606080"}}
            >
                <div style={{display:'flex',marginRight:"30px",marginTop:"17px"}}>
                    {/* <MDBIcon icon='bars' fas /> */}
                    <MDBIcon icon="angle-down" fas/>
                </div>
            </MDBNavbarToggler>
            <MDBCollapse show={show} navbar>
                <MDBNavbarNav right fullWidth={false} className="mb-2 md-lg-0">
                    <MDBNavbarItem>
                        <MDBNavbarLink href='/'>
                            <p className='header-text'>Home</p>
                        </MDBNavbarLink>
                    </MDBNavbarItem>
                    {/*============== User login or no not check for dashboard =============*/}
                    {user?.result?._id && (
                        <>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/addcontest'>
                                <p className='header-text'>Contest</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/posts'>
                                <p className='header-text'>Posts</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        </>
                    )}
                    {/* =============Only for admin============ */}
                    {user?.result?.role==="Admin" && (
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/admin'>
                                <p className='header-text'>Dashboard</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    )}
                    
                    {user?.result?._id && (
                        <>
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/profile'>
                                <p className='header-text'>Profile</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        </>
                    )}
                    {/* ==========Login Logout check=========== */}
                    {user?.result?._id ? (
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/login'>
                                <p className='header-text' onClick={handleLogout}>Logout</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    ) : (
                        <MDBNavbarItem>
                            <MDBNavbarLink href='/login'>
                                <p className='header-text'>Login</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    )}
                </MDBNavbarNav>
            </MDBCollapse>
        </MDBContainer>
    </MDBNavbar>
  )
}

export default AdminHeader