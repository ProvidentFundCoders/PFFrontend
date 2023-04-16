import logo from "../../images/ro.jpg";
import "./Navbar.css";

function Navbar() {
  return (
    <nav>
      <div id="navhead" className="d-flex justify-content-between align-items-center pt-2 px-5 py-2 text-white">
        <div className="pl-5">RO WEBSITE</div>
        <div className="pr-5">Technical help - 0132-4056-672 ver 1.0</div>
      </div>
      <div className="d-flex h-20 ml-10 px-5">
        <img className="logo" src={logo} alt="RO Logo" />
        <div className="m-1 border border-right-4 border-black"></div>
        <h1 className="text-xl m-auto">RO DEPARTMENT MUMBAI</h1>
        <div className="m-1"></div>
      </div>
      <hr className="w-10 m-0" />
    </nav>
  );
}

export default Navbar;
