/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { baseApi } from "@/redux/api/baseApi";

interface Link {
  to: string;
  label: string;
}

const links: Link[] = [
  { to: "/", label: "Home" },
  { to: "/meeting-rooms", label: "Meeting Rooms" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const user: any = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleLogout = useCallback(() => {
    dispatch(logout());

    dispatch(baseApi.util.resetApiState());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={cn(
        "fixed w-full z-50 top-0 left-0 transition-colors duration-300 ease-in-out",
        isHomePage
          ? isScrolled
            ? "bg-black text-white shadow-lg "
            : "bg-transparent text-white"
          : "bg-black text-white ",
        !isHomePage ? "relative" : "fixed"
      )}
    >
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
        <Link to={"https://meeting-room-booking-system-three.vercel.app/"}>
          <div className="flex gap-2 items-center">
            <img
              className="w-7 h-7"
              src="https://i.ibb.co.com/bPzThcH/squares.png"
              alt=""
            />
            <div className="text-3xl font-medium">ROYELLA</div>
          </div>
        </Link>
        <div className="hidden md:flex space-x-6">
          <LinkList links={links} setIsOpen={setIsOpen} />
          {!user && <AuthLinks setIsOpen={setIsOpen} />}
          {user && <UserMenu userRole={user.role} onLogout={handleLogout} />}
        </div>
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 p-4 bg-white text-black">
          <LinkList links={links} setIsOpen={setIsOpen} />
          {!user && <AuthLinks setIsOpen={setIsOpen} />}
          {user && (
            <UserMenu
              userRole={user.role}
              isMobile={true}
              onLogout={handleLogout}
            />
          )}
        </div>
      )}
    </nav>
  );
};

interface LinkListProps {
  links: Link[];
  setIsOpen: (isOpen: boolean) => void;
}

const LinkList: React.FC<LinkListProps> = ({ links, setIsOpen }) => (
  <>
    {links.map(({ to, label }) => (
      <NavLink
        key={to}
        to={to}
        className={({ isActive }) =>
          cn(
            "relative hover:text-yellow-500 transition duration-300 mb-0 md:mb-5 mt-1 md:mt-6",
            {
              "border-b-2 border-yellow-500": isActive,
            }
          )
        }
        onClick={() => setIsOpen(false)} // Close the menu after clicking a link
      >
        {label}
      </NavLink>
    ))}
  </>
);

const AuthLinks: React.FC<{ setIsOpen: (isOpen: boolean) => void }> = ({
  setIsOpen,
}) => (
  <>
    <NavLink
      to="/login"
      className={({ isActive }) =>
        cn(
          "relative hover:text-yellow-500 transition duration-300 mb-0 md:mb-5 mt-1 md:mt-6",
          {
            "border-b-2 border-yellow-500": isActive,
          }
        )
      }
      onClick={() => setIsOpen(false)} // Close the menu after clicking a link
    >
      Login
    </NavLink>
    <NavLink
      to="/register"
      className={({ isActive }) =>
        cn(
          "relative hover:text-yellow-500 transition duration-300 mb-0 md:mb-5 mt-1 md:mt-6",
          {
            "border-b-2 border-yellow-500": isActive,
          }
        )
      }
      onClick={() => setIsOpen(false)} // Close the menu after clicking a link
    >
      Register
    </NavLink>
  </>
);

interface UserMenuProps {
  userRole: string;
  isMobile?: boolean;
  onLogout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({
  userRole,
  isMobile = false,
  onLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    []
  );

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);

  const menuItems =
    userRole === "user"
      ? [
          { to: "/my-bookings", label: "My Booking" },
          {
            to: "#",
            label: "Logout",
            onClick: () => {
              onLogout();
              closeDropdown();
            },
          },
        ]
      : [
          { to: "/dashboard", label: "Dashboard" },
          {
            to: "#",
            label: "Logout",
            onClick: () => {
              onLogout();
              closeDropdown();
            },
          },
        ];

  return (
    <div className={isMobile ? "" : "relative"}>
      <button
        className="flex items-center space-x-2 mb-0 md:mb-5 mt-1 md:mt-4"
        onClick={toggleDropdown}
        aria-expanded={dropdownOpen}
        aria-label="User menu"
      >
        <div className="bg-yellow-500 p-2 rounded-full md:block">
          <User className="w-6 h-6" />
        </div>
      </button>
      {dropdownOpen && (
        <div
          className={cn(
            "bg-white text-gray-800 rounded-lg shadow-lg z-20",
            isMobile ? "space-y-2" : "absolute right-0 mt-2 w-48"
          )}
        >
          {menuItems.map(({ to, label, onClick }) => (
            <NavLink
              key={to}
              to={to}
              className="block px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                if (onClick) onClick();
                closeDropdown();
              }}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
