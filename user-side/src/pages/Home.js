import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

function Home() {
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
          <section className="slider-section">
            <div className="container">
              <div className="row d-flex justify-content-between align-items-center single-item-rtl ">
                <div className="d-flex">
                  <div className="carousel-img col-md-6 d-flex justify-content-center align-items-center">
                    <img
                      src="assets/images/slider-content-img.jpg"
                      className="d-block w-100"
                      alt="ring"
                    />
                  </div>
                  <div className="carousel-text col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <h1>RINGS ON SALE</h1>
                    <p className="text-center">
                      Lorem ipsum dolor sit amet, consecte adipiscing elit.
                      Fusce at justo eget lorem port titor tincidunt.
                    </p>
                    <a href="#">Visit Store</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </header>
        <main>
          <section className="cards-section">
            <div className="container">
              <div className="row justify-content-lg-between ">
                <div className="col-sm-10 col-md-4 center">
                  <div className="car-img-div">
                    <img src="assets/images/card1.jpg" alt="" />
                  </div>
                  <h2>Check our Ring Collection</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce
                    at justo eget lorem port titor tincidunt.
                  </p>
                  <a href="#">Visit Store</a>
                </div>
                <div className="col-sm-10 col-md-4 center">
                  <div className="car-img-div">
                    <img src="assets/images/card2.jpg" alt="" />
                  </div>
                  <h2>Summer Hat Collection</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce
                    at justo eget lorem port titor tincidunt.
                  </p>
                  <a href="#">Visit Store</a>
                </div>
                <div className="col-sm-10 col-md-4 center">
                  <div className="car-img-div">
                    <img src="assets/images/card3.jpg" alt="" />
                  </div>
                  <h2>Veils on Slae</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consecte adipiscing elit. Fusce
                    at justo eget lorem port titor tincidunt.
                  </p>
                  <a href="#">Visit Store</a>
                </div>
              </div>
            </div>
          </section>
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
                <div className="card" style={{ width: "18rem" }}>
                  <div className="catagory-imgs">
                    <img
                      src="assets/images/latus-arival-1.png"
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Set Of Wedding Rings</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem
                      ipsum dolor adipiscing elit edam itis.{" "}
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
                    <h5 className="card-title">Blue Sky Diamond</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem
                      ipsum dolor adipiscing elit edam itis.{" "}
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
                    <h5 className="card-title">A Black Leather Purse</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem
                      ipsum dolor adipiscing elit edam itis.{" "}
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
                      src="assets/images/latus-arival-4.png"
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Silver Ring with Blue diamond
                    </h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem
                      ipsum dolor adipiscing elit edam itis.{" "}
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
            </div>
          </section>
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
                <div className="card" style={{ width: "18rem" }}>
                  <div className="catagory-imgs">
                    <img
                      src="assets/images/latus-arival-1.png"
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Set Of Wedding Rings</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem
                      ipsum dolor adipiscing elit edam itis.{" "}
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
                    <h5 className="card-title">Blue Sky Diamond</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem
                      ipsum dolor adipiscing elit edam itis.{" "}
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
                    <h5 className="card-title">A Black Leather Purse</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem
                      ipsum dolor adipiscing elit edam itis.{" "}
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
                      src="assets/images/latus-arival-4.png"
                      className="card-img-top"
                      alt="..."
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      Silver Ring with Blue diamond
                    </h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, cocteru adipiscing elit. Lorem
                      ipsum dolor adipiscing elit edam itis.{" "}
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
