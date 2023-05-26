import React from 'react'

function NavBar() {
  return (
      <>
          <section className="info-section">
            <div className="container">
              <div className="row">
                <div className="col-sm-10 col-md-8">
                  <ul className="ul-left">
                    <li className="">
                      <a href="#">
                        <i className="fa fa-mobile"></i>+92-3026589335
                      </a>
                    </li>
                    <li className="">
                      <a href="#">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        info@waseem.arhamsoft.org
                      </a>
                    </li>
                    <li className="">
                      <a href="#">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        Monday-Friday:10 to 7
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-10 col-md-4 right-div">
                  <ul className="ul-right">
                    <li>
                      <a href="#">Sign in</a>
                      <span style={{ color: "white" }}>/</span>
                      <a href="#">Register</a>
                    </li>
                    <li>
                      <a href="#">Your Cart (0)</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}

export default NavBar