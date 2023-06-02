import React from "react";
import { useEffect, useState } from "react";

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

function TableList() {
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
      await fetch(`http://localhost:5001/api/users/${selectedUser._id}`, {
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
      await fetch(`http://localhost:5001/api/users/${userId}`, {
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

  // fetching all user while refreshing
  useEffect(() => {
    getAllUsers();
  }, []);

  // fetching all users

  const getAllUsers = () => {
    fetch("http://localhost:5001/api/users/all-users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data.users);
      })
      .catch((error) => console.log("Error fetching users:", error));
  };

  // fetch selected user
  const getselectedUser = (userId) => {
    fetch(`http://localhost:5001/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleEdit(data.selectedUser);
      });
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="5">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Users</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {users.length === 0 ? (
                  <p>No users found</p>
                ) : (
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th className="border-0">#</th>
                        <th className="border-0">Name</th>
                          <th className="border-0">Email</th>
                          <th className="border-0">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
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

                                <button onClick={() => handleDelete(user._id)}>
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3}>
                              <span>Invalid user data</span>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </tbody>
                  </Table>
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
              </Card.Body>
            </Card>
          </Col>

          {/* <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Table on Plain Background</Card.Title>
                <p className="card-category">
                  Here is a subtitle for this table
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Salary</th>
                      <th className="border-0">Country</th>
                      <th className="border-0">City</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Dakota Rice</td>
                      <td>$36,738</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Minerva Hooper</td>
                      <td>$23,789</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Sage Rodriguez</td>
                      <td>$56,142</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Philip Chaney</td>
                      <td>$38,735</td>
                      <td>Korea, South</td>
                      <td>Overland Park</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Doris Greene</td>
                      <td>$63,542</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Mason Porter</td>
                      <td>$78,615</td>
                      <td>Chile</td>
                      <td>Gloucester</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}

export default TableList;
