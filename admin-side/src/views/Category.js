import React, { useEffect, useState } from "react";
// import "./todoList.css";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Category() {
  const [category, setcategory] = useState([]);

    const [selectedCategory, setselectedCategory] = useState();
   const [editformdata, seteditformdata] = useState({
    title: "",
     description: "",
    picture: ""
  });

  // handle edit to enter the value while form is open
  const handleEdit = (category) => {
    //  getselectedCategory(user._id)
    setselectedCategory(category);
    seteditformdata({
      title: category.title,
      description: category.description,
      picture: category.picture.file
    });
  };
  const handlePictureChange = (event) => {
    seteditformdata({ ...editformdata, picture: event.target.files[0] });
  };
  // handle onchange to when user enter any value to the field value are being get
  const handleonChangeEdit = (event) => {
    seteditformdata({
      ...editformdata,
      [event.target.name]: event.target.value,
    });
  };

  // Handle edit submit to edit the user
  const handleEdditSubmit = async (e) => {
    
    e.preventDefault();
    try {
      // const updatedUser = {
      //   title: editformdata.title,
      //   description: editformdata.description,
      //   picture: editformdata.picture
      // };
      var formData = new FormData();
      formData.append("title" , editformdata.title)
      formData.append("description", editformdata.description)
        // Check if a new picture file is selected
    if (editformdata.picture) {
      formData.append("picture", editformdata.picture);
    }

      // make api calling to update the user
      await fetch(
        `http://localhost:5000/api/admin/Category/${selectedCategory._id}`,
        {
          method: "PUT",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          // body: JSON.stringify(formData),
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated User:", data); // Updated user data
          // Update the user in the state

          setcategory((prevcategory) =>
            prevcategory.map((category) => {
              if (category.id === selectedCategory.id) {
                return {
                  ...category,
                  title: data.title,
                  description: data.description,
                  picture: data.picture
                };
              }
              return category;
            })
          );
          getAllcategory();
        });
      // Reset the selected user and edit form data
      setselectedCategory(null);
      seteditformdata({
        title: "",
        description: "",
        picture: ""
      });
    } catch (error) {
      console.error("Error occured while updating user ; ", error);
    }
  };

  // Handle delete  to delete the user
  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/admin/Category/${userId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Success message
          // Remove the deleted user from the state
          setcategory((prevcategory) =>
            prevcategory.filter((user) => user.id !== userId)
          );
          // call the all user api to fetch all the user and update the state
          getAllcategory();
        });
    } catch (error) {
      console.error("Error occured while delete user ; ", error);
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
        setcategory(data.category);
      })
      .catch((error) => console.log("Error fetching category:", error));
  };

  const getselectedCategory = (userId) => {
    fetch(`http://localhost:5000/api/admin/category/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleEdit(data.selectedcategory);
      });
    };
    
    

  return (
    <div className="todo-list">
      <div className="list-head">
        <h1>Category list</h1>
      </div>
      <div className="list-data">
        {category.length === 0 ? (
          <p>No category found</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                    <th>Description</th>
                    <th>Picture</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(category) ? (
                  category.map((category, index) => (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{category.title}</td>
                      <td>{category.description}</td>
                      <td>
                        {category.picture ? (
                          <img
                            className="product-image"
                            src={`http://localhost:5000/public/images/${category.picture}`}
                            alt={category.title}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>

                      <td>
                        <button onClick={() => getselectedCategory(category._id)}>
                          Edit
                        </button>

                        <button onClick={() => handleDelete(category._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <span className="no-data-found">Invalid category data</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {selectedCategory && (
          <div>
            <h2>Edit Category</h2>
            <form onSubmit={(e) => handleEdditSubmit(e)}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={editformdata.title}
                  onChange={handleonChangeEdit}
                />
              </label>
              <br />
              <label>
                description:
                <input
                  type="text"
                  name="description"
                  value={editformdata.description}
                  onChange={handleonChangeEdit}
                />
              </label>
              <br />
              <label>
                picture:
                <input
                  type="file"
                  name="picture"
                  onChange={handlePictureChange}
                />
              </label>
              <br />
              <button type="submit">Update</button>
            </form>
          </div>
        )}
          </div>
          <br></br>
          <div>
          <Link to="/add-category">
              <button className="button1">Add-Category</button>
              </Link>
          </div>
          

         
    </div>
  );
}

export default Category;
