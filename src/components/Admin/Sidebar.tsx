// Sidebar.jsx
import { Link } from "react-router-dom";
import { FaBed, FaClock, FaCalendarCheck } from "react-icons/fa";

const Sidebar = () => (
  <aside className="w-20 md:w-64 bg-gray-800 text-white p-2 md:p-4">
    <h2 className="text-[10px] md:text-2xl font-semibold mb-6">Management</h2>
    <nav>
      <ul>
        {/* <li>
          <Link to="/dashboard" className="flex items-center mb-4">
            <FaHome className="mr-2" /> Dashboard
          </Link>
        </li> */}
        <li>
          <Link
            to="/dashboard/rooms"
            className="flex items-center mb-4 text-[10px] md:text-base"
          >
            <FaBed className="mr-2" /> Room Management
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/slots"
            className="flex items-center mb-4 text-[10px] md:text-base"
          >
            <FaClock className="mr-2" /> Slots Management
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/bookings"
            className="flex items-center mb-4 text-[10px] md:text-base"
          >
            <FaCalendarCheck className="mr-2" /> Booking Management
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/users"
            className="flex items-center mb-4 text-[10px] md:text-base"
          >
            <FaCalendarCheck className="mr-2" /> User Management
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
