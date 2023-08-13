import React from "react";
import { NavLink, Link } from "react-router-dom";
// import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import logo from '../../photoes/logo.png'

const Header = () => {
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
       
       <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top" >
  <div className="container-fluid">
    {/* <a className="navbar-brand fw-bold" href="#">Coding Yaar</a> */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <Link to="/landing" className="navbar-brand">
              <img style={{height:"70px",width:"70px"}} src={logo} />
            </Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
        <li className="nav-item">
          <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
        </li>
        {/* <li className="nav-item dropdown">
           <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
<ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>

                      <ul className="arrow">
                 {c.subName?.map((elem)=>(
                    <li><a href="#">{elem}</a></li>
                 ))

                 }
         
        </ul>

              
                    </li>
                  ))}
                </ul> 

        </li> */}

<ul className="menuH">
  <li><a href="#" className="arrow"> Category</a>
    <ul>
    <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
   
       
       {categories?.map((c)=>(

<li><Link to={`/category/${c.slug}`} className="arrow">{c.name}</Link>
<ul>
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
                  <li className="nav-item nv">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item nv">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown nv">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

<li className="nav-item nv">
                    <NavLink to="/tutorials" className="nav-link">
                      Tutorials
                    </NavLink>
                  </li>


           <li className="nav-item nv">
                    <NavLink to="/contact" className="nav-link">
                      Contact 
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