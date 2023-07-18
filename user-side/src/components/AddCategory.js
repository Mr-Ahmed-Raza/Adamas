import { useEffect, useRef, useState } from "react";
// import { VStack } from "@chakra-ui/react";
import "./todo.css";
// import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import toast, { Toaster } from 'react-hot-toast';

function AddCategory() {
  const [title, settitle] = useState();
  const [description, setdescription] = useState();
  const [picture, setPicture] = useState([]);
  const [errors, setErrors] = useState({});
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
    clearError("description");
  };
  const onchangepicture = (event) => {
    setPicture(event.target.files[0]);
    console.log(event.target.files[0]);
    clearError("picture");
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
    if (!picture) {
      formIsValid = false;
      errors.picture = "Picture is required";
    } else if (!/^image\/(jpeg|png|gif)$/i.test(picture.type)) {
      formIsValid = false;
      errors.picture = "Only JPEG, PNG, and GIF image types are allowed";
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
      formData.append("title", title);
      formData.append("description", description);
      formData.append("picture", picture);

      if (!validationChecks()) {
        return;
      }
      // calling backend api
      await fetch("http://192.168.1.38:5000/api/admin/category/add-category", {
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
          toast.success("Category added Successfully")
          setTimeout(() => {
            navigate("/category-list");
          }, 2000);
          

        });
    } catch (error) {
      console.error("Error ; ", error);
    }
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
              <h3>Add-Category</h3>
            </div>
            <div className="input-group">
              <label for="title" className="text-label">
                Enter Title <span className="require-field">*</span>{" "}
              </label>
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
            <br />
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
              <label className="text-label">
                Enter description <span className="require-field">*</span>
              </label>
            </div>
            <div className="input-field">
              <CKEditor
                editor={ClassicEditor}
                data={description}
                placeholder="Enter Your First Name"
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
                    ],
                  },
                  language: "en",
                  // Add the "fontColor" configuration option
                  fontColor: {
                    colors: [
                      // Define custom color options

                      {
                        color: "rgb(255, 0, 0)", // Red
                        label: "Red",
                      },
                      // Add more color options as needed
                    ],
                  },
                }}
              />
             <br></br>
              <div className="error">{<span>{errors.description}</span>}</div>
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
