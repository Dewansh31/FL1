import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "../../styles/ProductAdmin.css"
const Products = () => {
  const [products, setProducts] = useState([]);

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap justify-content-around">
           



<div id="cards_landscape_wrap-2">
  <div className="container">
    <div className="row">

    {products?.map((p) => (
      <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3" key={p._id}>
        <a href>
          <div className="card-flyer">
            <div className="text-box">
              <div className="image-box">
                <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} />
              </div>
              <div className="text-container">
                {/* <h6>{p.name.substring(0, 15)} </h6> */}
                <Link  to={`/dashboard/admin/product/${p.slug}`}
              className=""><h6>{p.name.substring(0, 15)} </h6></Link>
                <p>{p.description.substring(0, 20)}{p.description.length >= 20 && '...'}</p>
              </div>
            </div>
          </div>
        </a>
      </div>
        ))}
    </div>



  </div>
</div>






             
       




          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;