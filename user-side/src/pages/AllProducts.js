import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SocialSection from "../components/SocialSection";
import "../components/todoList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function AllProducts() {
  const [Product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalPages = Math.ceil(Product.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    getAllProduct();
  }, []);
    // To handle the paginations clicks 
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // get all products
  const getAllProduct = () => {
    fetch("http://localhost:5000/api/admin/Product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data.product);
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
        </header>
        <main>
          <section className="cards-section">
            <div className="container">
              <div className="row justify-content-lg-between ">
                <h1>ALL Products</h1>
                {currentProducts.length === 0 ? (
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
                              <div>
                  <Link to="/">
                    <a href="#">Back To Home </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <SocialSection />
        </main>

        <Footer />
      </wrapper>
    </>
  );
}

export default AllProducts;
