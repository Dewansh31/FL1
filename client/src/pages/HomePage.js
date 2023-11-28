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
import Spinner2 from "../components/Spinner2";
import Landing from "./Landing";
import { Container, Button, Link } from 'react-floating-action-button'
import { useTranslation } from 'react-i18next';

const HomePage = () => {

  const width = window.innerWidth;
  // The width below which the mobile view should be rendered
  const breakpoint = 500;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cart,setCart] = useCart();
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
        "/api/v1/category/get-category"
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
        `/api/v1/product/product-list/${page}`
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
        "/api/v1/product/product-count"
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
        `/api/v1/product/product-list/${page}`
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
        "/api/v1/product/product-filters",
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
      <Layout title={t('ALL Products')}>
  
   <Landing/>
  
        <div className="container home-page mt-1 ">
  
  
  
  <div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel"><span> {t('Choose Filters')} </span></h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
    <div className=" filters">
            <h4 className="text-center">{t('Filter By Category')} </h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            {/* price filter */}
            <h4 className="text-center mt-4">{t('Filter By Price')}</h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                {t('RESET FILTERS')} 
              </button>
  
  
            </div>
          </div>
    </div>
  </div>
  
        
  
  
          <div className="row justify-content-center" 
          // style={{marginLeft:"9.5rem"}}
          >

<div class="container text-center">

 
  <div class="row">
    <div class="col-10" style={{marginTop:"20px"}}> <h1 className="heading" >{t('All Products')}</h1></div>
    <div class="col-2"><button tooltip="Filters"  class="btn " height="0px" width="0px"type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">
      

<svg tooltip="Filters" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-filter-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg>
         </button></div>
  </div>
</div>


            
         
  
            {products.length === 0?
            <>
               <Spinner2/>
            </>
            :
            <>


  
  <div className="cnt d-flex flex-wrap m-auto  justify-content-center ">
              {products?.map((p) => (
                <div className="card m-2 col-xs-2" 
                style ={{ width: "18rem" }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                  <div className="card-name-price">
                    <h6 className="card-title">{p.name.substring(0,15)}...</h6>
                    <h5 className="card-title card-price"> Rs.{p.price}</h5>
                    </div>
                    {/* <p className="card-text">
                      {p.description.substring(0, 15)}...
                    </p> */}
                   
                  </div>
                  <div className="card-name-price mb-2" >
                    <button
                   
                      className="btn mbtn ms-1 "
                      style={{marginLeft:"2px"}}
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                     {t('More Details')}  
                    </button>
                    <button class="btn  acbtn ms-1" 
                     style={{marginRight:"4px"}}
                    onClick={()=>{
                    setCart([...cart,p])
                    localStorage.setItem('cart',JSON.stringify([...cart,p]))
                    toast.success('Item Added to cart')
                    }}>
                    {t('ADD TO CART')} 
                    </button>
                    </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
            </div>
            
            
            </>
  
            }
  
          </div>
        </div>

        <Container>
            
      
          
          
          <div class="arrow1">
         <a href="#" title="Back to Top"><span class="fas fa-angle-up"></span></a>
      </div>
        </Container>

      </Layout>
    );

   
};

export default HomePage;
