import React,{useState,useEffect} from "react";
import "../styles/landing.css";
// import b1 from '../photoes/b1.png'
import axios from "axios";

const Landing = () => {

  const [banners, setBanners] = useState([]);


  const getAllBanners = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-banners`
      );
      setBanners(data?.products);
      console.log(data?.products)
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAllBanners();
  }, []);



  return (
   

      <div
        id="carouselExampleControlsNoTouching"
        className="carousel slide"
        data-bs-touch="false"
        data-bs-interval="false"
      >
        <div className="carousel-inner" style={{ height: "70%" }}>

        {banners?.map((e)=>(

            <div className="carousel-item active">
            <img
            // src="https://tulsiresin.com/cdn/shop/files/online_resin_workshop_website_1900x.progressive.jpg?v=1677150932"
              src={"/api/v1/product/banner-photo/"+e._id}
              className="d-block w-100"
              alt="..."
            />
            </div>

        ))

        }

          


          {/* <div className="carousel-item">
            <img
              src="https://tulsiresin.com/cdn/shop/files/online_resin_workshop_website_1900x.progressive.jpg?v=1677150932"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://tulsiresin.com/cdn/shop/files/3_YEARS_Website_Banner_1900x.progressive.jpg?v=1689357048"
              className="d-block w-100"
              alt="..."
            />
          </div> */}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControlsNoTouching"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
   


   
  




  );
};

export default Landing;
