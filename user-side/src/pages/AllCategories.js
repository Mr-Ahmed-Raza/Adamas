import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SocialSection from "../components/SocialSection";
import "../components/todoList.css";
import { Link } from "react-router-dom";
function AllCategories() {
  const [category, setcategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
  return (
    <>
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
                    <div className="col-sm-10 col-md-4 center">
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

export default AllCategories;
