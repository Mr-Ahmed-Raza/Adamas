import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NavBar({}) {
  const [Logout, setLogout] = useState(false)
  const navigate = useNavigate()
  const userData = localStorage.getItem("userData")
  
  useEffect(() => {
    console.log("userData: ", userData)
  },[userData])

  const handleLogout = ()=>
  {
    localStorage.removeItem("userData")
    setLogout(false)
    navigate("/login")
  }

  return (
    <>
      <section className="info-section">
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-md-8">
              <ul className="ul-left">
                <li className="">
                  <a href="#">
                    <i className="fa fa-mobile"></i>+92-123456789
                  </a>
                </li>
                <li className="">
                  <a href="#">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    info@ahmed.arhamsoft.org
                  </a>
                </li>
                <li className="">
                  <a href="#">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                    Monday-Friday:10 to 7
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="col-sm-10 col-md-4 right-div">
              
              <ul className="ul-right">
                {
                  userData ? (
                 <li>
                  <a href="#" value={Logout} onClick={handleLogout}>Logout</a>
                </li>
                  )
                    : (
                  <li>
                  <Link to="/login">sigin</Link>
                  <span style={{ color: "white" }}>/</span>
                  <Link to="/register">register</Link>
                  </li>
                      
                    )
                }
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="navbar-section">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container">
                <strong>
                  <a href="index.html">
                    <img src="assets/images/logo.png" alt="logo" />
                  </a>
                </strong>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                   <Link to="/">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Home
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </li>
                   
                    </Link>
                    
                      <Link to="/store">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          Store
                          <i className="fa fa-angle-double-right"></i>
                        </a>
                      </li>
                    </Link>

                   <Link to="/contact-us">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          Contact-Us
                          <i className="fa fa-angle-double-right"></i>
                        </a>
                      </li>
                    </Link>

                    <Link to="/all-categories">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          Catagories
                          <i className="fa fa-angle-double-right"></i>
                        </a>
                      </li>
                    </Link>

                   <Link to="/all-products">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          aria-current="page"
                          href="#"
                        >
                          Products
                          <i className="fa fa-angle-double-right"></i>
                        </a>
                      </li>
                    </Link>
                  </ul>
                </div>
              </div>
            </nav>
          </section>
    </>
  );
}

export default NavBar;
