import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Catagorey() {
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
                      <li>
                        <a href="#">Jewlery (3)</a>
                      </li>
                      <li>
                        <a href="#">Apparel (5)</a>
                      </li>
                      <li>
                        <a href="#">Rings (8)</a>
                      </li>
                      <li>
                        <a href="#">Dress & Jackets (12)</a>
                      </li>
                      <li>
                        <a href="#">Neckleces (14)</a>
                      </li>
                      <li>
                        <a href="#">Bags (15)</a>
                      </li>
                    </ul>
                  </div>

                  <div>
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
                  </div>
                  <div className="topside-recent">
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
                  </div>
                </div>
                <div className="col-sm-10 col-md-9">
                  <div className="container">
                    <div className="row gy-4 justify-content-md-between justify-content-sm-between">
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="catagory-imgs">
                          <img
                            src="assets/images/latus-arival-1.png"
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">Set of Wedding Rings</h5>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, cocteru adipiscing elit.
                            Lorem ipsum dolor adipiscing elit edam itis.{" "}
                          </p>
                          <b>$25.89</b>
                          <a href="#" className="btn btn-primary">
                            Buy Now
                          </a>
                        </div>
                        <div className="catagory-icons">
                          <p>
                            <i className="fa fa-sliders"></i>Catagory
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
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="catagory-imgs">
                          <img
                            src="assets/images/latus-arival-2.png"
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">Set of Wedding Rings</h5>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, cocteru adipiscing elit.
                            Lorem ipsum dolor adipiscing elit edam itis.{" "}
                          </p>
                          <b>$25.89</b>
                          <a href="#" className="btn btn-primary">
                            Buy Now
                          </a>
                        </div>
                        <div className="catagory-icons">
                          <p>
                            <i className="fa fa-sliders"></i>Catagory
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
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="catagory-imgs">
                          <img
                            src="assets/images/latus-arival-3.png"
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">Blue Sky diamond</h5>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, cocteru adipiscing elit.
                            Lorem ipsum dolor adipiscing elit edam itis.{" "}
                          </p>
                          <b>$25.89</b>
                          <a href="#" className="btn btn-primary">
                            Buy Now
                          </a>
                        </div>
                        <div className="catagory-icons">
                          <p>
                            <i className="fa fa-sliders"></i>Catagory
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
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="catagory-imgs">
                          <img
                            src="assets/images/latus-arival-1.png"
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">A black leather Purse</h5>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, cocteru adipiscing elit.
                            Lorem ipsum dolor adipiscing elit edam itis.{" "}
                          </p>
                          <b>$25.89</b>
                          <a href="#" className="btn btn-primary">
                            Buy Now
                          </a>
                        </div>
                        <div className="catagory-icons">
                          <p>
                            <i className="fa fa-sliders"></i>Catagory
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
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="catagory-imgs">
                          <img
                            src="assets/images/latus-arival-2.png"
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">
                            Silver ring with diamond
                          </h5>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, cocteru adipiscing elit.
                            Lorem ipsum dolor adipiscing elit edam itis.{" "}
                          </p>
                          <b>$25.89</b>
                          <a href="#" className="btn btn-primary">
                            Buy Now
                          </a>
                        </div>
                        <div className="catagory-icons">
                          <p>
                            <i className="fa fa-sliders"></i>Catagory
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
                      <div className="card" style={{ width: "18rem" }}>
                        <div className="catagory-imgs">
                          <img
                            src="assets/images/latus-arival-3.png"
                            className="card-img-top"
                            alt="..."
                          />
                        </div>
                        <div className="card-body">
                          <h5 className="card-title">Set of Wedding Rings</h5>
                          <p className="card-text">
                            Lorem ipsum dolor sit amet, cocteru adipiscing elit.
                            Lorem ipsum dolor adipiscing elit edam itis.{" "}
                          </p>
                          <b>$25.89</b>
                          <a href="#" className="btn btn-primary">
                            Buy Now
                          </a>
                        </div>
                        <div className="catagory-icons">
                          <p>
                            <i className="fa fa-sliders"></i>Catagory
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
                    </div>
                    <div className="pagination-links">
                      <ul>
                        <li>
                          <a href="#">Previous</a>
                        </li>
                        <li>
                          <a href="#" style={{ backgroundColor: "#3bbdfb" }}>
                            1
                          </a>
                        </li>
                        <li>
                          <a href="#">2</a>
                        </li>
                        <li>
                          <a href="#">3</a>
                        </li>
                        <li>
                          <a href="#">4</a>
                        </li>
                        <li>
                          <a href="#">Next</a>
                        </li>
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
                    <span style={{ color: "3bbdfb" }}>
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
        <Footer />
      
      </>

      
     
    
    );

}


export default Catagorey;





{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
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
      </script> */}