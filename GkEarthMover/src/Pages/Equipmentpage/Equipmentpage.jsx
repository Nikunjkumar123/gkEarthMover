import React, {useEffect} from 'react'
import Equipment from '../../Components/RentalEquiment/Equipment';

const Equipmentpage = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  return (
    <>
         <section>
        <div className="container-fluid">
          <div className="row">
            <div className="hero">
              <h1>EQUIPMENTS</h1>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Equipment />
      </section>

    </>
  )
}

export default Equipmentpage