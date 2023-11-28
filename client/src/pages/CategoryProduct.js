import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CategoryProductStyles.css";
import Spinner2 from "../components/Spinner2";
import { useTranslation } from 'react-i18next';
// import "../styles/Homepage.css";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  var [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [isloading,setIsLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (params?.sn && params?.slug) getPrductsByCatSubCat();
    else if (params?.slug) getPrductsByCat();
  }, [params?.slug,params?.sn]);

  const getPrductsByCat = async () => {

    try {
      setIsLoading(true)

      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
   
  };

  const getPrductsByCatSubCat = async () => {
    try {
      setIsLoading(true)
      const { data } = await axios.get(
        `/api/v1/product/product-category/code/${params.slug}/${params.sn}`
      );
     
      setCategory(data?.category);
 
      // console.log(data?.products[0].subCategory)

      var tempArr = data?.products


      tempArr = tempArr.filter(checkSubCat);

      function checkSubCat(pro) {
        return pro.subCategory === params.sn;
      }

      setProducts(tempArr);

      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };
  return (
    <Layout>
      {/*     */}
      <div className=" category container ">
        <div className="d-flex  flex-column">

          
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>

        { isloading && <Spinner2/> }

        </div>
        <div className="row">
          <div className="card m-2 col-xs-2">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                  <div className="card-name-price">
                    <h6 className="card-title">{p.name.substring(0,15)}...</h6>
                    <h5 className="card-title card-price">Rs.{p.price}</h5>
                  </div>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    
                  </div>
                  <div className="card-name-price mb-2" > 
                    <button
                      className="btn mbtn ms-1" 
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      {t('More Details')}
                    </button>
                   
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;