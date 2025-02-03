import React, { useEffect } from "react";
import "./Section2.css";
import Truck from "../../Assets/ACEHOMEREMOVE.png";
import { FaLuggageCart, FaCogs, FaTools } from "react-icons/fa";
import AOS from "aos";

const Section2 = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <section>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <div className="section2img">
          <img
            src={Truck}
            alt="Truck"
            data-aos="fade-right"
            data-aos-duration="3000"
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="section2info">
          <div className="section2title">
            <h4>WHAT WE OFFER</h4>
            <h1>
              Experience Efficiency &<span> Reliability</span> with Every Rental
            </h1>
            <p>
              Our commitment to quality ensures that every piece of equipment we
              offer is maintained to the highest standards, delivering the
              performance you need on-site. With us, you get more than just
              rentals—you gain a reliable partner dedicated to your project’s
              success.
            </p>
          </div>
          <div className="section2list">
            <ul>
              <li>
                <div className="listdata">
                  <div className="listicon">
                    <FaLuggageCart className="icon" />
                  </div>
                  <div className="listdes">
                    <h4>Delivery & Pickup</h4>
                    <p>
                      We make renting equipment as convenient as possible. When
                      you've selected your equipment, we’ll handle the logistics
                      to ensure it arrives at your site on time in excellent
                      condition.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listdata">
                  <div className="listicon">
                    <FaCogs className="icon" />
                  </div>
                  <div className="listdes">
                    <h4>Equipment Maintenance & Repair</h4>
                    <p>
                      Rental equipment is meticulously maintained and regularly
                      inspected to ensure it operates at peak performance on
                      your job site. You can trust that your equipment will
                      perform safely and efficiently, every time.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="listdata">
                  <div className="listicon">
                    <FaTools className="icon" />
                  </div>
                  <div className="listdes">
                    <h4>On-Site Support</h4>
                    <p>
                      We offer dedicated on-site support to keep your work
                      running smoothly. Our knowledgeable team is ready to
                      assist with equipment setup, troubleshooting, and any
                      technical questions you may have.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Section2;
