import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SocialSection from "../components/SocialSection";

function Profile() {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [userPicture, setUserPicture] = useState("");
  

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          setUserEmail(parsedUserData.email);
            setUserPicture(parsedUserData.picture)
            setUserName(parsedUserData.firstName)
        }
      }, []);
  return (
    <>
      <wrapper>
        <header className="header">
          <NavBar />
        </header>
              <main>
              <Container className="mt-5">
            <Row className="justify-content-center">
              <Col md={6} lg={4}>
                <Card>
                  <Card.Body className="text-center">
                    {/* Display user's profile picture */}
                    {userPicture && (
                      <img
                        src={`http://localhost:5000/img/${userPicture}`}
                        alt="User Profile"
                        className="rounded-circle mb-3"
                        style={{ width: "200px", height: "200px" }}
                      />
                    )}
                    <h1>{userName}</h1>
                    <h4>{userEmail}</h4>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
                  </Container>
                  <br>
                      
                  </br>
        </main>
        <SocialSection />
        <Footer />
      </wrapper>
    </>
  );
}

export default Profile;
