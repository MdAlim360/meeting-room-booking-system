import React from "react";
interface HeaderProps {
  title: string;
  onAddClick?: () => void; // Optional function prop
  add?: string; // Optional string prop
}

const Header: React.FC<HeaderProps> = ({ title, onAddClick, add }) => (
  <header className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-200">
    <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
    {onAddClick && (
      <button
        onClick={onAddClick}
        className="bg-yellow-500 text-white px-2 md:px-4 py-2 rounded-md hover:bg-green-500"
      >
        {add}
      </button>
    )}
  </header>
);

export default Header;
