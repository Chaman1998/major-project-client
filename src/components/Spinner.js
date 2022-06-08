import { MDBSpinner } from 'mdb-react-ui-kit'
import React from 'react'

const Spinner = () => {
  return (
    <MDBSpinner className='me-2' style={{width:'3rem', height:'3rem',marginTop:'100px',alignContent:'center'}}>
        <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
  )
}

export default Spinner