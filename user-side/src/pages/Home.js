import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../components/todoList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const [category, setcategory] = useState([]);
  // const [Product, setProduct] = useState([]);
  const [LatestProduct, setLatestProduct] = useState([]);
  const [FeatureProduct, setFeatureProduct] = useState([]);
   const [selectedProduct, setSelectedProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllcategory();
    getLatestProduct();
    getAllFeaturedProduct();
  }, []);

  // Fetch all the categories
  const getAllcategory = () => {
    fetch("http://localhost:5000/api/admin/category/reverse-category")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setcategory(data.category);
      })
      .catch((error) => console.log("Error fetching category:", error));
  };
  // Fetch all the products
  const getLatestProduct = () => {
    fetch("http://localhost:5000/api/admin/Product/latest-arrivals")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setLatestProduct(data.product);
      })
      .catch((error) => console.log("Error fetching Product:", error));
  };
  // Fetch all the featured products
  const getAllFeaturedProduct = () => {
    fetch("http://localhost:5000/api/admin/product/feature-products")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setFeatureProduct(data.product);
      })
      .catch((error) => console.log("Error fetching Product:", error));
  };
  // get the selected product
  const getselectedProduct = (productId) => {
    fetch(`http://localhost:5000/api/admin/Product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
          setSelectedProduct(data.selectedProduct);
        // getAllcategory();
        // Redirect to productDetail page with selected product ID
        navigate(`/product-details/${productId}`);
      });
  };

  return (
    <>
      <wrapper>
        <header className="header">
          <NavBar />
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
                        
                          
                      >
                        Home
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </li>
                   
                      </Link>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Apparel
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        fahion
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        News
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="#"
                      >
                        Portfolio
                        <i className="fa fa-angle-double-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </section>
          <section className="slider-section">
            <div className="container">
              <div className="row d-flex justify-content-between align-items-center single-item-rtl ">
                <div className="d-flex">
                  <div className="carousel-img col-md-6 d-flex justify-content-center align-items-center">
                    <img
                      src="assets/images/slider-content-img.jpg"
                      className="d-block w-100"
                      alt="ring"
                    />
                  </div>
                  <div className="carousel-text col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <h1>RINGS ON SALE</h1>
                    <p className="text-center">
                      Lorem ipsum dolor sit amet, consecte adipiscing elit.
                      Fusce at justo eget lorem port titor tincidunt.
                    </p>
                    <a href="#">Visit Store</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </header>
        <main>
          <section className="cards-section">
            <div className="container">
              <div className="row justify-content-lg-center align-items-center text-center">
                <div className="col-sm-10 col-md-6">
                  <h3>OUR CATEGORIES</h3>
                  <span></span>
                  <small></small>
                  <span></span>
                  <p>
                    Check our latest offers that just arrived to the store. New{" "}
                    <span style={{ color: "#3bbdfb" }}>Nonummy</span> for you to
                    wear.
                  </p>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row justify-content-lg-between ">
                {category.length === 0 ? (
                  <p>No category found</p>
                ) : (
                  category.map((category) => (
                    <div className="col-sm-10 col-md-4 center" key={category._id}>
                      <div className="car-img-div">
                        <img
                          className="category-image-modify"
                          src={`http://localhost:5000/img/${category.picture}`}
                          alt={category.title}
                        />
                      </div>
                      <h2>{category.title}</h2>
                      <p>{category.description}</p>
                    </div>
                  ))
                )}
              </div>
              <div>
                <Link to="/all-categories">
                  <a href="#">Visit the Store</a>
                </Link>
              </div>
            </div>
          </section>
          {/* List Ctaegory finish. */}

          {/* Latest Arrival start. */}
          <section className="latus-arrival">
            <div className="container">
              <div className="row justify-content-lg-center align-items-center text-center">
                <div className="col-sm-10 col-md-6">
                  <h3>OUR LATEST ARRIVALS</h3>
                  <span></span>
                  <small></small>
                  <span></span>
                  <p>
                    Check our latest offers that just arrived to the store. New{" "}
                    <span style={{ color: "#3bbdfb" }}>Nonummy</span> for you to
                    wear.
                  </p>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row lazy justify-content-md-between justify-content-sm-between">
                {LatestProduct.length === 0 ? (
                  <p>No product found</p>
                ) : (
                  LatestProduct.map((product) => (
                    <div className="card" style={{ width: "18rem" }} key={product._id}>
                      <div className="catagory-imgs">
                        <a href="#">

                        
                        <img
                          src={`http://localhost:5000/img/${product.picture}`}
                          className="category-image-modify"
                          alt={product.title}
                           onClick={() => getselectedProduct(product._id)}

                          />
                          </a>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <b>${product.price}</b>
                        <div>
                          <a
                            href="#"
                            className="btn btn-primary"
                          >
                            Buy Now
                          </a>
                        </div>
                      </div>
                      <div className="catagory-icons">
                        <p>{product.categoryTitle}</p>
                        <ul>
                          <li>
                            <i className="fa fa-star"></i>{" "}
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
          {/* Latest Arrival finish. */}

          {/* Featured Product Start. */}
          <section className="featured-products">
            <div className="container">
              <div className="row justify-content-lg-center align-items-center text-center">
                <div className="col-sm-10 col-md-6">
                  <h3>Our Featured Products</h3>
                  <span></span>
                  <small></small>
                  <span></span>
                  <p>
                    Check our latest offers that just arrived to the store. New{" "}
                    <span style={{ color: "#3bbdfb" }}>Nonummy</span> for you to
                    wear.
                  </p>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row lazy justify-content-md-between justify-content-sm-between">
                <Link to="/product-details">
                  <a href="#"></a>
                </Link>
                {FeatureProduct.length === 0 ? (
                  <p>No product found</p>
                 ) : (
                  FeatureProduct.map((product) => (
                    <div className="card" style={{ width: "18rem" }} key={product._id}>
                      <div className="catagory-imgs">
                        <img
                          src={`http://localhost:5000/img/${product.picture}`}
                          className="category-image-modify"
                          alt={product.title}
                          href="#"
                         onClick={() => getselectedProduct(product._id)}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <b>${product.price}</b>
                        <a
                          className="btn btn-primary"
                        >
                          Buy Now
                        </a>
                      </div>
                      <div className="catagory-icons">
                        <p>{product.categoryTitle}</p>
                        <ul>
                          <li>
                            <i className="fa fa-star"></i>
                            {""}
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
          <section className="socail-section">
            <div className="container">
              <div className="row d-flex align-items-center ">
                <div className="col-sm-10 col-md-6 social-icons-left">
                  <span>
                    {""}
                    <i className="fa fa-twitter"></i>
                  </span>
                  <p>
                    Revenant was just released on #themeforest{" "}
                    <span style={{ color: "#3bbdfb" }}>
                      http://bit.ly/qoXj6m
                    </span>
                  </p>
                </div>
                <div className="col-sm-10 col-md-6 social-icons-right">
                  <p>Check the latest news on our Social Networks:</p>
                  <ul>
                    {/* <li>
                      <a href="#">
                        <i className="fa fa-wifi"></i>
                      </a>
                    </li> */}
                    <li>
                      <a href="https://help.pinterest.com">
                        {" "}
                        <i className="fa fa-pinterest-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/">
                        {" "}
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/">
                        {" "}
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-futbol-o" aria-hidden="true"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer/>
      </wrapper>

      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bundle.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/slick.min.js"></script>
    <script type="text/javascript">
        $('.single-item-rtl').slick({
                infinite: true,
                speed: 500,
                fade: true,
                autoplay: true,
                cssEase: 'linear',
            });
            $('.slick-slider').slick({
                lazyLoad: 'ondemand',
                slidesToShow: 4,
                slidesToScroll: 1,          
            });
            $('.lazy').slick({
                lazyLoad: 'ondemand',
                slidesToShow: 4,
                slidesToScroll: 1
            });
    </script> */}
    </>
  );
}

export default Home;
