import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SocialSection from "../components/SocialSection";
import "../components/todoList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";

function AllCategories() {
  const [category, setcategory] = useState([]);
  const [Product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const CategoryPerPage = 6;
  const totalPages = Math.ceil(category.length / CategoryPerPage);
  const indexOfLastCategory = currentPage * CategoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - CategoryPerPage;
  const currentCategory = category.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  useEffect(() => {
    getAllcategory();
  }, []);
  // To handle the paginations clicks
  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlebacktohome = () => {
    setLoading(true); // Show loader
    setTimeout(() => {
      setLoading(false); // Hide loader
      navigate(`/`);
    }, 1000); // Simulating a delay of 2 seconds before redirecting
}
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

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    if (categoryId === "all") {
      getAllProduct();
    } else {
      fetch(`http://localhost:5000/api/admin/category/${categoryId}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setSelectedCategory(data.selectedcategory);
          // getAllcategory();
          // Redirect to productDetail page with selected product ID
          setLoading(true); // Show loader
          setTimeout(() => {
            console.log("loader is hit");
            setLoading(false); // Hide loader
            navigate(`/store/categories/${categoryId}`);
          }, 1000); // Simulating a delay of 2 seconds before redirecting
        });
    }
  };
   //Fetch all products
   const getAllProduct = () => {
    fetch("http://localhost:5000/api/admin/Product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data.product);
      })
      .catch((error) => console.log("Error fetching Product:", error));
  };
  return (
    <>
      {loading && <FullPageLoader />}
      <wrapper>
        <header className="header">
          <NavBar />
         
        </header>
        <main>
          <section className="cards-section">
            <div className="container">
              <div className="row justify-content-lg-between ">
                <h1>ALL CATEGORIES</h1>
                {currentCategory.length === 0 ? (
                  <p>No category found</p>
                ) : (
                  currentCategory.map((category) => (
                    <div className="col-sm-10 col-md-4 center" key={category._id}>
                      <div className="car-img-div">
                        <img
                          className="category-image-modify"
                          src={`http://localhost:5000/img/${category.picture}`}
                          alt={category.title}
                          onClick={()=>handleCategorySelect(category._id)}
                        />
                      </div>
                      <h2>{category.title}</h2>
                      <p>{category.description}</p>
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

export default AllCategories;
