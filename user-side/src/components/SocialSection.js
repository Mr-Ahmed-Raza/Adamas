import React from 'react'

function SocialSection() {
  return (
      <>
          <section className="socail-section">
            <div className="container">
              <div className="row d-flex align-items-center ">
                <div className="col-sm-10 col-md-6 social-icons-left">
                  <span>
                    {""}
                    <i className="fa fa-twitter"></i>
                  </span>
                  <p>
                    Revenant was just released on #themeforest{" "}
                    <span style={{ color: "#3bbdfb" }}>
                      http://bit.ly/qoXj6m
                    </span>
                  </p>
                </div>
                <div className="col-sm-10 col-md-6 social-icons-right">
                  <p>Check the latest news on our Social Networks:</p>
                  <ul>
                    {/* <li>
                      <a href="#">
                        <i className="fa fa-wifi"></i>
                      </a>
                    </li> */}
                    <li>
                      <a href="https://help.pinterest.com">
                        {" "}
                        <i className="fa fa-pinterest-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/">
                        {" "}
                        <i className="fa fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://twitter.com/">
                        {" "}
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}

export default SocialSection