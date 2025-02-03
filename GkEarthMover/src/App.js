import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from "./Components/Topbar/Topbar";
import Homemain from "./Components/Homemain/Homemain";
import Footer from "./Components/Footer/Footer";
import Aboutus from "./Pages/About/Aboutus";
import Equipmentpage from "./Pages/Equipmentpage/Equipmentpage";
import Contactus from "./Pages/Contactus/Contactus";
import SubEquipment from "./Pages/SubCategory/SubEquipment";
import Upcoming from "./Pages/Project/Upcoming";
import Complete from "./Pages/Project/Complete";

function App() {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path="/" element={<Homemain />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Equipmentspage" element={<Equipmentpage />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/complete" element={<Complete />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route
            path="/subEquipment/:categoryId/:subCategoryId"
            element={<SubEquipment />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
