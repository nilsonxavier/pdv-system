import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Produtos() {
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [preco, setPreco] = useState('');
    const [tipoMedida, setTipoMedida] = useState('kg'); // 'kg' ou 'und'
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    
    const location = useLocation();
    const navigate = useNavigate();

    // Carregar o produto selecionado para edição (se houver)
    useEffect(() => {
        if (location.state && location.state.produto) {
            const produto = location.state.produto;
            setProdutoSelecionado(produto);
            setNome(produto.nome);
            setQuantidade(produto.quantidade);
            setPreco(produto.preco);
            setTipoMedida(produto.tipo_medida);
        }
    }, [location.state]);

    // Função para limpar o formulário após cadastro ou edição
    const limparFormulario = () => {
        setNome('');
        setQuantidade('');
        setPreco('');
        setTipoMedida('kg');
        setProdutoSelecionado(null);
    };

    // Função para cadastrar um novo produto
    const cadastrarProduto = async () => {
        const novoProduto = { nome, quantidade, preco, tipo_medida: tipoMedida };
        
        try {
            const response = await fetch('http://back.elitevenda.com.br:3001/api/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoProduto),
            });

            if (response.ok) {
                alert('Produto cadastrado com sucesso!');
                limparFormulario();
                navigate('/estoque'); // Volta para a página de estoque após o cadastro
            } else {
                alert('Erro ao cadastrar o produto.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
        }
    };

    // Função para editar um produto existente
    const editarProduto = async () => {
        if (!produtoSelecionado) return;
        
        const produtoAtualizado = { nome, quantidade, preco, tipo_medida: tipoMedida };

        try {
            const response = await fetch(`http://back.elitevenda.com.br:3001/api/produtos/${produtoSelecionado.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtoAtualizado),
            });

            if (response.ok) {
                alert('Produto editado com sucesso!');
                limparFormulario();
                navigate('/estoque'); // Volta para a página de estoque após a edição
            } else {
                alert('Erro ao editar o produto.');
            }
        } catch (error) {
            console.error('Erro ao editar produto:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{produtoSelecionado ? 'Editar Produto' : 'Cadastrar Novo Produto'}</h1>
            
            <div className="bg-white p-4 shadow rounded-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Nome:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Quantidade:</label>
                    <input
                        type="number"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Preço:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700">Tipo de Medida:</label>
                    <select
                        value={tipoMedida}
                        onChange={(e) => setTipoMedida(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                        <option value="kg">Quilograma (kg)</option>
                        <option value="und">Unidade (und)</option>
                    </select>
                </div>

                <button
                    onClick={produtoSelecionado ? editarProduto : cadastrarProduto}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    {produtoSelecionado ? 'Salvar Alterações' : 'Cadastrar Produto'}
                </button>
            </div>
        </div>
    );
}

export default Produtos;
