import React, { useState, useEffect, useRef } from 'react';

function Compra() {
    const [quantidade, setQuantidade] = useState('');
    const [produto, setProduto] = useState('');
    const [preco, setPreco] = useState('');
    const [listaProdutos, setListaProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);
    const [produtoSelecionadoIndex, setProdutoSelecionadoIndex] = useState(-1);
    const quantidadeRef = useRef(null);
    const produtoRef = useRef(null);
    const precoRef = useRef(null);
    const [produtoId, setProdutoId] = useState(null); // Armazenar o ID do produto


    useEffect(() => {
        quantidadeRef.current.focus();
    }, []);

    const buscarProduto = async (query) => {
        try {
          const response = await fetch(`http://back.elitevenda.com.br:3001/api/produtos?q=${query}`);
          const data = await response.json();
      
          // Normaliza a query (remove acentos e converte para minúsculas)
          const queryNormalizada = removerAcentos(query);
      
          // Filtrar produtos comparando sem acentos e com letras minúsculas
          const resultados = data.filter(p => 
            removerAcentos(p.nome).includes(queryNormalizada) || p.id.toString().includes(query)
          );
      
          setProdutosFiltrados(resultados);
          setProdutoSelecionadoIndex(-1);
        } catch (error) {
          console.error('Erro ao buscar produtos:', error);
        }
      };


    const handleQuantidadeEnter = (e) => {
        if (e.key === 'Enter') {
            produtoRef.current.focus();
        }
    };

    const handleProdutoChange = (e) => {
        setProduto(e.target.value);
        buscarProduto(e.target.value);
    };

    const handleProdutoKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setProdutoSelecionadoIndex((prevIndex) =>
                prevIndex < produtosFiltrados.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setProdutoSelecionadoIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (e.key === 'Enter') {
            if (produtoSelecionadoIndex >= 0 && produtosFiltrados[produtoSelecionadoIndex]) {
                const produtoSelecionado = produtosFiltrados[produtoSelecionadoIndex];
                selecionarProduto(produtoSelecionado);
            } else {
                // Se não houver um produto selecionado, exibe um aviso ou faz outra ação
                alert('Nenhum produto selecionado.');
            }
        }

    };


    //remover acentos e caixa alta do campo pesquisa
    const removerAcentos = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const selecionarProduto = (produto) => {
        setProdutoId(produto.id);      // Armazena o ID do produto
        setProduto(produto.nome);
        setPreco(produto.preco);
        setProdutosFiltrados([]);
        precoRef.current.focus();
    };

    const handlePrecoEnter = (e) => {
        if (e.key === 'Enter') {
            adicionarProduto();
        }
    };

    // const adicionarProduto = () => {
    //     if (quantidade && produto && preco) {
    //         const produtoExistente = listaProdutos.find(item => item.produto === produto);

    //         if (produtoExistente) {
    //             const listaAtualizada = listaProdutos.map(item =>
    //                 item.produto === produto
    //                     ? { ...item, quantidade: parseFloat(item.quantidade) + parseFloat(quantidade) }
    //                     : item
    //             );
    //             setListaProdutos(listaAtualizada);
    //         } else {
    //             const novoProduto = { quantidade, produto, preco };
    //             setListaProdutos([...listaProdutos, novoProduto]);
    //         }

    //         setQuantidade('');
    //         setProduto('');
    //         setPreco('');
    //         quantidadeRef.current.focus();
    //     }
    // };

    const adicionarProduto = () => {
        if (quantidade && produto && preco && produtoId) {
            const produtoExistente = listaProdutos.find(item => item.id === produtoId);
    
            if (produtoExistente) {
                const listaAtualizada = listaProdutos.map(item =>
                    item.id === produtoId
                        ? { ...item, quantidade: parseFloat(item.quantidade) + parseFloat(quantidade) }
                        : item
                );
                setListaProdutos(listaAtualizada);
            } else {
                const novoProduto = { id: produtoId, quantidade, produto, preco }; // Inclui o ID do produto
                setListaProdutos([...listaProdutos, novoProduto]);
            }
    
            setQuantidade('');
            setProduto('');
            setPreco('');
            setProdutoId(null);  // Limpa o ID do produto após adicionar ao carrinho
            quantidadeRef.current.focus();
        } else {
            alert('Preencha todos os campos antes de adicionar ao carrinho.');
        }
    };
    

    const editarProduto = (index, campo, valor) => {
        const listaAtualizada = listaProdutos.map((item, i) =>
            i === index ? { ...item, [campo]: valor } : item
        );
        setListaProdutos(listaAtualizada);
    };

    const excluirProduto = (index) => {
        const listaAtualizada = listaProdutos.filter((_, i) => i !== index);
        setListaProdutos(listaAtualizada);
    };

    const calcularTotal = () => {
        let totalKg = 0;
        let totalValor = 0;
        listaProdutos.forEach(item => {
            totalKg += parseFloat(item.quantidade);
            totalValor += parseFloat(item.quantidade) * parseFloat(item.preco);
        });
        return { totalKg, totalValor };
    };

    const { totalKg, totalValor } = calcularTotal();

    // const finalizarCompra = () => {
    //     alert('Compra finalizada e estoque atualizado');
    //     gerarRecibo();
    //     setListaProdutos([]);
    // };
    const finalizarCompra = async () => {
        if (listaProdutos.length === 0) {
            alert('Nenhum produto no carrinho.');
            return;
        }
    
        // Prepara os dados da compra para enviar ao backend
        const compra = {
            produtos: listaProdutos.map(item => ({
                id: item.id,  // Agora o ID do produto está presente
                quantidade: parseFloat(item.quantidade),
                preco: parseFloat(item.preco),
            })),
            total: totalValor // Total calculado no carrinho
        };
    
        try {
            // Faz a requisição POST para registrar a compra e atualizar o estoque
            const response = await fetch('http://back.elitevenda.com.br:3001/api/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(compra),  // Envia os dados da compra como JSON
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro ao finalizar a compra:', errorData);
                alert('Erro ao finalizar a compra. Tente novamente.');
                return;
            }
    
            // Exibe mensagem de sucesso e limpa o carrinho
            alert('Compra finalizada com sucesso!');
            gerarRecibo(); // Gera o recibo após a compra
            setListaProdutos([]); // Limpa o carrinho
    
        } catch (error) {
            console.error('Erro ao se conectar ao servidor:', error);
            alert('Erro ao se conectar ao servidor.');
        }
    };
    
    
    

    const gerarRecibo = () => {
        const reciboWindow = window.open('', '', 'width=400,height=600');
        reciboWindow.document.write('<html><head><title>Recibo</title></head><body>');
        reciboWindow.document.write('<h2>Recibo de Compra</h2>');
        reciboWindow.document.write('<table><thead><tr><th>Produto</th><th>Qtd</th><th>Preço Unitário</th><th>Total</th></tr></thead><tbody>');
      
        listaProdutos.forEach(produto => {
          reciboWindow.document.write(`
            <tr>
              <td>${produto.produto}</td>
              <td>${produto.quantidade}</td>
              <td>R$ ${produto.preco}</td>
              <td>R$ ${(produto.quantidade * produto.preco).toFixed(2)}</td>
            </tr>
          `);
        });
      
        reciboWindow.document.write('</tbody></table>');
        reciboWindow.document.write(`<p>Total de Produtos: ${totalKg.toFixed(2)} kg</p>`);
        reciboWindow.document.write(`<p>Preço Total: R$ ${totalValor.toFixed(2)}</p>`);
        reciboWindow.document.write('<p>Obrigado pela compra!</p>');
        reciboWindow.document.write('</body></html>');
        reciboWindow.document.close();
        reciboWindow.print();
      };
      


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 text-center">PDV - Compra de Mercadorias</h1>

                <div className="space-y-4">
                    {/* Campo de Quantidade */}
                    <div>
                        <label className="block text-gray-700">Quantidade (kg/unidade):</label>
                        <input
                            type="number"
                            value={quantidade}
                            onChange={(e) => setQuantidade(e.target.value)}
                            onKeyDown={handleQuantidadeEnter}
                            ref={quantidadeRef}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Campo de Produto */}
                    <div>
                        <label className="block text-gray-700">Produto:</label>
                        <input
                            type="text"
                            value={produto}
                            onChange={handleProdutoChange}
                            onKeyDown={handleProdutoKeyDown}
                            ref={produtoRef}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                            placeholder="Pesquisar produto"
                            required
                        />
                        {produtosFiltrados.length > 0 && (
                            <ul className="mt-2 bg-white border border-gray-300 rounded-md shadow-sm max-h-32 overflow-y-auto">
                                {produtosFiltrados.map((p, index) => (
                                    <li
                                        key={p.id}
                                        className={`cursor-pointer p-2 hover:bg-gray-100 ${index === produtoSelecionadoIndex ? 'bg-gray-200' : ''}`}
                                        onClick={() => selecionarProduto(p)}
                                    >
                                        {p.nome} - R${p.preco}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Campo de Preço */}
                    <div>
                        <label className="block text-gray-700">Preço (R$):</label>
                        <input
                            type="number"
                            step="0.01"
                            value={preco}
                            onChange={(e) => setPreco(e.target.value)}
                            onKeyDown={handlePrecoEnter}
                            ref={precoRef}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Lista de Produtos */}
                    <div className="mt-6">
  <h2 className="text-lg font-semibold text-gray-800">Carrinho:</h2>
  {/* Cabeçalho do carrinho em grade */}
  <div className="grid grid-cols-5 gap-4 p-2 bg-gray-200 font-semibold">
    <span>Produto</span>
    <span>Qtd</span>
    <span>Preço Unitário</span>
    <span>Total</span>
    <span>Ação</span>
  </div>
  
  {/* Itens do carrinho em grade */}
  <ul className="mt-2">
    {listaProdutos.map((item, index) => (
      <li key={index} className="grid grid-cols-5 gap-4 items-center p-2 border border-gray-300 rounded-md shadow-sm">
        <span>{item.produto}</span>
        <input
          type="number"
          value={item.quantidade}
          onChange={(e) => editarProduto(index, 'quantidade', e.target.value)}
          className="w-full p-1 border rounded-md"
        />
        <input
          type="number"
          step="0.01"
          value={item.preco}
          onChange={(e) => editarProduto(index, 'preco', e.target.value)}
          className="w-full p-1 border rounded-md"
        />
        {/* Exibe o total do produto (quantidade * preço unitário) */}
        <span>R$ {(item.quantidade * item.preco).toFixed(2)}</span>
        <button
          onClick={() => excluirProduto(index)}
          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition w-full"
        >
          Excluir
        </button>
      </li>
    ))}
  </ul>

  {/* Soma Total */}
  <div className="mt-4">
    <h3 className="text-lg font-semibold">Total:</h3>
    <p>Total em kg: {totalKg.toFixed(2)} kg</p>
    <p>Total em valor: R$ {totalValor.toFixed(2)}</p>
  </div>
</div>



                        {/* Botão de Finalizar Compra */}
                        <button
                            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition mt-6"
                            onClick={finalizarCompra}
                        >
                            Finalizar Compra
                        </button>
                    </div>
                </div>
            </div>
            );
}

            export default Compra;
