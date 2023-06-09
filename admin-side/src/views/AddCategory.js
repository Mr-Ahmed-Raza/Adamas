import { useState } from "react";
// import { VStack } from "@chakra-ui/react";
// import "./todo.css";
// import "../../App.css";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

function AddCategory() {
  const [title, settitle] = useState();
  const [description, setdescription] = useState();
  const [picture , setPicture] = useState([])
  const [errors, setErrors] = useState({});
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
    setPicture(event.target.files[0])
    console.log(event.target.files[0]);
    clearError("picture")
  }
  
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
    if (!picture) {
      formIsValid = false;
      errors.description = "Picture is required";
    }
    // else if (picture.type !== "jpg","jpeg","png","gif" ) {
    //   formIsValid = false;
    //   errors.picture = "Only the Jpg,jpeg,png,gif type is allowed.";
    // }
    setErrors(errors);
    return formIsValid;
  };
  const submitHandle = async (event) => {
    try {
      event.preventDefault();
      // Send data front to api backend
      var formData = new FormData();
      formData.append("title", title)
      formData.append("description", description)
      formData.append("picture", picture)

      
      if (!validationChecks()) {
        return;
      }
      // calling backend api
      await fetch("http://localhost:5000/api/admin/category/add-category", {
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
          history.push("/category-list");

        });
    } catch (error) {
      console.error("Error ; ", error);
    }
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
              <h3>Add-Category</h3>
            </div>
            <div className="input-group">
              <label for="title">Enter Title</label>
              <div className="input-field">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Your First Name"
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
                  placeholder="Enter Your description"
                  name="description"
                  value={description}
                  onChange={onchangedescription}
                />
              </div>
              <div className="error">{<span>{errors.description}</span>}</div>
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
            
            <div className="button">
              <button className="button1" onClick={submitHandle}>
                Add
              </button>
            </div>
            <br></br>
           
          </form>
        </Container>
      </div>
    </>
  );
}

export default AddCategory;
