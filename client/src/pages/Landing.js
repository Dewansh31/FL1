import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import "../styles/Homepage.css";
import { AiOutlineReload } from "react-icons/ai";
import Categories from "./Categories";
const Landing = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //getTOtal COunt
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/product-filters",
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"ALL Products"}>
      {/* <img
        src="/images/banner51.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      /> */}
      {/* banner image */}
      <div
        id="carouselExampleControlsNoTouching"
        className="carousel slide"
        data-bs-touch="false"
        data-bs-interval="false"
      >
        <div className="carousel-inner" style={{ height: "50%" }}>
          <div className="carousel-item active">
            <img
              src="https://tulsiresin.com/cdn/shop/files/3_YEARS_Website_Banner_1900x.progressive.jpg?v=1689357048"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
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
          </div>
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
      {/* 
<div className="m-5">
    
<div class="row align-items-center">
    <div class="col">
<div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
    <div class="col">
    <div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
    <div class="col">
    <div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
  </div>
  <div class="row align-items-center">
    <div class="col">
<div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
    <div class="col">
    <div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
    <div class="col">
    <div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
  </div>
  <div class="row align-items-center">
    <div class="col">
<div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
    <div class="col">
    <div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
    <div class="col">
    <div className="card" style={{width: '18rem'}}>
  <img src="https://cdn.pixabay.com/photo/2016/02/13/22/54/ring-1198744_640.jpg" className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content-col.</p>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
  </div>
</div> */}


  
    </Layout>
  );
};

export default Landing;
