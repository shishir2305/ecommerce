import Topbar from "../layout/Topbar";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="border-b border-gray-200">
      {/* Topbar */}
      <Topbar />
      {/* Navbar */}
      <Navbar />
      {/* Cart drawer */}
    </header>
  );
}

export default Header;
