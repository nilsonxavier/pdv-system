import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Botão de menu (hambúrguer) para mobile */}
      <div className="md:hidden flex justify-between items-center p-4 bg-blue-500">
        <h1 className="text-white text-lg">Sistema PDV</h1>
        <button onClick={toggleSidebar} className="text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`md:block ${isOpen ? 'block' : 'hidden'} bg-gray-800 text-white w-64 h-screen fixed z-10`}>
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <h1 className="text-2xl font-bold">Sistema PDV</h1>
        </div>
        <nav className="mt-4">
          <ul>
            <li className="hover:bg-gray-700">
              <Link to="/estoque" className="block py-2.5 px-4">
                Estoque
              </Link>
            </li>
            <li className="hover:bg-gray-700">
              <Link to="/produtos" className="block py-2.5 px-4">
                Cadastrar Produto
              </Link>
            </li>
            <li className="hover:bg-gray-700">
              <Link to="/compra" className="block py-2.5 px-4">
                Compra
              </Link>
            </li>
            <li className="hover:bg-gray-700">
              <Link to="/venda" className="block py-2.5 px-4">
                Venda
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
