import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        {/* Card de Compra */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
          onClick={() => navigate('/compra')}
        >
          <img
            src="https://via.placeholder.com/150" // substitua pela imagem de sua escolha
            alt="Compra"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mt-4 text-center">PDV-Sucata</h3>
        </div>

        {/* Outros cards podem ser adicionados aqui para Venda, Estoque, etc. */}
      </div>
    </div>
  );
}

export default Dashboard;
