import React,{useState,useEffect} from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/Tutorial.css";
import axios from "axios";

const Tutorials = () => {

  const [tuts, setTuts] = useState([]);

  const [product,setProduct] = useState([]);

  const getTutorials = async() =>{


      try {
        const {data} =  await axios.get(
            `/api/v1/auth/gettutorial`
          );

        console.log(data?.vds)
        setTuts(data?.vds)
        console.log(tuts)
        
    } catch (error) {
        console.log(error);
    }
      
  }

  useEffect(() => {
    getTutorials();
   
  }, []);


  return (
    <Layout title={"Tutorials"}>


    <div style={{ marginTop: "20px" }}>

    <h1 className="text-center">Tutorials & Workshops</h1>
    <div className="container  mb-3" >



<div className="row">

{tuts?.map((doc)=>(

<div className="col-md-4" >
  <div className="card p-3 mb-2">
    <div className="row align-items-center">
      <div className="col-12">
        <div
          className="card bg-dark text-white"
          style={{ maxWidth: "28rem" }}
        >

           
             {/*  <video src="https://youtube.com/shorts/xRUIpdgcpxs?feature=share" class="card-img-top" controls></video> */}
  
 
           <iframe height="200" width="auto"  className="card-img-top" src={doc?.name} title="YouTube video player" frameborder="0" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          <div className="card-img-overlay">
   

            <p className="card-text">Created @ {doc?.createdAt}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

))}




</div>
   

        {/* <div className="row">


<div className="col-md-4" >
  <div className="card p-3 mb-2">
    <div className="row align-items-center">
      <div className="col-12">
        <div
          className="card bg-dark text-white"
          style={{ maxWidth: "28rem" }}
        >
           <video src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4" class="card-img-top" controls></video>
          <div className="card-img-overlay">
            <h5 className="card-title">Card title</h5>

            <p className="card-text">Last updated 3 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div className="col-md-4">
  <div className="card p-3 mb-2">
    <div className="row align-items-center">
      <div className="col-12">
        <div
          className="card bg-dark text-white"
          style={{ maxWidth: "28rem" }}
        >
          <video
            src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
            class="card-img-top"
            controls
          ></video>
          <div className="card-img-overlay">
            <h5 className="card-title">Card title</h5>

            <p className="card-text">Last updated 3 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="col-md-4">
  <div className="card p-3 mb-2">
    <div className="row align-items-center">
      <div className="col-12">
        <div
          className="card bg-dark text-white"
          style={{ maxWidth: "28rem" }}
        >
          <video
            src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
            className="card-img-top"
            muted
            autoPlay
            loop
            controls
          />
          <div className="card-img-overlay">
            <h5 className="card-title">Card title</h5>

            <p className="card-text">Last updated 3 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div> */}

      </div>

    </div>


   
    </Layout>
  );
};

export default Tutorials;
