//import React from 'react';
import React, { useState, useEffect } from 'react';

function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Função para buscar os dados de produtos do backend
    const fetchEstoque = async () => {
        try {
            const response = await fetch('http://back.elitevenda.com.br:3001/api/produtos');
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }
            const data = await response.json();
            setProdutos(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // useEffect para carregar os dados assim que a página for carregada
    useEffect(() => {
        fetchEstoque();
    }, []);

    // Exibir um loading enquanto os dados estão sendo carregados
    if (loading) {
        return <div>Carregando estoque...</div>;
    }

    // Exibir mensagem de erro, se houver
    if (error) {
        return <div>Erro: {error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Estoque de Produtos</h1>

                {/* Tabela de estoque */}
                <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
            <tr className="bg-blue-500 text-white">
                <th className="border px-4 py-2 text-left">ID</th>
                <th className="border px-4 py-2 text-left">Produto</th>
                <th className="border px-4 py-2 text-left">Quantidade</th>
                <th className="border px-4 py-2 text-left">Preço</th>
                <th className="border px-4 py-2 text-left">Tipo de Medida</th>
            </tr>
        </thead>
        <tbody>
            {produtos.map((produto) => (
                <tr key={produto.id} className="bg-gray-100 hover:bg-gray-200 transition-all duration-200">
                    <td className="border px-4 py-2">{produto.id}</td>
                    <td className="border px-4 py-2">{produto.nome}</td>
                    <td className="border px-4 py-2">{produto.quantidade}</td>
                    <td className="border px-4 py-2">R$ {Number(produto.preco).toFixed(2)}</td>
                    <td className="border px-4 py-2">{produto.tipo_medida}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

            </div>
        </div>
    );
}

export default Estoque;
