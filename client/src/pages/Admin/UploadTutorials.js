import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const UploadTutorials = () => {

  const [vname, setVName] = useState("");

 
  const uploadVideo = async (e) =>{
    e.preventDefault();
    try {

      function getId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }
        
    const videoId = getId(vname);
    const name = 'https://www.youtube.com/embed/'+videoId ;
    
    console.log('Video ID:', name)

    const res = await axios.post("/api/v1/auth/tutorial", {
        name  
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }

  }
  



  return (
    
    <Layout title={"Dashboard - Create Product"}>
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Upload Videos & Tutorials</h1>
         
         
         <div>
         <input
           type="text"
           value={vname}
           placeholder="Paste tutorial link"
           className="form-control"
           onChange={(e) => setVName(e.target.value)}
                />
          <button onClick={uploadVideo}>Upload</button>
         </div>

        </div>
      </div>
    </div>
  </Layout>

  )
}

export default UploadTutorials