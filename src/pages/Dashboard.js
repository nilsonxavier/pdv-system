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
            src="img/logo.svg" // substitua pela imagem de sua escolha
            alt="PDV"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mt-4 text-center">PDV</h3>
        </div>

        {/* Outros cards podem ser adicionados aqui para Venda, Estoque, etc. */}

        {/* Card Estoque */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
          onClick={() => navigate('/estoque')}
        >
          <img
            src="img/estoque.ico" // substitua pela imagem de sua escolha
            alt="estoque"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mt-4 text-center">ESTOQUE</h3>
        </div>

        {/* Card Relatorio */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
          onClick={() => navigate('/compra')}
        >
          <img
            src="img/relatorio.svg" // substitua pela imagem de sua escolha
            alt="relatorio"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mt-4 text-center">RELATORIOS</h3>
        </div>

        {/* Card configuracao */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg cursor-pointer"
          onClick={() => navigate('/config-impressora')}
        >
          <img
            src="img/relatorio.svg" // substitua pela imagem de sua escolha
            alt="relatorio"
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-bold mt-4 text-center">CONFIGURAÇÃO</h3>
        </div>
      </div>
    </div>
    
    
  );
}
export default Dashboard;
