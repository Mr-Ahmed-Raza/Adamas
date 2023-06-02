import React from "react";
import { Button } from "@chakra-ui/button";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from 'react-router-dom';
import { Container } from "react-bootstrap";

function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});
  const history = useHistory();

  // setting up show button
  const handleClick = () => {
    setShow(!show);
  };
  // set the value of email and password in state
  const onChnageEmail = (event) => {
    setEmail(event.target.value);
    clearError("email");
  };
  const onChnagePassword = (event) => {
    setPassword(event.target.value);
    clearError("password");
  };
 // to clear validation error when user enter anything to particular field
 const clearError = (fieldName) => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [fieldName]: '',
      };
    });
    };
    
    // set up validation checks 
    const validationChecks = () => {
        let formIsValid = true;
        const errors = {};
        
        if (!email) {
          formIsValid = false;
          errors.email = 'Email is required';
          
        } 
        if (!password) {
          formIsValid = false;
          errors.password = 'Password is required';
        } 
        //  else
        //  {
        //    formIsValid = false;
        //   errors = "Invalid Email or passowrd "
        //   }
    
        setErrors(errors);
        return formIsValid;
    };
    
    // set up form submit data 
    const submitHandler = async (event) => {
        try {
          event.preventDefault();
          // send data to the backend api 
          const data = {
            email,
            password
          }
    
          if (!validationChecks()) {
            return
          }
          // make api call by fetch method
    
          await fetch("http://localhost:5000/api/admin/login", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            }, body:JSON.stringify(data)
          }).then(response => response.json())
            .then((data) => {
              console.log(data.message);
              setEmail("")
              setPassword("")
              localStorage.setItem('userData', JSON.stringify(data))
              history.push("/admin/dashboard")
            })
          
        } catch (error) {
          console.error("Error." , error);
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
              <h3>Admin-Login</h3>
            </div>

            <div className="input-group">
              <label>Enter Email</label>
              <div className="input-field">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter Your Email"
                  onChange={onChnageEmail}
                />
              </div>
              <div className="error">{<span>{errors.email}</span>}</div>
            </div>
            <div className="input-group">
              <label>Enter Password</label>
              <div className="input-field">
                <InputGroup size="md">
                  <input
                    id="password"
                    className="form-control"
                    type={show ? "text" : "password"}
                    placeholder="Enter Your password"
                    name="password"
                    value={password}
                    onChange={onChnagePassword}
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
              <button className="button1" onClick={submitHandler}>
                Login
              </button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}

export default Login;
