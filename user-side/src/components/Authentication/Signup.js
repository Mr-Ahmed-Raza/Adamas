// import { FormControl, FormLabel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useState } from "react";
// import { VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../todo.css";
import {InputGroup, InputRightElement } from "@chakra-ui/input";
// import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

function Signup() {
  const [show, setShow] = useState(false);
  const [firstName, setfirstName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };
  const onchangename = (event) => {
    setfirstName(event.target.value);
    clearError("firstName");
  };
  const onchangeemail = (event) => {
    setEmail(event.target.value);
    clearError("email");
  };
  const onchangepassword = (event) => {
    setPassword(event.target.value);
    clearError("password");
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

    if (!firstName) {
      formIsValid = false;
      errors.firstName = "First name is required";
    }

    if (!email) {
      formIsValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors.email = "Invalid email address";
    }

    if (!password) {
      formIsValid = false;
      errors.password = "Password is required";
    } else if (password.length < 8) {
      formIsValid = false;
      errors.password = "Password must be at least 6 characters long";
    }

    setErrors(errors);
    return formIsValid;
  };
  const submitHandle = async (event) => {
    try {
      event.preventDefault();
      // Send data front to api backend
      const data = {
        firstName,
        email,
        password,
      };
      if (!validationChecks()) {
        return;
      }
      // calling backend api
      await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setfirstName("");
          setEmail("");
          setPassword("");
          navigate("/");
          localStorage.setItem("userData", JSON.stringify(data));
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
              <h3>Signup</h3>
            </div>
            <div className="input-group">
              <label for="title">Enter First Name</label>
              <div className="input-field">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Your First Name"
                  name="firstName"
                  value={firstName}
                  onChange={onchangename}
                />
              </div>
              <div className="error">{<span>{errors.firstName}</span>}</div>
            </div>
            <div className="input-group">
              <label>Enter Email</label>
              <div className="input-field">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={email}
                  onChange={onchangeemail}
                />
              </div>
              <div className="error">{<span>{errors.email}</span>}</div>
            </div>
            <div className="input-group">
              <label>Enter Password</label>
              <div className="input-field">
                <InputGroup size="md">
                  <input
                    className="form-control"
                    placeholder="Enter Your password"
                    name="password"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={onchangepassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>
              <div className="error">{<span>{errors.password}</span>}</div>
            </div>
            <div className="button">
              <button className="button1" onClick={submitHandle}>
                Signup
              </button>
            </div>
            <br>
            </br>
            <div className="button">
            <Link to="/login">
              <Button className="button1">Login</Button>
              </Link>
              </div>
          </form>
        </Container>
      </div>

      {/* <VStack spacing="5px">
        <div>
          <h1>Signup</h1>
        </div>
        <FormControl id="first-name" isRequired >
          <FormLabel>First Name</FormLabel>
          <Input
            className='input-group'
            placeholder="Enter Your Name"
            name="firstName"
            value={firstName}
            onChange={onchangename}
          />
         
          <div className="error">
          {<span >{errors.firstName}</span>} 
            </div>
          
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            name="email"
            value={email}
            onChange={onchangeemail}
          />
          <div className="error">
          {<span >{errors.email}</span>} 

          </div>

        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder="Enter Password"
              name="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={onchangepassword}
            />
            
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
              </Button>
              
            </InputRightElement>
            
          </InputGroup>
          <div className="error">
          {<span >{errors.password}</span>} 
          </div>
        </FormControl>
        <Button style={{ marginTop: 15 }} onClick={submitHandle}>
          Sign Up
        </Button>
        <Link to="/login">
      <Button>
          Login
        </Button>
          </Link>
      </VStack> */}
    </>
  );
}

export default Signup;
