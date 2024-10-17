import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Estoque() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook do React Router para navegação

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

    // Função para excluir um produto
    const excluirProduto = async (id) => {
        const confirmacao = window.confirm('Deseja realmente excluir este produto?');
        if (!confirmacao) return;

        try {
            const response = await fetch(`http://back.elitevenda.com.br:3001/api/produtos/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setProdutos(produtos.filter(p => p.id !== id)); // Atualiza a lista de produtos
                alert('Produto excluído com sucesso!');
            } else {
                alert('Erro ao excluir o produto.');
            }
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    };

    // useEffect para carregar os dados assim que a página for carregada
    useEffect(() => {
        fetchEstoque();
    }, []);

    // Função para redirecionar para a página de cadastro
    const cadastrarNovoProduto = () => {
        navigate('/produtos'); // Redireciona para a página de cadastro
    };

    // Função para redirecionar para a página de edição de um produto
    const editarProduto = (produto) => {
        navigate(`/produtos`, { state: { produto } }); // Redireciona com o produto selecionado
    };

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

                {/* Botão para cadastrar novo produto */}
                <div className="mb-4">
                    <button
                        onClick={cadastrarNovoProduto}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Cadastrar Novo Produto
                    </button>
                </div>

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
                                <th className="border px-4 py-2 text-left">Ações</th>
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
                                    <td className="border px-4 py-2 flex space-x-2">
                                        {/* Botão de Editar */}
                                        <button
                                            onClick={() => editarProduto(produto)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                                        >
                                            Editar
                                        </button>
                                        {/* Botão de Excluir */}
                                        <button
                                            onClick={() => excluirProduto(produto.id)}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        >
                                            Excluir
                                        </button>
                                    </td>
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
