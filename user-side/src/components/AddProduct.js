import { useEffect, useRef, useState } from "react";
// import { VStack } from "@chakra-ui/react";
import "./todo.css";
import "./toggle.css";
// import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DOMPurify from "dompurify";
import toast, { Toaster } from 'react-hot-toast';

function AddProduct() {
  const [title, settitle] = useState();
  const [description, setdescription] = useState();
  const [price, setprice] = useState();
  const [featured, setFeatured] = useState("No");
  const [categories, setcategories] = useState([]);
  const [picture, setPicture] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate();
  const editorRef = useRef();

  
  useEffect(() => {
    if (
      editorRef.current &&
      editorRef.current.editor &&
      editorRef.current.editor.editing
    ) {
      editorRef.current.editor.editing.view.change((writer) => {
        writer.setStyle(
          "height",
          "200px",
          editorRef.current.editor.editing.view.document.getRoot()
        );
      });
    }
  }, []);

  const onchangetitle = (event) => {
    settitle(event.target.value);
    clearError("title");
  };
  const onchangedescription = (event, editor) => {
    const data = editor.getData();
    setdescription(data);
    clearError('description');
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
      errors.selectedCategoryId = "category is required";
    }
    if (!picture) {
      formIsValid = false;
      errors.picture = "Picture is required";
    } else if (!/^image\/(jpeg|png|gif)$/i.test(picture.type)) {
      formIsValid = false;
      errors.picture = "Only JPEG, PNG, and GIF image types are allowed";
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
      formData.append("picture", picture, picture.name);
      formData.append("featured", featured);
      formData.append("selectedCategoryId", selectedCategoryId);

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
          setFeatured("");
          setSelectedCategoryId("");
          toast.success("Category added Successfully")
          setTimeout(() => {
            navigate("/product-list");
          }, 2000);

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
      <Toaster/>
        <Container>
          <div>
            <h1>Adamas</h1>
          </div>

          <form className="bg-green-500 hover:bg-green-600 rounded-xl">
            <div className="text">
              <h3>Add-Product</h3>
            </div>
            <div className="input-group">
              <label for="title" className="text-label">
                Enter Title <span className="require-field">*</span>{" "}
              </label>
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
              <label className="text-label">
                Enter description <span className="require-field">*</span>
              </label>
            </div>
            <div className="input-field">
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={onchangedescription}
                ref={editorRef}
                config={{
                  toolbar: {
                    items: [
                      "heading",
                      "|",
                      "bold",
                      "italic",
                      "link",
                      "bulletedList",
                      "numberedList",
                      "|",
                      "indent",
                      "outdent",
                      "|",
                      "undo",
                      "redo",
                      "|",
                      "fontColor", // Add the "fontColor" option to the toolbar
                    ],
                  },
                  language: "en",
                  // Add the "fontColor" configuration option
                }}
              />
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }} />
              
            </div>
            

            <div className="input-group">
              <div className="error">{<span>{errors.description}</span>}</div>
            </div>

            <div className="input-group">
              <label for="title" className="text-label">
                Enter Price <span className="require-field">*</span>{" "}
              </label>
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
              <label className="text-label">
                Picture <span className="require-field">*</span>
              </label>
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
              <label for="title" className="text-label">
                Featured <span className="require-field">*</span>{" "}
              </label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="Yes"
                    name="featured"
                    checked={featured === "Yes"}
                    onChange={() => setFeatured("Yes")}
                    required
                  />
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    value="No"
                    name="featured"
                    checked={featured === "No"}
                    onChange={() => setFeatured("No")}
                    required
                  />
                  No
                </label>
              </div>
            </div>

            <div className="input-group">
              <label for="title" className="text-label">
                Select Category <span className="require-field">*</span>{" "}
              </label>
              <select
                name="selectedCategoryId"
                required
                className="input-field form-control"
                onChange={onchangeselectedcategory}
              >
                <option value="">Select Category</option>
                {Array.isArray(categories)
                  ? categories.map((category) => (
                      <option
                        key={category._id}
                        value={category._id}
                        name="selectedCategoryId"
                      >
                        {category.title}
                      </option>
                    ))
                  : ""}
              </select>
              <div className="error">
                {<span>{errors.selectedCategoryId}</span>}
              </div>
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
