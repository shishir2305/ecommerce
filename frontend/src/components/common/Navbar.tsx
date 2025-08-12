import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  // Function to toggle the cart drawer
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Function to toggle the navigation drawer
  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left logo */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            Ecommerce
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/admin"
            className="block bg-black py-1 px-2 rounded text-sm text-white"
          >
            Admin
          </Link>

          <Link to="/profile">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button
            className="relative hover:text-black"
            onClick={toggleCartDrawer}
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 rabbit-red text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>

          {/* Search icon */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button className="md:hidden" onClick={toggleNavDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="#"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Men
            </Link>
            <Link
              to="#"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Women
            </Link>
            <Link
              to="#"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Top Wear
            </Link>
            <Link
              to="#"
              className="block text-gray-700 hover:text-black text-sm font-medium uppercase"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
