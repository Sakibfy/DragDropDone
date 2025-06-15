import { Outlet } from "react-router-dom";
import Footer from "../Component/Footer";
import { NavbarComponent } from "../Component/NavbarComponent";


const Main = () => {
  return (
    <div>
      <div className="border-b shadow-lg border-slate-200 bg-[#2c918b]  shadow-slate-700/5"><NavbarComponent></NavbarComponent></div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;