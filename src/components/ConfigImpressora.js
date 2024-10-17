import React, { useState } from 'react';

function ConfigImpressora() {
  // Estados para armazenar as configurações
  const [tamanhoFonte, setTamanhoFonte] = useState(12);  // Tamanho inicial como 12px
  const [estiloFonte, setEstiloFonte] = useState('Normal');
  const [cabecalho, setCabecalho] = useState('');
  const [rodape, setRodape] = useState('');
  const [tamanhoFolha, setTamanhoFolha] = useState('58mm');

  // Função para salvar as configurações (pode ser para localStorage, backend, etc.)
  const salvarConfiguracoes = () => {
    const configuracoes = {
      tamanhoFonte,
      estiloFonte,
      cabecalho,
      rodape,
      tamanhoFolha,
    };

    // Para salvar no localStorage
    localStorage.setItem('configImpressora', JSON.stringify(configuracoes));

    // Aqui você poderia enviar essas configurações para o backend, se necessário
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">Configurações de Impressora</h1>

        <div className="space-y-4">
          {/* Tamanho da Fonte (numérico) */}
          <div>
            <label className="block text-gray-700">Tamanho da Fonte (px):</label>
            <input
              type="number"
              value={tamanhoFonte}
              onChange={(e) => setTamanhoFonte(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              min={8}  // Valor mínimo de 8px
              max={50} // Valor máximo de 50px
              step={1} // Incremento de 1px
            />
          </div>

          {/* Estilo da Fonte */}
          <div>
            <label className="block text-gray-700">Estilo da Fonte:</label>
            <select
              value={estiloFonte}
              onChange={(e) => setEstiloFonte(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option>Normal</option>
              <option>Negrito</option>
              <option>Itálico</option>
            </select>
          </div>

          {/* Cabeçalho */}
          <div>
            <label className="block text-gray-700">Cabeçalho do Recibo:</label>
            <input
              type="text"
              value={cabecalho}
              onChange={(e) => setCabecalho(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ex: Nome da Empresa"
            />
          </div>

          {/* Rodapé */}
          <div>
            <label className="block text-gray-700">Rodapé do Recibo:</label>
            <textarea
              type="text"
              rows="3"
              value={rodape}
              onChange={(e) => setRodape(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Ex: Obrigado pela preferência!"
            />
          </div>

          {/* Tamanho da Folha */}
          <div>
            <label className="block text-gray-700">Tamanho da Folha:</label>
            <select
              value={tamanhoFolha}
              onChange={(e) => setTamanhoFolha(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option>58mm</option>
              <option>A4</option>
              <option>A5</option>
            </select>
          </div>

          {/* Botão de Salvar Configurações */}
          <button
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition mt-6"
            onClick={salvarConfiguracoes}
          >
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfigImpressora;
