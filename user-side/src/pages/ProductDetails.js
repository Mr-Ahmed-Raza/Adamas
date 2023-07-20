import NavBar from "../components/NavBar";
import axios from 'axios';
import Footer from "../components/Footer";
import SocialSection from "../components/SocialSection";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../components/todoList.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import toast, { Toaster } from 'react-hot-toast';


function Product_details() {
  const { productId } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sameCategoryProducts, setsameCategoryProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(productId);
    fetch(`http://localhost:5000/api/admin/Product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedProduct(data.selectedProduct);
        // const loggedInUserId = (JSON.parse(localStorage.getItem("userData"))._id);
        // console.log(loggedInUserId);
        // console.log(JSON.parse(localStorage.getItem("userData"))._id);
        // console.log(productId);
      });
  }, [productId]);
  useEffect(() => {
    getallthesameCategoryProducts(productId);
  }, []);
  const [expandedIndex, setExpandedIndex] = useState(null);
   //handle the readmore and readless for every single product
  const toggleDescription = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  // handle quantity change
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    setQuantity(parseInt(value, 10));
  };

  // handle quantity decrement
  const handleQuantityDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // handle quantity increment
  const handleQuantityIncrement = () => {
    setQuantity(quantity + 1);
  };
  // Fetch all the same category products
  const getallthesameCategoryProducts = (productId) => {
    // console.log(productId);
    fetch(`http://localhost:5000/api/admin/Product/recommended/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed with status: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setsameCategoryProduct(data.recommendedProducts);
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
         //load and  Redirect to productDetail page with selected product ID
         setLoading(true); // Show loader
         setTimeout(() => {
           setLoading(false); // Hide loader
           navigate(`/product-details/${productId}`);
         }, 1000); // Simulating a delay of 2 seconds before redirecting
        
      });    
  };

  const handleaddToCart = async () => {
   const loggedInUserId = (JSON.parse(localStorage.getItem("userData"))._id);
    const payload = {
      userId: loggedInUserId, 
      productId: productId, 
      quantity,
    }
    axios.post(`http://localhost:5001/api/cart/addToCart`, payload)
    .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
    })
    .catch(error => {
      console.error(error);
    });
    toast.success("product added to cart Successfully")
    setTimeout(() => {
      navigate("/cart-items");
    }, 2000);

  }

  return (
    <>
       {loading && <FullPageLoader />}
      <Toaster/>
      <wrapper>
        <header>
          <NavBar />
          
          <section className="slide-bar">
            <div className="container">
              <div className="row justify-content-lg-between align-items-center">
                <div className="col-sm- col-md-6">
                  <h1>{selectedProduct ? selectedProduct.title : ""}</h1>
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
          <section className="product-details bg-light">
            <div className="container ">
              <div className="row d-flex justify-content-md-between">
                <div className="colo-sm-10 col-md-8">
                  <div className="catagory-imgs">
                    <img
                      src={
                        selectedProduct
                          ? `http://localhost:5000/img/${selectedProduct.picture}`
                          : ""
                      }
                      className="category-image-modify-product"
                      alt={selectedProduct ? selectedProduct.title : ""}
                    />
                  </div>

                  {/* <div className="slider slider-for details-pic-div">
                    <div>
                      <img src="assets/images/details-pic-main.jpg" alt="" />
                    </div>
                    <div>
                      <img src="assets/images/details-pic-main.jpg" alt="" />
                    </div>
                    <div>
                      <img src="assets/images/details-pic-main.jpg" alt="" />
                    </div>
                    <div>
                      <img src="assets/images/details-pic-main.jpg" alt="" />
                    </div>
                    <div>
                      <img src="assets/images/details-pic-main.jpg" alt="" />
                    </div>
                  </div> */}
                  {/* <div className="slider slider-nav">
                    <div className="slick-slide slik-cloned">
                      <img src="assets/images/details-nav-1.jpg" alt="" />
                    </div>
                    <div className="slick-slide slik-cloned">
                      <img src="assets/images/details-nav-2.jpg" alt="" />
                    </div>
                    <div className="slick-slide slik-cloned">
                      <img src="assets/images/details-nav-3.jpg" alt="" />
                    </div>
                    <div className="slick-slide slik-cloned">
                      <img src="assets/images/details-nav-4.jpg" alt="" />
                    </div>
                    <div className="slick-slide slik-cloned">
                      <img src="assets/images/details-nav-5.jpg" alt="" />
                    </div>
                  </div> */}
                  {/* <div className="links">
                    <ul>
                      <li>
                        <a href="#">DESCRIPTION</a>
                      </li>
                      <li>
                        <a href="#">ADDITIONAL INFORMATION</a>
                      </li>
                      <li>
                        <a href="#">REVIEWS (2)</a>
                      </li>
                    </ul>
                  </div> */}
                </div>
                <div
                  className="col-sm-10 col-md-4"
                  key={selectedProduct ? selectedProduct._id : ""}
                 >
                  <div className="ring-rating-div">
                    <h5>{selectedProduct ? selectedProduct.title : ""}</h5>
                    <ul>
                      <li>
                        <a href="#">
                          <span>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="#">12 Reviews</a>
                      </li>
                      <li>
                        <a href="#">Add Your Review</a>
                      </li>
                    </ul>
                  </div>
                  <div className="rating-div-text">
                    <p>{selectedProduct ? selectedProduct.description : ""}</p>
                  </div>
                  <div className="size-color-div">
                    <div>
                      <label for="color">Color:</label>
                    </div>
                    <div>
                      <label for="Size">Size:</label>
                    </div>
                  </div>
                  <div className="quantity-div">
                    <ul>
                      <li>Qty:</li>
                      <li>
                        <div className="qty-div">
                          <i
                            className="fa fa-angle-left"
                            type ="number"
                            aria-hidden="true"
                            onClick={handleQuantityDecrement}
                          ></i>
                          <div className="qty-inp">
                            <div 
                              
                              type="number"
                              value={quantity}
                              onChange={handleQuantityChange}
                            />
                            {quantity}
                          </div>
                          <i
                            className="fa fa-angle-right"
                            aria-hidden="true"
                            onClick={handleQuantityIncrement}
                          ></i>
                        </div>
                      </li>
                      <li>
                        <small>
                          ${selectedProduct ? selectedProduct.price : ""}
                        </small>
                      </li>
                      <li>
                        <a href="#" onClick={()=>handleaddToCart()}>Add TO CART</a>
                      </li>
                    </ul>
                  </div>
                  <div className="rating-social-icons">
                    <ul>
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
                    </ul>
                  </div>
                </div>
                <p className="p">
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                  diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                  aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                  nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                  aliquip ex ea commodo consequat. Duis autem vel eum iriure
                  dolor in hendrerit in vulputate velit esse molestie consequat,
                  vel illum dolore eu feugiat nulla facilisis at vero eros et
                  accumsan et iusto odio dignissim qui blandit praesent luptatum
                  zzril delenit augue duis dolore te feugait nulla facilisi. Nam
                  liber tem por cum soluta nobis eleifend option congue nihil
                  imperdiet doming id quod mazim placerat facer possim assum.
                </p>
              </div>
            </div>
          </section>
          <h1>Recomended Products</h1>
          <section className="like-products">
            <div className="container">
              <div className="row lazy justify-content-md-between justify-content-sm-between">
                {Array.isArray(sameCategoryProducts) ? (
                  sameCategoryProducts.map((product , index) => (
                    <div
                      className="card"
                      style={{ width: "18rem" }}
                      key={product._id}
                    >
                      <div className="category-imgs">
                        <img
                          src={`http://localhost:5000/img/${product.picture}`}
                          className="card-img-top"
                          alt={product.title}
                          onClick={() => getselectedProduct(product._id)}
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p>
                          {expandedIndex === index
                            ? product.description
                            :product.description?.slice(0, 105) }
                          {product.description?.length > 105 && (
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
                      </div>
                      <div className="category-icons">
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
                ) : (
                  <p>no product found</p>
                )}
              </div>
            </div>
          </section>

          <SocialSection />
        </main>

        <Footer />
      </wrapper>
      {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/bundle.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/slick.min.js"></script>
    <script>
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
            });
            $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            arrows: false,
            focusOnSelect: true
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

export default Product_details;
