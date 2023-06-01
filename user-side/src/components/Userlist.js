import React, { useEffect, useState } from "react";
import "./todoList.css";

function Userlist() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setselectedUser] = useState();
  const [editformdata, seteditformdata] = useState({
    firstName: "",
    email: "",
  });

  // handle edit to enter the value while form is open
  const handleEdit = (user) => {
    //  getselectedUser(user._id)
    setselectedUser(user);
    seteditformdata({
      firstName: user.firstName,
      email: user.email,
    });
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
      const updatedUser = {
        firstName: editformdata.firstName,
        email: editformdata.email,
      };
      console.log("Updated User:", updatedUser);
      // make api calling to update the user
      await fetch(`http://localhost:5000/api/users/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Updated User:", data); // Updated user data
          // Update the user in the state

          setUsers((prevUsers) =>
            prevUsers.map((user) => {
              if (user.id === selectedUser.id) {
                return {
                  ...user,
                  firstName: data.firstName,
                  email: data.email,
                };
              }
              return user;
            })
          );
          getAllUsers();
        });
      // Reset the selected user and edit form data
      setselectedUser(null);
      seteditformdata({
        firstName: "",
        email: "",
      });
    } catch (error) {
      console.error("Error occured while updating user ; ", error);
    }
  };

  // Handle delete  to delete the user
  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Success message
          // Remove the deleted user from the state
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
          // call the all user api to fetch all the user and update the state
          getAllUsers();
        });
    } catch (error) {
      console.error("Error occured while delete user ; ", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    fetch("http://localhost:5000/api/Users/all-users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data.users);
      })
      .catch((error) => console.log("Error fetching users:", error));
  };

  const getselectedUser = (userId) => {
    fetch(`http://localhost:5000/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleEdit(data.selectedUser);
      });
  };

  return (
    <div className="todo-list">
      <div className="list-head">
        <h1>Users list</h1>
      </div>
      <div className="list-data">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          <div className="table-responsive">
          <table>
           
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(users) ? (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.firstName}</td>
                      <td>{user.email}</td>
                      <td>
                        
                          <button
                            
                            onClick={() => getselectedUser(user._id)}
                          >
                            Edit
                          </button>
                       
                       
                          <button
                            
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                       
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <span className="no-data-found">Invalid user data</span>
                    </td>
                  </tr>
                )}
              </tbody>
            
              </table>
              </div>
        )}

        {selectedUser && (
          <div>
            <h2>Edit User</h2>
            <form onSubmit={(e) => handleEdditSubmit(e)}>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={editformdata.firstName}
                  onChange={handleonChangeEdit}
                />
              </label>
              <br />
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editformdata.email}
                  onChange={handleonChangeEdit}
                />
              </label>
              <br />
              <button type="submit">Update</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Userlist;
