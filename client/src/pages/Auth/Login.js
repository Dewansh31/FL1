import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate , useLocation, Link} from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { useTranslation } from 'react-i18next';

const baseURL = "/api/v1/auth/login";

const Login = () => {

  const { t } = useTranslation();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(baseURL, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
           ...auth,
            user: res.data.user,
            token: res.data.token
        });
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title="Register - Ecommerce App">
      <div className="form-container" style={{ minHeight: "90vh"}}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">{t('LOGIN FORM')}</h4>

          <div className="mb-3">
        
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder={t("Enter Your Email")}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder={t("Enter Your Password")}
              required
            />
          </div>
           <div className="mb-3">
           
          <Link to="/forgot-password">{t("Forgot Password")}</Link>
           </div>
          
          <button type="submit" className="btn1">
            {t("LOGIN")}
          </button>
        </form>
      </div>
     

    </Layout>
  );
};

export default Login;