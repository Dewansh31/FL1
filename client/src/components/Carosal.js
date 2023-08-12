import React from 'react'
import ".././styles/Carosal.css"

const Carosal = () => {
  return (
<div>
  {/* <header>
    <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
      <div className="container-fluid">
       
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="#">Brand</a>
        </div>
      
        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
            <li><a href="#">Link</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret" /></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider" />
                <li><a href="#">Separated link</a></li>
                <li role="separator" className="divider" />
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#">Link</a></li>
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret" /></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider" />
                <li><a href="#">Separated link</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

      <ol className="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to={0} className="active" />
        <li data-target="#carousel-example-generic" data-slide-to={1} />
        <li data-target="#carousel-example-generic" data-slide-to={2} />
      </ol>
   
      <div className="carousel-inner" role="listbox">
        <div className="item active">
          <img src="https://i.postimg.cc/wTBDN2JW/1.jpg" alt="..." />
          <div className="carousel-caption">
            <h2 className="animated bounceInRight" style={{animationDelay: '1s'}}>We Are Reliable</h2>
            <h3 className="animated bounceInLeft" style={{animationDelay: '2s'}}>Lorem ipsum dolor sit amet.</h3>
          </div>
        </div>
        <div className="item">
          <img src="https://i.postimg.cc/GhHwf0Gv/2.jpg" alt="..." />
          <div className="carousel-caption">
            <h2 className="animated slideInDown" style={{animationDelay: '1s'}}>We Deliver On Time</h2>
            <h3 className="animated slideInRight" style={{animationDelay: '2s'}}>Lorem ipsum dolor sit amet.</h3>
          </div>
        </div>
        <div className="item">
          <img src="https://i.postimg.cc/ncsgk4fk/3.jpg" alt="..." />
          <div className="carousel-caption">
            <h2 className="animated zoomIn" style={{animationDelay: '1s'}}>Best Customer Support</h2>
            <h3 className="animated zoomIn" style={{animationDelay: '2s'}}>Lorem ipsum dolor sit amet.</h3>
          </div>
        </div>
      </div>
     
      <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
        <span className="sr-only">Next</span>
      </a>
    </div>
  </header> */}

<div id="myCarousel" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to={0} className="active" />
    <li data-target="#myCarousel" data-slide-to={1} />
    <li data-target="#myCarousel" data-slide-to={2} />
  </ol>
  <div className="carousel-inner">
    <div className="item active">
      <img src="https://www.w3schools.com/bootstrap/la.jpg" alt="Los Angeles" />
    </div>
    <div className="item">
      <img src="https://www.w3schools.com/bootstrap/chicago.jpg" alt="Chicago" />
    </div>
    <div className="item">
      <img src="https://www.w3schools.com/bootstrap/ny.jpg" alt="New york" />
    </div>
  </div>
  <a className="left carousel-control" href="#myCarousel" data-slide="prev">
    <span className="glyphicon glyphicon-chevron-left" />
    <span className="sr-only">Previous</span>
  </a>
  <a className="right carousel-control" href="#myCarousel" data-slide="next">
    <span className="glyphicon glyphicon-chevron-right" />
    <span className="sr-only">Next</span>
  </a>
</div>

 
  <div className="link-area">
    <a href="https://www.youtube.com/channel/UCki4IDK86E6_pDtptmsslow" target="_blank">Click for More</a>
  </div>
</div>

  )
}

export default Carosal