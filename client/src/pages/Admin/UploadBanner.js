import React, { useState, useEffect } from 'react'
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const UploadBanner = () => {

    const navigate = useNavigate();
    

    const [photo, setPhoto] = useState("");

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("photo", photo);
          console.log(photo);
          const { data } = axios.post(
            "/api/v1/product/create-banner",
            productData
          );
          if (data?.success) {
            toast.error(data?.message);
          } else {
            toast.success("Banner Uploaded Successfully");
            // navigate("/");
          }
        } catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
      };


  return (
    <Layout title={"Dashboard - Create Banner"}>
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className='text-center' style={{backgroundColor:"#ffc107",borderRadius:"10px"}} >Create Product</h1>

          <div className="py-3 border rounded-4 bg-body-tertiary">

          <div className="container d-flex justify-content-center ">

          <div className="m-1 w-100">
           
         

           <div className="mb-3">
             <label className="btn btn-outline-secondary col-md-12">
               {photo ? photo.name : "Upload Photo"}
               <input
                 type="file"
                 name="photo"
                 accept="image/*"
                 onChange={(e) => setPhoto(e.target.files[0])}
                 hidden
               />
             </label>
           </div>
           <div className="mb-3">
             {photo && (
               <div className="text-center">
                 <img
                   src={URL.createObjectURL(photo)}
                   alt="product_photo"
                   height={"200px"}
                   className="img img-responsive"
                 />
               </div>
             )}
           </div>
         
           <div className="mb-3">
             <button className="btn btn-primary" style={{marginTop:"20px", marginLeft:"18px"}} onClick={handleUpload}>
               Upload Banner
             </button>
           </div>
         </div>

            </div>

         

            </div>
        
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UploadBanner