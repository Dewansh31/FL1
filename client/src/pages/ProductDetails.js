import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import ReactImageMagnify from "react-image-magnify";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [otherProducts, setOtherProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [keyword,setKeyword] = useState('');

  // initial product details
  useEffect(() => {
    
    if (params?.slug) getProduct();
    setKeyword(params?.slug)
    console.log(keyword)
    // handlesubmit()

  }, [params?.slug]);


  const handlesubmit = async () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    };

    //https://www.flipkart.com/search?marketplace=FLIPKART&q=smartwatch"
    //https://flipkart-scraper-api.dvishal485.workers.dev/search/${params?.slug}

    let response = await fetch(
      `https://www.flipkart.com/search?marketplace=FLIPKART&q=params?.slug`,
      
      {
        method: "GET",
        headers: headersList,
      }
    );



    let data = await response.json();
    console.log(data?.result);
    setOtherProducts(data?.result);
  };

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  // get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = () => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));

    toast.success("Item Added to cart");
    navigate("/cart");
  };

  return (
    <Layout>
      {/* <h1>Product Details</h1> */}
      <div className="row container product-details  ">
        <div className="col-md-5">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: `product.name`,
                isFluidWidth: true,
                src: `/api/v1/product/product-photo/${product._id}`,
                width: 300,
                height: 300,
              },
              largeImage: {
                src: `/api/v1/product/product-photo/${product._id}`,
                width: 1200,
                height: 1800,
              },
            }}
            className=" card-img-top detail-image"
    
          />

          {/* <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    height="500"
                    width={"350px"}

                  /> */}
        </div>
        <div className="col-md-7 product-details-info" style={{backgroundColor:"#8080801a",borderRadius:"10px"}}>
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>

          {product?.subCategory && (
            <h6>subCategory : {product?.subCategory}</h6>
          )}

         <div>
         <button
            className="btn btn-primary ms-1"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>

          <button className="btn btn-warning ms-1" onClick={handleBuy}>
            Buy Now
          </button>

         </div>
        </div>
      </div>
      <hr />
      <div className="row container similar-products">
        <h4>Similar Products ➡️</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products Found</p>
        )}
        {/* {JSON.stringify(relatedProducts,null,4)} */}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{p.name}</h5>
                  <h5 className="card-title card-price">Rs.{p.price}</h5>
                </div>
                <p className="card-text">{p.description.substring(0, 60)}...</p>
              </div>
              <div className="card-name-price mb-2">
                <button
                  className="btn btn-dark ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                {/* <button
                  className="btn btn-dark ms-1"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, p])
                    );
                    toast.success("Item Added to cart");
                  }}
                >
                  ADD TO CART
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr />
      <h4>Compare with other websites ➡️</h4>

      <div className="row container similar-products" style={{margin:"auto"}}>
       
        {otherProducts?.length < 1 && (
          <p className="text-center">No Similar Products Found from other websites</p>
        )}
    
        <div className="d-flex flex-wrap">
          {otherProducts?.map((product) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <div className="card-name-price">
                  <h5 className="card-title">{product.name}</h5>
                  <h5 className="card-title card-price">Rs.{product.current_price}</h5>
                </div>
               
              </div>
              <div className="card-name-price mb-2">
                <Link
                  className="btn btn-dark ms-1"
                  to={product.link} target="_blank"
                >
                  More Details
                </Link>
               
              </div>
            </div>
          ))}
        </div>
      </div>

     
    </Layout>
  );
};

export default ProductDetails;
