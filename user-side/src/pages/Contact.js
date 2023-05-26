import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <>
      <wrapper>
        <header className="header">
          <NavBar/>
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
          <section className="slide-bar">
            <div className="container">
              <div className="row justify-content-lg-between align-items-center">
                <div className="col-sm- col-md-6">
                  <h1>Drop Us a note</h1>
                  <div className="slide-bar-heading">
                    <ul>
                      <li>
                        <a href="#">
                          Home <i className="fa fa-angle-double-right"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">Shop</a>
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
          <section className="map">
            <div>
              <img src="assets/images/map.jpg" alt="" />
            </div>
          </section>
          <section className="form bg-light">
            <div className="container">
              <div className="row">
                <div className="col-sm-10 col-md-9">
                  <div>
                    <form>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Your Name{" "}
                          <span style={{ color: "grey" }}>(required)</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Your Email{" "}
                          <span style={{ color: "grey" }}>(required)</span>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Your Website{" "}
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                        />
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                          Your Message{" "}
                          <span style={{ color: "grey" }}>(required)</span>{" "}
                        </label>
                        <textarea
                          className="form-control"
                          placeholder=""
                          id="floatingTextarea"
                          style={{ resize: "none" }}
                        ></textarea>
                      </div>
                      <div className="submit-buttons">
                        <ul>
                          <li>
                            <a href="#">Clear Message</a>
                          </li>
                          <li>
                            <a href="#">Send Message</a>
                          </li>
                        </ul>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-sm-10 col-md-3">
                  <div className="little-about-div">
                    <h6>Little About Our Comapny</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consecteter vet adipiscing
                      elit , sed diam nonummy nibh ase euin mod tincidunt ut
                      laoreet dolore mati magna aliquam{" "}
                      <span style={{ color: "#3bbdfb" }}>erat volutpat.</span>{" "}
                      Iam nonunum mmy nibh euin mod tincidunt ut laoreet. Lorem
                      ipsum dolor sit amet, consecteter vet adipiscing elit ,
                      sed diam nonummy nibh ase euin mod tincidunt ut laoreet
                      dolore mati magna aliquam{" "}
                      <span style={{ color: "#3bbdfb" }}>erat volutpat.</span>{" "}
                      Iam nonunum mmy nibh euin mod tincidunt ut laoreet.
                    </p>
                  </div>
                  <div className="container-lg justify-content-lg-start">
                    <div className="row justify-content-lg-center">
                      <div className="col-sm-12 col-md-12">
                        <div className="little-about-icons">
                          <div className="icons-display">
                            <div className="icon">
                              <i
                                className="fa fa-map-marker"
                                aria-hidden="true"
                              ></i>
                            </div>
                            <a href="#">
                              <span>Address:</span>
                              <small> Celovska cesta 1,Ljub</small>
                            </a>
                          </div>
                          <div className="icons-display">
                            <div className="icon">
                              <i
                                className="fa fa-envelope"
                                aria-hidden="true"
                              ></i>
                            </div>

                            <a href="#">
                              <span>Email:</span>{" "}
                              <small>info@premiumcoding.com</small>
                            </a>
                          </div>
                          <div className="icons-display">
                            <div className="icon">
                              <i
                                className="fa fa-mobile"
                                aria-hidden="true"
                              ></i>
                            </div>
                            <a href="#">
                              <span>Phone Number:</span>{" "}
                              <small>+456 789 854</small>
                            </a>
                          </div>
                        </div>
                      </div>
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
                    <span style={{ color: "#3bbdfb" }}>
                      http://bit.ly/qoXj6m
                    </span>
                  </p>
                </div>
                <div className="col-sm-10 col-md-6 social-icons-right">
                  <p>Check the latest news on our Social Networks:</p>
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-wifi"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fa fa-pinterest-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        {" "}
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
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
    </>
  );
}

export default Contact;
