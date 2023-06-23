import React, { useEffect, useState } from "react";
import "../components/todoList.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function Footer() {
  const [recentProducts, setrecentProducts] = useState([]);
  // const [category, setcategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getRecentProduct();
    getselectedProduct();
  
  }, []);
  // // get the recent products
  const getRecentProduct = () => {
    fetch("http://localhost:5000/api/admin/Product/recent-products")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setrecentProducts(data.product);
        
      })
      .catch((error) => console.log("Error fetching Product:", error));
  };
  // get the selected product
  const getselectedProduct = (productId) => {
    fetch(`http://localhost:5000/api/admin/Product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setSelectedProduct(data.selectedProduct);
        // getAllcategory();
        // Redirect to productDetail page with selected product ID
        
        navigate(`/product-details/${productId}`);
      });
     };
   

    return (
      <>
        <footer className="footer bg-light">
          <div className="container">
            <div className="row">
              <div className="colo-sm-10 col-md-3">
                <div className="footer-logo">
                  <strong>
                    <a href="#">
                      <img src="assets/images/logo.png" alt="" />
                    </a>
                  </strong>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consec tetuer adipiscing elit, sed
                  diam non ummy nibh euismod tincidunt ut lao reet dolore magna
                  aliquam erat volutpat.
                </p>
              </div>
              <div className="col-sm-10 col-md-3" >
                <div>
                  <h6>Recent Products</h6>
                </div>

                {recentProducts.length === 0 ? (
                  <p>no product found</p>
                ) : (
                  recentProducts.map((product) => (
                    <ul>
                      <li>
                        <a href="#" onClick={() => getselectedProduct(product._id)}>
                          <div className="" key={product._id}>
                            <img
                              className="category-image-modify-recent"
                              src={`http://localhost:5000/img/${product.picture}`}
                              alt={product.title}
                            />
                          </div>
                          <div className="footer-text">
                            <p>{product.title}</p>
                            <span>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </span>
                            <b>${product.price}</b>
                          </div>
                        </a>
                      </li>
                    </ul>
                  ))
                )}
              </div>
              <div className="col-sm-10 col-md-3">
                <div>
                  <h6>Contacts</h6>
                </div>
                <ul className="">
                  <li>
                    <a href="#">Adamas d.o.o., 1000 Ljubljana</a>
                  </li>
                  <li>
                    <a href="#">Celovska cesta 135</a>
                  </li>
                  <li>
                    <a href="#">Slovenia, Europe</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#">Phone: (+386) 40 123 456</a>
                  </li>
                  <li>
                    <a href="#">Mobile: (+386) 40 654 123 651</a>
                  </li>
                </ul>
                <ul>
                  <li>
                    <a href="#" className="info">
                      Email: info@premiumcoding.com{" "}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-10 col-md-3">
                <div>
                  <h6>SignIn to Newsletter</h6>
                </div>
                <div>
                  <form>
                    <div className="inputs-div">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="inputs-div">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <Link to="">
                    <button className="" >Subscribe </button>

                    </Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="footer-bottom">
          <div className="container align-items-center">
            <div className="row justify-content-sm-between justify-content-md-between align-items-center">
              <div className="col-sm-10 col-md-6">
                <ul>
                <Link to="/">
                  <li>
                    <a href="#">Home</a>
                    </li>
                    </Link>
                    <Link to="/store">
                  <li>
                    <a href="#">Store</a>
                    </li>
                    </Link>
                    <Link to="/contact-us">
                  <li>
                    <a href="#">Contact-Us</a>
                    </li>
                    </Link>
                    
                  
                </ul>
              </div>
              <div className="col-sm-10 col-md-6">
                <p>Adamas @2022 All rights reserved | By Arhamsoft</p>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }


export default Footer
