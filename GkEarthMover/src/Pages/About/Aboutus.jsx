import React, { useEffect } from "react";
import "./Aboutus.css";
import Founder1 from "../../Assets/Founder.jpeg";
import Founder2 from "../../Assets/Founder1.jpeg";
import Brandslide from "../../Components/Brand/Brandslide";

const Aboutus = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);


  const copartner = [
    {
      name: "Kailash Chand Khandelwal",
      role: "Director, Dushad Infra Project Pvt. Ltd.",
      des: "Kailash Chand Khandelwal is the visionary who laid the foundation of Dushad Infra Project Pvt. Ltd. With his extensive knowledge and experience in construction rental equipment, he has built the company from the ground up, offering reliable solutions for diverse construction needs.",
      image: Founder1,
    },
    {
      name: "Grovin Khandelwal",
      role: "Director, Dushad Infra Project Pvt. Ltd.",
      des: "Grovin Khandelwal, son of Kailash Chand Khandelwal, now leads Dushad Infra Project Pvt. Ltd. Under his guidance, the company continues to thrive and achieve new milestones in the construction rental equipment industry, delivering reliable solutions to meet diverse project requirements.",
      image: Founder2,
    },
  ];

  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="hero">
              <h1>ABOUT US</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="aboutinfo">
              <div className="abouttitle">
               
                <h1>
                  Welcome to <span>Dushad Infra Project Pvt. Ltd.</span>
                  (GK EARTH MOVERS)
                </h1>
                <p>
                  At Dushad Infra Project Pvt. Ltd., also known as GK Earth
                  MOVERS, we specialize in delivering world-class infrastructure
                  solutions tailored to meet the evolving demands of modern
                  construction. With a foundation built on trust, quality, and
                  innovation, we take pride in being a key player in shaping the
                  future of infrastructure development.
                </p>
                <p>
                  Our expertise spans a wide range of services, including
                  earthmoving, construction equipment rentals, excavation, and
                  land development, ensuring that every project we undertake is
                  executed with precision and excellence. Guided by our
                  commitment to sustainability and client satisfaction, we
                  combine cutting-edge technology with a skilled workforce to
                  deliver projects that stand the test of time.
                </p>
                <p>
                  Whether it's building robust foundations, transforming
                  landscapes, or driving large-scale projects to completion,
                  Dushad Infra Project Pvt. Ltd. is your trusted partner in
                  infrastructure development. Together, let’s create a future
                  where innovation meets reliability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="Team-heading">
              <h4>Co-Partner</h4>
              <h1>
                Pillar of <span>Our</span> success
              </h1>
            </div>

            {copartner.map((partner, index) => (
              <div className="col-md-6 mt-2" key={index}>
                <div className="card2">
                  <div className="partner-box">
                    <img src={partner.image} alt="Memberimg" />
                  </div>
                  <div className="partner">
                    <h2>{partner.name}</h2>
                    <h6>{partner.role}</h6>
                    <p>{partner.des}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <Brandslide />
      </section>
    </>
  );
};

export default Aboutus;
