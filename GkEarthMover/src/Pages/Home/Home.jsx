import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  FaSearch,
  FaBalanceScale,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
import Section1 from "../../Components/Homesection1/Section1";
import Section2 from "../../Components/Homesection1/Section2";
import Countsection from "../../Components/CountSection/Countsection";
import Equipment from "../../Components/RentalEquiment/Equipment";
import Brandslide from "../../Components/Brand/Brandslide";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [active, setActive] = useState(false);

  const handleActiveChange = () => {
    setActive(!active);
  };

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="homebanner">
              <div className="overlay"></div>
              <div className="bannertext">
                <h1>Build Your Dream With Our Construction Equipment</h1>
                <p>
                  GK Earth MOVERS Provide High-Quality Tools and Machinery to
                  Bring Your Vision to Life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Section1 />
      </section>

      <section className="bgcolor">
        <div className="container">
          <div className="row">
            <div className="rentalinfo">
              <div className="steps-heading">
                <h2>Working Process</h2>
                <h1>Get Your Rentals in Easy 4 Steps</h1>
                <p>
                  Renting construction equipment has never been easier! With our
                  streamlined process, you can get the machinery and tools you
                  need in just four simple steps.
                </p>
              </div>

              <div className="row  rentalcard">
                {/* Step 1 */}
                <div className="col-6 col-md-3 mb-4">
                  <div className="step-card">
                    <div className="icon-container">
                      <FaSearch size={24} className="icon" />
                    </div>
                    <h3 className="step-number">01</h3>
                    <h5 className="step-title">Search Your Equipment</h5>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="col-6 col-md-3 mb-4">
                  <div className="step-card">
                    <div className="icon-container">
                      <FaBalanceScale size={24} className="icon" />
                    </div>
                    <h3 className="step-number">02</h3>
                    <h5 className="step-title">Compare Your Selection</h5>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="col-6 col-md-3 mb-4">
                  <div className="step-card">
                    <div className="icon-container">
                      <FaClipboardList size={24} className="icon" />
                    </div>
                    <h3 className="step-number">03</h3>
                    <h5 className="step-title">Reserve the Equipment</h5>
                  </div>
                </div>
                {/* Step 4 */}
                <div className="col-6 col-md-3 mb-4">
                  <div className="step-card">
                    <div className="icon-container">
                      <FaCheckCircle size={24} className="icon" />
                    </div>
                    <h3 className="step-number">04</h3>
                    <h5 className="step-title">Get Start Your Project</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Section2 />
      </section>

      <section>
        <Countsection />
      </section>

      <section>
        <Equipment />
      </section>

      

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="Quotebg">
              <div className="overlay2"></div>
              <div className="container">
                <div className="Quote-data">
                  <h1>We Are Served Since 37 Years To Clients With Trust</h1>
                  <p>
                    "Trusted by clients for over 37 years, delivering excellence
                    and reliability in every project."
                  </p>
                  <button>
                    <Link to="/complete" onClick={handleActiveChange}>
                      Completed Project
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Brandslide />
      </section>
    </>
  );
};

export default Home;
