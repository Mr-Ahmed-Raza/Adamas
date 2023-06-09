import React, { useEffect, useState } from "react";
// import { VStack } from "@chakra-ui/react";
// import "./todo.css";
// import "../../App.css";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

function AddProduct() {
  const [title, settitle] = useState();
  const [description, setdescription] = useState();
  const [price, setprice] = useState();
//const [featured, setfeatured] = useState(true);
  const [categories, setcategories] = useState([]);
  const [picture, setPicture] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const history = useHistory();

  const onchangetitle = (event) => {
    settitle(event.target.value);
    clearError("title");
  };
  const onchangedescription = (event) => {
    setdescription(event.target.value);
    clearError("description");
  };
  const onchangepicture = (event) => {
    setPicture(event.target.files[0]);
    console.log(event.target.files[0]);
    clearError("picture");
  };
  const onchangeprice = (event) => {
    setprice(event.target.value);
    clearError("price");
  };
  const onchangeselectedcategory = (event) => {
    const categoryId = event.target.value;
    setSelectedCategoryId(categoryId);
      console.log(event.target.value);
    clearError("selectedCategoryId");
  };
//   const handleFeaturedSwitch = (event) => {
//    setfeatured(event.target.value);
//       clearError("featured");
//   };

  // to clear validation error when user enter anything to particular field
  const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [fieldName]: "",
      };
    });
  };

  // All the form validations are check here
  const validationChecks = () => {
    let formIsValid = true;
    const errors = {};

    if (!title) {
      formIsValid = false;
      errors.title = "Title is required";
    }
    if (!description) {
      formIsValid = false;
      errors.description = "Description is required";
    }
    if (!price) {
      formIsValid = false;
      errors.price = "Price is required";
    }
    if (!selectedCategoryId) {
      formIsValid = false;
      errors.selectedCategoryId = "category is required"
    }
    if (!picture) {
      formIsValid = false;
      errors.picture = "Picture is required";
    }
    // else if (!picture.type === "jpg","jpeg","png","gif" ) {
    //   formIsValid = false;
    //   errors.picture = "Picture is required";
    // }
    setErrors(errors);
    return formIsValid;
  };
  const submitHandle = async (event) => {
    try {
      event.preventDefault();
      // Send data front to api backend
      var formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("selectedCategoryId", selectedCategoryId);
      formData.append("picture", picture, picture.name);


      if (!validationChecks()) {
        return;
      }
      // calling backend api
      await fetch("http://localhost:5000/api/admin/product/add-product", {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          settitle("");
          setdescription("");
          setprice("");
          setPicture("");
          setSelectedCategoryId("");
          history.push("/product-list");
        });
    } catch (error) {
      console.error("Error ; ", error);
    }
  };

  useEffect(() => {
    getAllcategory();
  }, []);

  const getAllcategory = () => {
    fetch("http://localhost:5000/api/admin/category/all-category")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setcategories(data.category);
      })
      .catch((error) => console.log("Error fetching category:", error));
  };

  return (
    <>
      <div className="main-page">
        <Container>
          <div>
            <h1>Adamas</h1>
          </div>

          <form className="bg-green-500 hover:bg-green-600 rounded-xl">
            <div className="text">
              <h3>Add-Product</h3>
            </div>
            <div className="input-group">
              <label for="title">Enter Title</label>
              <div className="input-field">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter product title"
                  name="title"
                  value={title}
                  onChange={onchangetitle}
                />
              </div>
              <div className="error">{<span>{errors.title}</span>}</div>
            </div>
            <div className="input-group">
              <label>Enter description</label>
              <div className="input-field">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter product description"
                  name="description"
                  value={description}
                  onChange={onchangedescription}
                />
              </div>
              <div className="error">{<span>{errors.description}</span>}</div>
            </div>
            <div className="input-group">
              <label>Enter Price</label>
              <div className="input-field">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Enter product Price"
                  name="price"
                  value={price}
                  onChange={onchangeprice}
                />
              </div>
              <div className="error">{<span>{errors.price}</span>}</div>
            </div>
            <div className="input-group">
              <label>Picture</label>
              <div className="input-field">
                <input
                  className="form-control"
                  type="file"
                  name="picture"
                  onChange={onchangepicture}
                />
              </div>
              <div className="error">{<span>{errors.picture}</span>}</div>
            </div>
            <div className="input-group">
              <label>Select category</label>
              <select name="selectedCategoryId" required className="input-field" onChange={onchangeselectedcategory}>
                <option value="">Select Category</option>
                {Array.isArray(categories)
                  ? categories.map((category) => (
                      <option key={category._id} value={category._id} name="selectedCategoryId">
                        {category.title}
                      </option>
                    ))
                  : ""}
              </select>
              <div className="error">{<span>{errors.selectedCategoryId}</span>}</div>
            </div>

            {/* <div className="input-group">
              <label>
                Featured:
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={handleFeaturedSwitch}
                  />
                  <span className="slider"></span>
                </label>
              </label>
            </div> */}
            <div className="button">
              <button className="button1" onClick={submitHandle}>
                Add-Product
              </button>
            </div>
            <br></br>
          </form>
        </Container>
      </div>
    </>
  );
}

export default AddProduct;
