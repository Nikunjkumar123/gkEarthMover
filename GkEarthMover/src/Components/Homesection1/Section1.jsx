import React from "react";
import "./Section1.css";
import truckgroup from "../../Assets/SY140C-.png";
const Section1 = () => {
  return (
    <>
     <section>
  <div className="container seprate">
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <div className="section1img">
          <img src={truckgroup} alt="Truck Group" className="img-fluid" />
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="sectiondata">
          <div className="sectiontag">
            <h2>Who Are We ?</h2>
          </div>
          <div className="sectiontitle">
            <h1>We Have 30+ Years of Industrial Experience</h1>
          </div>
          <div className="sectiondes">
            <p>
              With over 30 years of experience in the construction industry, we specialize in providing reliable, high-quality rental equipment to help you complete projects of any size. Our extensive inventory includes everything from heavy-duty machinery to precision tools, ensuring you have the right equipment to get the job done efficiently and safely. We are committed to supporting your projects with equipment that meets industry standards, along with exceptional service and expertise you can trust. Whether you’re building, remodeling, or repairing, we’re here to help make your vision a reality.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Section1;
