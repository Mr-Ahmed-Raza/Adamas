import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

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
        [fieldName]: ""
      };
    });
  };

  const validationChecks = () => {
    let formIsValid = true;
    const errors = {};

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
      errors.password = "Password must be at least 8 characters long";
    }

    //  else
    //  {
    //    formIsValid = false;
    //   errors = "Invalid Email or passowrd "
    //   }

    setErrors(errors);
    return formIsValid;
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      // send data to the backend api
      const data = {
        email,
        password,
      };

      if (!validationChecks()) {
        
        return;
      }
      // make api call by fetch method

      await fetch("http://localhost:5001/api/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setEmail("");
          setPassword("");
          localStorage.setItem("userData", JSON.stringify(data));
          navigate("/");
        });
    } catch (error) {
      console.log("Invalid email or password", error);
      errors.err = "Invalid email or password";
      setErrors(errors);
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
              <h3>Login</h3>
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
            <div className="error" name="err">
              <span>{errors.err} </span>
            </div>
            <div className="button">
              <button className="button1" onClick={submitHandler}>
                Login
              </button>
            </div>

            <br></br>
            <Link to="/register">
              <Button className="button1">Signup</Button>
            </Link>
          </form>
        </Container>
      </div>
    </>
    // <VStack spacing="5px">
    //   <div>
    //       <h1>Login</h1>
    //     </div>
    //   <FormControl id="email" isRequired>
    //     <FormLabel>Email</FormLabel>
    //     <Input
    //       placeholder="Enter Your Email"
    //       onChange={onChnageEmail}
    //     />
    //     <div className="errors">
    //     {<span>{errors.email}</span>}
    //     </div>
    //   </FormControl>

    //   <FormControl id="password" isRequired>
    //     <FormLabel>Password</FormLabel>
    //     <InputGroup size="md">
    //       <Input
    //         type={show ? "text" : "password"}
    //         placeholder="Enter Password"
    //         onChange={onChnagePassword}
    //       />

    //       <InputRightElement width="4.5rem">
    //         <Button h="1.75rem" size="sm" onClick={handleClick}>
    //           {show ? "Hide" : "Show"}
    //         </Button>
    //       </InputRightElement>

    //     </InputGroup>
    //     <div className="errors">
    //     {<span >{errors.password}</span>}
    //     </div>
    //   </FormControl>

    //   <Button
    //     style={{ marginTop: 15 }}
    //     onClick={submitHandler}
    //   >
    //     Login
    //   </Button>
    //   <Link to="/register">
    //   <Button>
    //       Sign Up
    //     </Button>
    //     </Link>
    // </VStack>
  );
}

export default Login;
