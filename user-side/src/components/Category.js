import React, { useEffect, useState } from "react";
import "./todoList.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Swal from "sweetalert2";

function Category() {
  const [category, setcategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedCategory, setselectedCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [editformdata, seteditformdata] = useState({
    title: "",
    description: "",
    picture: "",
  });
  const removeRequest = (id)=> {
    Swal.fire({
        title: "Are you sure you want to delete?",
        html: "If you delete an item, it would be permanently lost.",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
    }).then(async (result) => {
        if (result.value) {
          setLoading(true);
          handleDelete(id)
        }
    });

}
  const showToast = (action) => {
    if (action === "getAllcategory") {
      toast.success("Category reterived Successfully")
    }
    if (action === "handleDelete") {
      toast.success("Category Delete Successfully")
    }
    if (action === "handleEdditSubmit") {
      toast.success("Category edit Successfully")
    }


  };
  // handle edit to enter the value while form is open
  const handleEdit = (category) => {
    //  getselectedCategory(user._id)
    setselectedCategory(category);
    seteditformdata({
      title: category.title,
      description: category.description,
      picture: category.picture.file,
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
      
      var formData = new FormData();
      formData.append("title", editformdata.title);
      formData.append("description", editformdata.description);
      // Check if a new picture file is selected
      if (editformdata.picture) {
        formData.append("picture", editformdata.picture);
      }

      // make api calling to update the user
      await fetch(
        `http://192.168.1.38:5000/api/admin/Category/${selectedCategory._id}`,
        {
          method: "PUT",
         
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
                  picture: data.picture,
                };
              }
              return category;
            })
          );
          // getAllcategory();
          
          window.location.reload();
          showToast(`handleEdditSubmit`)
        });
      // Reset the selected user and edit form data
      setselectedCategory(null);
      seteditformdata({
        title: "",
        description: "",
        picture: "",
      });
    } catch (error) {
      console.error("Error occured while updating user ; ", error);
    }
  };

  // Handle delete  to delete the user
  const handleDelete = async (userId) => {
    try {
      await fetch(`http://192.168.1.38:5000/api/admin/Category/${userId}`, {
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
          showToast(`handleDelete`)
        });
    } catch (error) {
      console.error("Error occured while delete user ; ", error);
    }
  };

  useEffect(() => {
    getAllcategory();

  }, []);

  const getAllcategory = () => {
    fetch("http://192.168.1.38:5000/api/admin/category/all-category")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setcategory(data.category);
        showToast(`getAllcategory`);
      })
      .catch((error) => console.log("Error fetching category:", error));
  };

  const getselectedCategory = (userId) => {
    fetch(`http://192.168.1.38:5000/api/admin/category/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleEdit(data.selectedcategory);
      });
  };
  
  // Pagination logic
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);
const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      {loading}
    <Toaster/>
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
                {Array.isArray(currentItems) ? (
                  currentItems.map((category, index) => (
                    <tr key={category._id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{category.title}</td>
                      <td>{category.description}</td>
                      <td>
                        {console.log(category.picture)}
                        {category.picture ? (
                          <img
                            className="category-image"
                            // src={`assets/images/slider-content-img.jpg`}
                            // src={`/public/images/${category.picture}`}
                            src={`http://192.168.1.38:5000/img/${category.picture}`}
                            alt={category.title}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>

                      <td>
                        <button
                          onClick={() => getselectedCategory(category._id)}
                        >
                          Edit
                        </button>

                        <button onClick={() => removeRequest(category._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                 ) : (
                  <tr>
                    <td colSpan={3}>
                      <span className="no-data-found">
                        Invalid category data
                      </span>
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
      <div>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(category.length / itemsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      <br />
    </>
  );
}

export default Category;
