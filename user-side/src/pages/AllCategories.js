import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../components/todoList.css"
import { Link } from "react-router-dom";
function AllCategories() {
    const [category, setcategory] = useState([]);


  useEffect(() => {
    getAllcategory();
  }, []);
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
                </header>
                <main>
                <section className="cards-section">
            <div className="container">
                            <div className="row justify-content-lg-between ">
                                <h1>ALL CATEGORIES</h1>
                {category.length === 0 ? (
                  <p>No category found</p>
                ) : (
                    category.map((category) => (

                      <div className="col-sm-10 col-md-4 center">
                    <div className="car-img-div">
                          <img className="category-image-modify"
                            src={`http://localhost:5000/img/${category.picture}`}
                            alt={category.title} />
                    </div>
                        <h2>{category.title}</h2>
                    <p>
                      {category.description}
                    </p>
                  </div>
                    ))
                )}
                <div>
                <Link to="/">
                  <a href="#">Back To Home </a>
                </Link>
              </div>
              </div>
            </div>
          </section>
                </main>

            <Footer/>
      </wrapper>

      </>
  )
}

export default AllCategories