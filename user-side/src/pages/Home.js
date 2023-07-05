import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SocialSection from "../components/SocialSection";
import "../components/todoList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Home() {
  const [category, setcategory] = useState([]);
  // const [Product, setProduct] = useState([]);
  const [sliderecentProduct, setsliderecentProduct] = useState([]);
  const [LatestProduct, setLatestProduct] = useState([]);
  const [FeatureProduct, setFeatureProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleVisitStore = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      console.log("loader is hit");
      setLoading(false); // Hide loader
      navigate("/store"); // Redirect to store page
    }, 2000); // Simulating a delay of 2 seconds before redirecting
  };

  useEffect(() => {
    getAllcategory();
    getLatestProduct();
    getAllFeaturedProduct();
    getsliderecentProduct();
  }, []);

  const [expandedIndex, setExpandedIndex] = useState(null);
  //handle the readmore and readless for every single product
 const toggleDescription = (index) => {
   setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
 };
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
    fetch("http://localhost:5000/api/admin/product/latest-arrivals")
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
    fetch(`http://localhost:5000/api/admin/product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // setSelectedProduct(data.selectedProduct);
        // getAllcategory();
        // Redirect to productDetail page with selected product ID
        setLoading(true); // Show loader
        setTimeout(() => {
          setLoading(false); // Hide loader
          navigate(`/product-details/${productId}`);
        }, 1000); // Simulating a delay of 2 seconds before redirecting

      });
  };
  // Fetch sliderecent product
  const getsliderecentProduct = () => {
    fetch("http://localhost:5000/api/admin/product/sliderecent-product")
      .then((response) => response.json())
      .then((data) => {
        //  console.log("sliderecent products" , data);
        setsliderecentProduct(data.product);
      })
      .catch((error) => console.log("Error fetching Product:", error));
  };
  // handle category select
  const handleCategorySelect = (categoryId) => {
      fetch(`http://localhost:5000/api/admin/category/${categoryId}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setSelectedCategory(data.selectedcategory);
          // getAllcategory();
          // Redirect to productDetail page with selected product ID
          setLoading(true); // Show loader
          setTimeout(() => {
            setLoading(false); // Hide loader
            navigate(`/store/categories/${categoryId}`);
          }, 1000); // Simulating a delay of 2 seconds before redirecting
  
        });
    
  };

  return (
    <>
      {loading && <Loader />}
      <wrapper>
        <header className="header">
          <NavBar />
          <section className="slider-section">
            <div className="container">
              <div className="row d-flex justify-content-between align-items-center single-item-rtl ">
                {sliderecentProduct.map((product) => (
                  <div className="d-flex">
                    <div className="carousel-img col-md-6 d-flex justify-content-center align-items-center">
                      <img
                        src={`http://localhost:5000/img/${product.picture}`}
                        className="d-block w-100"
                        alt={product.title}
                        onClick={() => getselectedProduct(product._id)}
                      />
                    </div>
                    <div className="carousel-text col-md-6 d-flex flex-column justify-content-center align-items-center">
                      <h1>{product.title}</h1>
                      <p className="text-center">{product.description}</p>
                      <div>
                        
                          <a href="#" onClick={()=>handleVisitStore()}>Visit Store</a>
                        
                      </div>
                    </div>
                  </div>
                ))}
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
                    <div
                      className="col-sm-10 col-md-4 center"
                      key={category._id}
                    >
                      <div className="car-img-div">
                        <img
                          className="category-image-modify"
                          src={`http://localhost:5000/img/${category.picture}`}
                          onClick={() => handleCategorySelect(category._id)}
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
                  <a href="#" onClick={()=>handleVisitStore()}>Visit the Store</a>  
              </div>
            </div>
          </section>
          {/* List Category finish. */}

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
                  LatestProduct.map((product,index) => (
                    <div
                      className="card"
                      style={{ width: "18rem" }}
                      key={product._id}
                    >
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
                        <p> 
                          {expandedIndex === index
                            ? product.description
                            : product.description.slice(0 , 105)}
                          {product.description.length > 105 && (
                            <span>
                              {""}
                              <a
                                className="read-more-a"
                                onClick={() => toggleDescription(index)}
                              >
                                {expandedIndex === index
                                  ? "Read Less"
                                  : "Read More"}
                              </a>
                            </span>
                          )}
                        
                        </p>
                        <b>${product.price}</b>
                        <div>
                          <a href="#" className="btn btn-primary">
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
                  FeatureProduct.map((product ,index) => (
                    <div
                      className="card"
                      style={{ width: "18rem" }}
                      key={product._id}
                    >
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
                        <p> 
                          {expandedIndex === index
                            ? product.description
                            : product.description.slice(0 , 105)}
                          {product.description.length > 105 && (
                            <span>
                              {""}
                              <a
                                className="read-more-a"
                                onClick={() => toggleDescription(index)}
                              >
                                {expandedIndex === index
                                  ? "Read Less"
                                  : "Read More"}
                              </a>
                            </span>
                          )}
                        
                        </p>
                        <b>${product.price}</b>
                        <a className="btn btn-primary">Buy Now</a>
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
        </main>
        <SocialSection />

        <Footer />
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
