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
                    <i className="fa fa-mobile"></i>+92-3026589335
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
    </>
  );
}

export default NavBar;
