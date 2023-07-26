import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SocialSection from "../components/SocialSection";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <>
      <wrapper>
        <header className="header">
          <NavBar/>
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
         <SocialSection/>
        </main>
        
        <Footer/>
      </wrapper>
    </>
  );
}

export default Contact;
