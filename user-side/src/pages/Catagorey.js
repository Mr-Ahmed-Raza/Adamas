import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../components/todoList.css";
import { useNavigate } from "react-router-dom";


function Catagorey() {
  const [Product, setProduct] = useState([]);
  const [category, setcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const navigate = useNavigate();
  const productsPerPage = 6;
  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    getAllcategory();
  }, []);
  // fetch all the categories
  const getAllcategory = () => {
    fetch("http://localhost:5000/api/admin/category/all-category")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setcategory(data.category);
      })
      .catch((error) => console.log("Error fetching category:", error));
  };

  // Fetch products by category
  const getProductsByCategory = () => {
    fetch(
      `http://localhost:5000/api/admin/category/categorized-product/${selectedCategory}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategoryProducts(data.products);
      })
      .catch((error) => console.log("Error fetching products:", error));
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  
    if (category === "All") {
      fetch("http://localhost:5000/api/admin/Product")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setProduct(data.product);
        })
        .catch((error) => console.log("Error fetching Product:", error));
    } else {
      getProductsByCategory(category);
    }
  };
  useEffect(() => {
    if (selectedCategory !== "") {
      getProductsByCategory();
    }
  }, [selectedCategory]);

  // useEffect(() => {
  //   getAllProduct();
  // }, []);
  // //Fetch all products
  // const getAllProduct = () => {
  //   fetch("http://localhost:5000/api/admin/Product")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setProduct(data.product);
  //     })
  //     .catch((error) => console.log("Error fetching Product:", error));
  // };

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
      <header>
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
                          href="#"
                        >
                          Home
                          <i className="fa fa-angle-double-right"></i>
                        </a>
                      </li>
                    </Link>
                  
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Apparel
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      fahion
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      News
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Portfolio
                      <i className="fa fa-angle-double-right"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </section>
        <section className="slide-bar">
          <div className="container">
            <div className="row justify-content-lg-between align-items-center">
              <div className="col-sm- col-md-6">
                <h1>Shop with a Sidebar On Left</h1>
                <div className="slide-bar-heading">
                  <ul>
                    <li>
                      <a href="#">
                        Home <i className="fa fa-angle-double-right"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">Shop with a sidebar</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-10 col-md-6 flex">
                <div>
                  <a href="#">
                    <i className="fa fa-mobile" aria-hidden="true"></i>
                  </a>
                </div>
                <div>
                  <ul>
                    <li>
                      <h2>+565 975 658</h2>
                    </li>
                    <li>
                      <p>Monday - Friday, 8.00-20.00</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
      <main>
        <section className="catagories-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-10 col-md-3">
                <div className="top-sidebar-ul">
                  <h3>Catagories</h3>
                  <ul>
                    <li
                      className={!selectedCategory ? "active" : ""}
                      onClick={() => handleCategorySelect("All")}
                    >
                      <a href="#">All</a>
                    </li>
                  </ul>
                  {category.length === 0 ? (
                    <p>No category found</p>
                  ) : (
                    category.map((category) => (
                      <ul>
                        <li
                          key={category._id}
                          onClick={() => handleCategorySelect(category._id)}
                          style={{
                            fontWeight:
                              category._id === selectedCategory
                                ? "bold"
                                : "normal",
                          }}
                        >
                          <a href="#">{category.title}</a>
                        </li>
                      </ul>
                    ))
                  )}
                </div>

                {/* <div>
                  <h4>Best Sellers</h4>
                  <div className="autoplay">
                    <div className="side-slider">
                      <img src="assets/images/sider-bar-ring.jpg" alt="" />
                      <h4>Silver ring With a Diamond</h4>
                    </div>
                    <div className="side-slider">
                      <img src="assets/images/sider-bar-ring.jpg" alt="" />
                      <h4>Silver ring With a Diamond</h4>
                    </div>
                    <div className="side-slider">
                      <img src="assets/images/sider-bar-ring.jpg" alt="" />
                      <h4>Silver ring With a Diamond</h4>
                    </div>
                  </div>
                </div>
                <div className="top-sidebar-ul">
                  <h4>Price Range</h4>
                  <ul>
                    <li>
                      <a href="#">$5.0 - $50.0</a>
                    </li>
                    <li>
                      <a href="#">$50.0 - $100.0</a>
                    </li>
                    <li>
                      <a href="#">$100.0 - $150.0</a>
                    </li>
                    <li>
                      <a href="#">$150.0 - $200.0</a>
                    </li>
                    <li>
                      <a href="#">$200.0 - $300.0</a>
                    </li>
                  </ul>
                </div> */}
                {/* <div className="topside-recent">
                  <div className="topside-recent-child">
                    <div>
                      <img src="assets/images/ring.jpg" alt="" />
                    </div>
                    <div className="topside-recent-subchild">
                      <ul>
                        <li>
                          <a href="#">
                            <p>Blue Sky Diamond</p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            {" "}
                            <i className="fa fa-star"></i>{" "}
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#">$2789.0</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="topside-recent-child">
                    <div>
                      <img src="assets/images/red-ring.jpg" alt="" />
                    </div>
                    <div className="topside-recent-subchild">
                      <ul>
                        <li>
                          <a href="#">
                            <p>Fiery Red Ring</p>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            {" "}
                            <i className="fa fa-star"></i>{" "}
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>{" "}
                          </a>
                        </li>
                        <li>
                          <a href="#">$2789.0</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="col-sm-10 col-md-9">
                <div className="container">
                  <div className="row gy-4 justify-content-md-between justify-content-sm-between">
                    {currentProducts.length == 0 ? (
                      <p>No product found</p>
                    ) : (
                      currentProducts.map((product) => (
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
                              onClick={() => getselectedProduct(product._id)}

                            />
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.description}</p>
                            <b>${product.price}</b>
                            <a href="#" className="btn btn-primary">
                              Buy Now
                            </a>
                          </div>
                          <div className="catagory-icons">
                            <p>
                              <i className="fa fa-sliders"></i>
                              {product.categoryTitle}
                            </p>
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

                  {/* Pagination start  */}

                  <div className="pagination-links">
                    <ul>
                      {currentPage > 1 && (
                        <li>
                          <a
                            href="#"
                            onClick={() => handleClick(currentPage - 1)}
                          >
                            Previous
                          </a>
                        </li>
                      )}
                      {Array.from({ length: totalPages }, (_, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            style={{
                              backgroundColor:
                                currentPage === index + 1 ? "#3bbdfb" : "",
                            }}
                            onClick={() => handleClick(index + 1)}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}
                      {currentPage < totalPages && (
                        <li>
                          <a
                            href="#"
                            onClick={() => handleClick(currentPage + 1)}
                          >
                            Next
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="socail-section">
          <div className="container">
            <div className="row d-flex align-items-center ">
              <div className="col-sm-10 col-md-6 social-icons-left">
                <span>
                  {" "}
                  <i className="fa fa-twitter"></i>
                </span>
                <p>
                  Revenant was just released on #themeforest{" "}
                  <span style={{ color: "3bbdfb" }}>http://bit.ly/qoXj6m</span>
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
      <Footer />
    </>
  );
}

export default Catagorey;

{
  /* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
     <script src="js/bootstrap.min.js"></script>
     <script src="js/bundle.min.js"></script>
     <script src="js/popper.min.js"></script>
     <script src="js/slick.min.js"></script>

     <script type="text/javascript">
        (document).ready(function () {
            ('.single-item-rtl').slick({
                infinite: true,
                speed: 500,
                fade: true,
                autoplay: true,
                cssEase: 'linear'
            })
        });
     </script>    
     <script>
        ('.autoplay').slick(
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
         prevArrow:'  <span className="priv_arrow"><i className="fa fa-angle-left"></i></span>  ',
         nextArrow:'  <span className="next_arrow"><i className="fa fa-angle-right"></i></span>  ',
      )
      </script> */
}
