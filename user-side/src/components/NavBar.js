import React, { useEffect, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./todo.css";
import FullPageLoader from "./FullPageLoader";
import toast, { Toaster } from "react-hot-toast";
import io from "socket.io-client";

function NavBar({}) {
  const [Logout, setLogout] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // const socket = io("http://localhost:5000");
  

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserEmail(parsedUserData.email);
      setUserPicture(parsedUserData.picture)
    }
  }, []);
  const handlePictureClick = (event) => {
    event.preventDefault();
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
   
  };
  
  

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setLogout(false);
    navigate("/login");
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    // Check if the search query is empty before making the request
    if (!searchQuery.trim()) {
      toast.error("Enter any product to search ");
      return;
    }
    setIsSearching(true); // Show loader

    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/product/searchproduct`,
        {
          params: { title: searchQuery },
        }
      );

      if (!response.data || response.data.results.length === 0) {
        throw new Error("Search failed");
      }

      console.log("search results", response.data.results);

      setTimeout(() => {
        setIsSearching(false); // Hide loader
        navigate(`/search-products?query=${searchQuery}`);
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsSearching(false);
    }
  };

  // const handleSearche = async (event) => {
  //   event.preventDefault();
  //   // Check if the search query is empty before making the request
  //   if (!searchQuery.trim()) {
  //     toast.error("Enter any product to search ");
  //     return;
  //   }
  //   setIsSearching(true); // Show loader

  //   try {
  //     // Emit the search query to the Socket.IO server
  //     socket.emit("searchProduct", searchQuery);
  //   } catch (error) {
  //     console.error(error);
  //     setIsSearching(false);
  //   }
  // };

  // useEffect(() => {
  //   // Listen for search results from the Socket.IO server
  //   socket.on("searchResults", (results) => {
  //     setIsSearching(false); // Hide loader
  //     setSearchResults(results);
  //     navigate(`/search-products?query=${searchQuery}`);
  //   });

  //   // Listen for search error from the Socket.IO server
  //   socket.on("searchError", () => {
  //     setIsSearching(false); // Hide loader
  //     setSearchResults([]);
  //     toast.error("Search failed. Please try again.");
  //   });

  //   return () => {
  //     socket.off("searchResults");
  //     socket.off("searchError");
  //   };
  // }, [socket, navigate, searchQuery]);

  // Function to check if the current page is excluded from showing the search bar
  const isProfileSectionExcluded = () => {
    const paths = [
      "/profile",
    ];
    const currentPath = location.pathname;
    if (currentPath.startsWith("/product-details/")) {
      return true;
    }
    console.log(currentPath);
    if (paths.includes(currentPath)) return true;
    else return false;
  };
  const isSearchBarExcluded = () => {
    const paths = [
      "/contact-us",
      "/cart-items",
      "/search-products",
      "/checkout",
    ];
    const currentPath = location.pathname;
    if (currentPath.startsWith("/product-details/")) {
      return true;
    }
    console.log(currentPath);
    if (paths.includes(currentPath)) return true;
    else return false;
  };
  return (
    <>
      <Toaster />
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
                {/* Conditionally render user's email if logged in */}
                
                {userPicture ? (
                  <div className="user-dropdown">
                    <a href="#"
                     
                      onClick={handlePictureClick}>
                       <img
                        src={`http://localhost:5000/img/${userPicture}`}
                        alt="User Profile"
                        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                      />
                      <i className="fa fa-caret-down"></i>
                    </a>
                    {showDropdown && (
                      <ul className="user-dropdown-menu">
                        {" "}
                        {/* Updated class name */}
                        <li>
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                          <a href="#" onClick={handleLogout}>
                            Logout
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <li>
                    <Link to="/login">sigin</Link>
                    <span style={{ color: "white" }}>/</span>
                    <Link to="/register">register</Link>
                  </li>
                )}
                </ul>
                
            </div>
          </div>
        </div>
      </section>
      <section className="navbar-section">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <strong>
              <a href="/">
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
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                </Link>

                <Link to="/store">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Store
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                </Link>

                <Link to="/contact-us">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Contact-Us
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                </Link>

                <Link to="/all-categories">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Catagories
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                </Link>

                <Link to="/all-products">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Products
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                </Link>

                <Link to={userEmail ? "/cart-items" : "/login"}>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      CartItems
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                </Link>
              </ul>
            </div>
            {!isSearchBarExcluded() && (
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search product with title"
                  aria-label="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            )}
            {isSearching && <FullPageLoader />}
            {/* Conditionally render the search results div */}
            {/* {!isSearchBarExcluded() && (
              <div className="search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <div key={result._id}>
                      <img
                        src={`http://localhost:5000/img/${result.picture}`}
                        alt={result.title}
                      />
                      <p>{result.title}</p>
                    </div>
                  ))
                ) : (
                  <p>No product found</p>
                )}
              </div>
            )} */}
          </div>
        </nav>
      </section>
    </>
  );
}

export default NavBar;
