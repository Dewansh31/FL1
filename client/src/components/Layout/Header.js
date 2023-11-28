import React,{useState} from "react";
import { NavLink, Link } from "react-router-dom";
// import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import logo from '../../photoes/lg2.png'
import './Language.css'
import { useTranslation } from 'react-i18next';


const languages = [
  {id:1, value: 'en', text: "Language" },
  {id:2, value: 'en', text: "English" },
  {id:3, value: 'hi', text: "Hindi" },

]

const Header = () => {

  const { t } = useTranslation();
  const [lang, setLang] = useState('en');


  const handleChange = e => { 
    setLang(e.target.value);
    let loc = "http://localhost:3000/";
    window.location.replace(loc + "?lng=" + e.target.value);
}

  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
    <h6 style={{textAlign:"center",background:"black",color:"white",padding:"4px"}}>{t('Free shipping for orders over ₹ 1,499.00')}</h6>
  <div className="top-navbar">

  {/* <div className="switch">
    <input id="language-toggle" className="check-toggle check-toggle-round-flat" type="checkbox" value={lang} onChange={handleLanguage} />
    <label htmlFor="language-toggle" />
    <span className="on">HI</span>
    <span className="off">EN</span>
  </div> */}

<div className="js">
  <div className="language-picker js-language-picker" data-trigger-class="btn btn--subtle">
    <form action className="language-picker__form">
     
      <select name="language-picker-select" id="language-picker-select" value={lang} onChange={handleChange}>
                {languages.map(item => {
                    return (<option key={item.id} 
                    value={item.value}>{item.text}</option>);
                })}
            </select>
    </form>
  </div></div>


    <div className="icons mt-2" >

    {!auth.user ? (
                <>
                    <button type="button" className="btn btn-warning"><NavLink to="/login" className="nav-link btn btn-warning">
                      {t('LOGIN')} 
                    </NavLink></button> &nbsp;
      <button type="button" className="btn btn-warning"><NavLink to="/register" className="nav-link btn btn-warning">
                      {t('REGISTER')}
                    </NavLink></button> &nbsp;
                </>
              ):(
                <>

<div class="btn-group dropstart">
  <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
  {auth?.user?.name}
  </button>
  <ul class="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton2">
    <li><NavLink
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="dropdown-item"
                      >
                         {t('Dashboard')}
                      </NavLink></li>
    <li><NavLink
                        onClick={handleLogout}
                        to="/login"
                        className="dropdown-item"
                      >
                         {t('Logout')}
                      </NavLink></li>
   

  </ul>
</div>

              </>
              ) }

    
    </div>
  </div>

       
       <nav className="navbar navbar-expand-lg bg-body-tertiary " >
  <div className="container-fluid">
 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <Link to="/landing" className="navbar-brand">
              <img style={{height:"70px"}} src={logo} />
            </Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link ">
          {t('Home')} 
                </NavLink>
        </li>
     

<ul className="menuH">
  <li><a href="#" className="arrow"> All Products  </a>
    <ul>
    <li>
                    <Link className="dropdown-item" to={"/categories"}>
                    {t('All Categories')} 
                    </Link>
                  </li>
   
       
       {categories?.map((c)=>(

<li><Link to={`/category/${c.slug}`} className="arrow">{c.name}</Link>
<ul>
    
    {c.subName.length === 0 && <li> <Link to={`/`} className="arrow"> {t('No sub-category')}</Link> </li>

    }

     {c.subName?.map((sn)=>(
         <li> <Link to={`/category/code/${c.slug}/${sn}`} className="arrow">{sn}</Link> </li>
     ))

     }
  
</ul>
</li>
       ))

       }
     
    </ul>
  </li></ul>


 {!auth.user ? (
                <>
                 
                </>
              ) : (
                <>
                  
                </>
              )}

<li className="nav-item nv">
                    <NavLink to="/tutorials" className="nav-link">
                    {t('Tutorials')} 
                    </NavLink>
                  </li>


           <li className="nav-item nv">
                    <NavLink to="/contact" className="nav-link">
                    {t('Contact')}  
                    </NavLink>
                  </li>

                <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <Badge count={cart?.length} showZero offset={[10, -5]}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
</svg>
                  </Badge>
                </NavLink>
              </li>
      </ul>
      <SearchInput/>
    
    </div>
  </div>
</nav>
    </>
  );
};

export default Header;