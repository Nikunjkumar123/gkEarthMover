import React from "react";
import "./Brandslide.css";
import Brand1 from "../../Assets/DRA Logo.jpeg";
import Brand2 from "../../Assets/GMR-logo.webp";
import Brand3 from "../../Assets/HCC Logo.png";
import Brand4 from "../../Assets/J Kumar Logo.jpeg";
import Brand5 from "../../Assets/L&T Logo.png";
import Brand6 from "../../Assets/KEC Logo.jpeg";
import Brand7 from "../../Assets/Patel Engineering.jpg";
import Brand8 from "../../Assets/RPPL logo.jpeg";
import Brand9 from "../../Assets/VNC_logo.png";
import Brand10 from "../../Assets/DC -LOGO.jpeg";
import Brand11 from "../../Assets/Patheya.png";
import Brand12 from "../../Assets/NHAI-clientlog.png";
import Brand13 from "../../Assets/Galfar-Logo.png";
import Brand14 from "../../Assets/Dilip_Buildcon_Limited_Logo.png";
import Brand15 from "../../Assets/Gammon_India_Logo.png";
import Brand16 from "../../Assets/IBR Logo.png";
import Brand17 from "../../Assets/Lodha Group Logo.png";
import Brand18 from "../../Assets/NCC -logo.png";
import Brand19 from "../../Assets/Punj Lloyd.jpg";
import Brand20 from "../../Assets/Sadbhav Engineering -logo.png";
import Brand21 from "../../Assets/Tata Projects logo.webp";

const Brandslide = () => {
  const logos = [
    Brand1,
    Brand2,
    Brand3,
    Brand4,
    Brand5,
    Brand6,
    Brand7,
    Brand8,
    Brand9,
    Brand10,
    Brand11,
    Brand12,

    Brand13,
    Brand14,
    Brand15,
    Brand16,
    Brand17,
    Brand18,
    Brand19,
    Brand20,
    Brand21,
  ];

  return (
    <>
      <div className="container-fluid mt-3 mb-3">
        <div className="row">
          <div className="logo-slider">
            <div className="slider-track">
              {[...logos, ...logos].map(
                (
                  logo,
                  index // Duplicate the logos for seamless scrolling
                ) => (
                  <div key={index} className="slide">
                    <img src={logo} alt={`Logo ${index + 1}`} />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brandslide;
