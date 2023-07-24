import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SocialSection from "../components/SocialSection";
import "../components/todoList.css";
import axios from 'axios'
import { useNavigate ,useLocation } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";

function AllProducts() {
  const [Product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const searchLocation = useLocation();
    const searchQuery = new URLSearchParams(searchLocation.search).get("query");
    
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalPages = Math.ceil(Product.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Product.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [expandedIndex, setExpandedIndex] = useState(null);
   //handle the readmore and readless for every single product
  const toggleDescription = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
 
  const handlebacktohome = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader
      navigate(`/`);
    }, 1000); // Simulating a delay of 2 seconds before redirecting
}
useEffect(() => {
    setLoading(true);

    // Fetch search results based on the searchQuery
    // Make an API call to fetch the search results from the backend
    const fetchSearchResults = async () => {
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

        // Assuming the API response contains the product details in 'results'
        setSearchResults(response.data.results);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchSearchResults();
}, [searchQuery]);
    
  // To handle the paginations clicks
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // get the selected product
  const getselectedProduct = (productId) => {
    fetch(`http://localhost:5000/api/admin/Product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setSelectedProduct(data.selectedProduct);
        // getAllcategory();
        setLoading(true); // Show loader
        setTimeout(() => {
          setLoading(false); // Hide loader
          navigate(`/product-details/${productId}`);
        }, 1000); // Simulating a delay of 2 seconds before redirecting
      });
  };
  return (
    <>
      <wrapper>
      {loading && <FullPageLoader />}
        <header className="header">
          <NavBar />
        </header>
        <main>
          <section className="cards-section">
            <div className="container">
              <div className="row justify-content-lg-between ">
                <h1>Products</h1>
                {searchResults.length === 0 ? (
                  <p>No product found</p>
                ) : (
                    searchResults.map((product ,index) => (
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
                        <p>
                          {expandedIndex === index
                            ? product.description
                            : product.description.slice(0, 105)}
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
                 
                    <a href="#" onClick={()=>{handlebacktohome()}}>Back To Home </a>
                  
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
