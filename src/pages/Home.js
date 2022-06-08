import { MDBCard, MDBCardGroup, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit'
import React from 'react'

const Home = () => {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" style={{height:"500px"}}>
          <div className="carousel-item active">
            <img style={{height:"500px"}} className="d-block w-100" src="https://res.cloudinary.com/dphj8gipc/image/upload/v1654691240/last/MERN_onjzqb.png"
             alt="First slide" />
          </div>
          <div className="carousel-item">
            <img style={{height:"500px"}} className="d-block w-100" src="https://res.cloudinary.com/dphj8gipc/image/upload/v1654691240/last/MERN_onjzqb.png"
             alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img style={{height:"500px"}} className="d-block w-100" src="https://res.cloudinary.com/dphj8gipc/image/upload/v1654691240/last/MERN_onjzqb.png"
             alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div style={{margin:"50px 30px"}}>
        <MDBCol>
            <MDBContainer>
              <MDBRow className="row-cols-1 row-cols-md-4 g-2">
                <MDBCardGroup>
                  <MDBCard>
                    Hello
                  </MDBCard>
                </MDBCardGroup>
              </MDBRow>
            </MDBContainer>
          </MDBCol>
      </div>
    </>
  )
}

export default Home