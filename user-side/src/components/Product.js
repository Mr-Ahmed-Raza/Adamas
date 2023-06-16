import React, { useEffect, useState } from "react";
import "./todoList.css";
import { Link } from "react-router-dom";

function Product() {
  const [Product, setProduct] = useState([]);
  const [categories, setcategories] = useState([]);
  const [selectedProduct, setselectedProduct] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [editformdata, seteditformdata] = useState({
    title: "",
    description: "",
    price: "",
    selectedCategoryId: "",
    picture: "",
    featured: "",
  });

  // handle edit to enter the value while form is open
  const handleEdit = (product) => {
    //  getselectedProduct(user._id)
    setselectedProduct(product);
    seteditformdata({
      title: product.title,
      description: product.description,
      price: product.price,
      selectedCategoryId: product.selectedCategoryId,
      picture: product.picture.file,
      
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
      formData.append("title", editformdata.title);
      formData.append("description", editformdata.description);
      formData.append("price", editformdata.price);
      formData.append("featured", editformdata.featured);
      formData.append("selectedCategoryId", editformdata.selectedCategoryId);
      formData.append("picture", editformdata.picture); // make api calling to update the user
      await fetch(
        `http://localhost:5000/api/admin/Product/${selectedProduct._id}`,
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
          console.log("Updated Product:", data); // Updated user data
          // Update the user in the state

          setProduct((prevProduct) =>
            prevProduct.map((Product) => {
              if (Product.id === selectedProduct.id) {
                return {
                  ...Product,
                  title: data.title,
                  description: data.description,
                  price: data.price,
                  picture: data.picture,
                  featured: data.featured,
                  selectedCategoryId: data.selectedCategoryId,
                };
              }
              return Product;
            })
          );
          getAllProduct();
        });
      // Reset the selected user and edit form data
      setselectedProduct(null);
      seteditformdata({
        title: "",
        description: "",
        picture: "",
        price: "",
        featured: "",
        selectedCategoryId: ""
      });
    } catch (error) {
      console.error("Error occured while updating user ; ", error);
    }
  };

  // Handle delete  to delete the user
  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/admin/Product/${userId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Success message
          // Remove the deleted user from the state
          setProduct((prevProduct) =>
            prevProduct.filter((user) => user.id !== userId)
          );
          // call the all user api to fetch all the user and update the state
          getAllProduct();
        });
    } catch (error) {
      console.error("Error occured while delete user ; ", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    fetch("http://localhost:5000/api/admin/Product")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data.product);
      })
      .catch((error) => console.log("Error fetching Product:", error));
  };

  const getAllcategory = () => {
    fetch("http://localhost:5000/api/admin/category/all-category")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setcategories(data.category);
      })
      .catch((error) => console.log("Error fetching category:", error));
  };

  const getselectedProduct = (productId) => {
    fetch(`http://localhost:5000/api/admin/Product/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleEdit(data.selectedProduct);
        getAllcategory();
      });
  };

// Pagination logic
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = Product.slice(indexOfFirstItem, indexOfLastItem);
const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="todo-list">
      <div className="list-head">
        <h1>Product list</h1>
      </div>
      <div className="list-data">
        {Product.length === 0 ? (
          <p>No Product found</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Picture</th>
                  <th>Featured</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentItems) ? (
                  currentItems.map((product, index) => (
                    <tr key={product._id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{product.title}</td>
                      <td>{product.description}</td>
                      <td>${product.price}</td>
                      <td>
                        {product.picture ? (
                          <img
                            className="category-image"
                            src={`http://localhost:5000/img/${product.picture}`}
                            alt={product.title}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{product.featured}</td>
                      <td>{product.categoryTitle}</td>

                      <td>
                        <button onClick={() => getselectedProduct(product._id)}>
                          Edit
                        </button>

                        <button onClick={() => handleDelete(product._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <span className="no-data-found">
                        Invalid Product data
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {selectedProduct && (
          <div>
            <h2>Edit User</h2>
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
              <label>
                Price:
                <input
                  type="number"
                  name="price"
                  value={editformdata.price}
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

              <div className="input-group">
                <label>Featured</label>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="Yes"
                      name="featured"
                      checked={editformdata.featured === "Yes"} // Update the checked condition
                      onChange={() =>
                        seteditformdata({ ...editformdata, featured: "Yes" })
                      } // Set the featured value to "Yes"
                      required
                    />
                    Yes
                  </label>

                  <label>
                    <input
                      type="radio"
                      value="No"
                      name="featured"
                      checked={editformdata.featured === "No"} // Update the checked condition
                      onChange={() =>
                        seteditformdata({ ...editformdata, featured: "No" })
                      } // Set the featured value to "No"
                      required
                    />
                    No
                  </label>
                </div>
              </div>
              {/* <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={editformdata.categoryTitle}
                  onChange={handleonChangeEdit}
                />
              </label> */}
              <div className="input-group">
                <label>Select category</label>
                <select
                  name="selectedCategoryId"
                  required
                  className="input-field"
                  onChange={handleonChangeEdit}
                >
                  <option value={editformdata.selectedCategoryId}>
                    Select Category
                  </option>
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
              </div>
              <br />
              <button type="submit">Update</button>
            </form>
          </div>
        )}
      </div>
      <br></br>
      <div>
        <Link to="/add-Product">
          <button className="button1">Add-Product</button>
        </Link>
      </div>
      <div>
          <ul className="pagination">
            {Array.from({ length: Math.ceil(Product.length / itemsPerPage) }).map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
    </div>
    
  );
}

export default Product;
