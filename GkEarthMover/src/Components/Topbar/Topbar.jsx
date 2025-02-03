import React, { useState, useEffect } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import {
  FaAngleDoubleUp,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMail, IoIosMenu } from "react-icons/io";

const Topbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isVisible, setIsVisible] = useState(false);

  // Toggle navbar visibility on small screens
  const handleShowNavbar = () => setShowNavbar(!showNavbar);

  //  Drop Down Function -----

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Set active link and close navbar on link click
  const handleChange = (link) => {
    setActiveLink(link);
    setShowNavbar(false); // Close navbar on link click
  };

  // Close navbar if clicked outside of it
  const handleClickOutside = (e) => {
    if (!e.target.closest(".navsection") && showNavbar) {
      setShowNavbar(false);
    }
  };

  // Close navbar on scroll
  const handleScroll = () => {
    if (showNavbar) {
      setShowNavbar(false); // Close navbar on scroll
    }
  };

  // Toggle navbar fixed position when scrolling past a specific point
  const toggleNavBg = () => {
    setScrolled(window.scrollY > 100); // Adjust offset as needed
  };

  // Show "scroll to top" button after a certain scroll distance
  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 500);
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll); // Add scroll listener for closing navbar on scroll
    window.addEventListener("scroll", toggleNavBg); // Add scroll listener for changing navbar background
    window.addEventListener("scroll", toggleVisibility); // Add scroll listener for scroll to top button

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", toggleNavBg);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [showNavbar]);

  return (
    <>
      <a
        href="https://api.whatsapp.com/send?phone=919350619539"
        target="_blank"
        className="whatsapp_float"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>

      <a href="tel:+919350619539" target="_blank" className="call_float">
        <FaPhone />
      </a>

      <div className="scroll-to-top">
        {isVisible && (
          <button onClick={scrollToTop} className="go-to-top-btn">
            <FaAngleDoubleUp />
          </button>
        )}
      </div>

      <div>
        <section>
          <div className="container-fluid headerbg">
            <div className="container">
              <div className="row">
                <div className="barinfo">
                  <div className="barlocation">
                    <FaLocationDot className="location" />
                    <h3>Palam Colony, New Delhi-77</h3>
                  </div>
                  <div className="barnumber">
                    <FaPhone className="call" />
                    <h3>
                      <a href="tel:+919350619539" target="_blank">
                        9350619539 /{" "}
                      </a>
                      <a href="tel:+919810174170" target="_blank">
                        9810174170
                      </a>
                    </h3>
                  </div>
                  <div className="barmail">
                    <IoIosMail className="mail" />
                    <div className="mail-set">
                      <div>
                        <h3>
                          <a
                            href="mailto:Dushadinfraproject@gmail.com"
                            target="_blank"
                          >
                            Dushadinfraproject@gmail.com
                          </a>
                        </h3>
                      </div>

                      <div>
                        <h3>
                          <a
                            href="mailto:Gkearthmover88@gmail.com"
                            target="_blank"
                          >
                            Gkearthmover88@gmail.com
                          </a>
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <nav>
            <div className={`container-fluid ${scrolled ? "navbg" : "barbg"}`}>
              <div className="navsection">
                <div className="webname">
                  <Link to="/">
                    <h1>Dushad Infra Project Pvt. Ltd.</h1>
                    <h4>(GK EARTH MOVERS)</h4>
                  </Link>
                </div>

                <div className="menu-icon" onClick={handleShowNavbar}>
                  <IoIosMenu className="hamburger-icon" />
                </div>

                <div className={`navlinks ${showNavbar ? "active" : ""}`}>
                  <ul className="link">
                    <li className={activeLink === "Home" ? "active" : ""}>
                      <Link to="/" onClick={() => handleChange("Home")}>
                        Home
                      </Link>
                    </li>
                    <li className={activeLink === "Aboutus" ? "active" : ""}>
                      <Link
                        to="/Aboutus"
                        onClick={() => handleChange("Aboutus")}
                      >
                        About
                      </Link>
                    </li>
                    <li
                      className={
                        activeLink === "Equipmentspage" ? "active" : ""
                      }
                    >
                      <Link
                        to="/Equipmentspage"
                        onClick={() => handleChange("Equipmentspage")}
                      >
                        Equipment
                      </Link>
                    </li>

              

                    <li className={activeLink === "Contactus" ? "active" : ""}>
                      <Link
                        to="/Contactus"
                        onClick={() => handleChange("Contactus")}
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="navicon">
                  <ul className="socialLink">
                    <li>
                      <a href="#" target="_blank">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <FaTwitter />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {isVisible && (
            <button onClick={scrollToTop} className="scrollToTop">
              Scroll to Top
            </button>
          )}
        </section>
      </div>
    </>
  );
};

export default Topbar;
