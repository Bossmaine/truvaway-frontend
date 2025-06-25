import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/flights" },
    { name: "Hotels", path: "/hotels" },
    { name: "Tours", path: "/tours" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#264180] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Truvaway Logo" className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition ${
                location.pathname === link.path
                  ? "text-[#fcc509] border-b-2 border-[#fcc509]"
                  : "text-white hover:text-[#fcc509]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Currency Selector */}
        <nav className="flex space-x-4">
          <Link
            to={"Login"}
            className={`text-sm font-medium transition mt-1 ${
              location.pathname === "/login"
                ? "text-[#fcc509] border-b-2 border-[#fcc509]"
                : "text-white hover:text-[#fcc509]"
            }`}
          >
            Login
          </Link>
          <select className="text-sm bg-white rounded px-2 py-1 outline-none">
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
          </select>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
