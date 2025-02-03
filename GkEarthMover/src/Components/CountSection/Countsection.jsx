import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import "./Countsection.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { RiHotelLine } from "react-icons/ri";
import { FiTruck } from "react-icons/fi";

const Countsection = () => {
  const { ref: equipmentRef, inView: equipmentInView } = useInView({ triggerOnce: true });
  const { ref: areaRef, inView: areaInView } = useInView({ triggerOnce: true });
  const { ref: brunchRef, inView: brunchInView } = useInView({ triggerOnce: true });
  const { ref: staffRef, inView: staffInView } = useInView({ triggerOnce: true });

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="countbgimg">
          <div className="overlay1"></div>
          <div className="container">
            <div className="countdata">
              <div className="Equipmentdata">
                <div className="counticon">
                  <FiTruck className="countinnericon" />
                </div>
                <div className="icondata" ref={equipmentRef}>
                  <h1>
                    {equipmentInView && <CountUp start={0} end={100} duration={5} />}+
                  </h1>
                  <h3>Equipment</h3>
                </div>
              </div>

              <div className="Equipmentdata">
                <div className="counticondown">
                  <MdOutlineLocationOn className="countinnericon" />
                </div>
                <div className="icondata" ref={areaRef}>
                  <h1>
                    {areaInView && <CountUp start={0} end={28} duration={5} />}+
                  </h1>
                  <h3>Pan India</h3>
                </div>
              </div>

              <div className="Equipmentdata">
                <div className="counticon">
                  <RiHotelLine className="countinnericon" />
                </div>
                <div className="icondata" ref={brunchRef}>
                  <h1>
                    {brunchInView && <CountUp start={0} end={1} duration={5} />}+
                  </h1>
                  <h3>Total Branch</h3>
                </div>
              </div>

              <div className="Equipmentdata">
                <div className="counticondown">
                  <GrUserWorker className="countinnericon" />
                </div>
                <div className="icondata" ref={staffRef}>
                  <h1>
                    {staffInView && <CountUp start={0} end={25} duration={5} />}+
                  </h1>
                  <h3>Work with Company</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countsection;
