import { InputGroup } from "@chakra-ui/input";
import { useState } from "react";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

function ForgetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      // Check if passwords match
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
  
      // Get the reset token from the URL query parameters
      const params = new URLSearchParams(window.location.search);
        const resetToken = params.get("token");
        console.log("reset", resetToken);
  
      // Send the reset password request to the backend API
      const data = {
        newPassword,
        resetToken,
      };
  
      // Make the API call to the backend
      await fetch("http://localhost:5001/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          // Display success message or toast notification
          toast.success("Password reset successful");
          // Redirect the user to the login page
          navigate("/login");
        });
    } catch (error) {
      console.error("Error: ", error);
      // Handle error cases and display error message or toast notification
      toast.error("Failed to reset password");
    }
  };
  

  return (
    <>
      <div className="main-page">
        <Toaster />
        <Container>
          <div>
            <h1>Adamas</h1>
          </div>

          <form className="bg-green-500 hover:bg-green-600 rounded-xl">
            <div className="text">
              <h3>ForgetPassword</h3>
            </div>

            <div className="input-group">
              <label for="password" className="text-label">
                Enter New Password <span className="require-field">*</span>{" "}
              </label>
              <div className="input-field">
                <InputGroup size="md">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Enter Your New Password"
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </InputGroup>
              </div>
              {/* <div className="error">{<span>{errors.password}</span>}</div> */}
            </div>

            <div className="input-group">
              <label for="password" className="text-label">
                Confirm New Password <span className="require-field">*</span>{" "}
              </label>
              <div className="input-field">
                <InputGroup size="md">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Confirm Your New Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
              </div>
              {/* <div className="error">{<span>{errors.password}</span>}</div> */}
            </div>

            {/* <div className="error" name="err">
              <span>{errors.err} </span>
            </div> */}
            <div className="button">
              <button className="button1" onClick={handleResetPassword}>
                Reset Password
              </button>
            </div>
          </form>
        </Container>
      </div>
    </>
  );
}

export default ForgetPassword;
