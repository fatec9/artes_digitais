// Estrutura dos produtos (simples, pode adaptar para puxar do catálogo real)
const produtos = [
  { id: 1, nome: "Arte Digital 1", preco: 120.00 },
  { id: 2, nome: "Arte Digital 2", preco: 250.00 },
  { id: 3, nome: "Arte Digital 3", preco: 320.00 },
];

// Função para pegar o carrinho do localStorage
function getCarrinho() {
  const carrinhoJSON = localStorage.getItem('carrinho');
  return carrinhoJSON ? JSON.parse(carrinhoJSON) : [];
}

// Salvar carrinho no localStorage
function setCarrinho(carrinho) {
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(idProduto) {
  const carrinho = getCarrinho();
  const produtoNoCarrinho = carrinho.find(item => item.id === idProduto);

  if (produtoNoCarrinho) {
    produtoNoCarrinho.quantidade += 1;
  } else {
    carrinho.push({ id: idProduto, quantidade: 1 });
  }

  setCarrinho(carrinho);
  alert('Produto adicionado ao carrinho!');
  atualizarCarrinhoUI();
}

// Remover produto do carrinho
function removerDoCarrinho(idProduto) {
  let carrinho = getCarrinho();
  carrinho = carrinho.filter(item => item.id !== idProduto);
  setCarrinho(carrinho);
  atualizarCarrinhoUI();
}

// Atualiza visual do carrinho na página carrinho.html
function atualizarCarrinhoUI() {
  const listaCarrinho = document.getElementById('lista-carrinho');
  const totalSpan = document.getElementById('total');
  if (!listaCarrinho || !totalSpan) return;

  const carrinho = getCarrinho();
  listaCarrinho.innerHTML = '';

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = '<li>Seu carrinho está vazio.</li>';
    totalSpan.textContent = '0.00';
    return;
  }

  let total = 0;
  carrinho.forEach(item => {
    const produto = produtos.find(p => p.id === item.id);
    if (!produto) return;

    const subtotal = produto.preco * item.quantidade;
    total += subtotal;

    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${produto.nome}</strong><br>
      Quantidade: ${item.quantidade} | Preço unitário: R$ ${produto.preco.toFixed(2)} <br>
      Subtotal: R$ ${subtotal.toFixed(2)} 
      <button aria-label="Remover ${produto.nome}" onclick="removerDoCarrinho(${produto.id})">Remover</button>
    `;
    listaCarrinho.appendChild(li);
  });

  totalSpan.textContent = total.toFixed(2);
}

// Limpa carrinho após checkout (pode ser chamado no evento de envio do formulário)
function limparCarrinho() {
  localStorage.removeItem('carrinho');
  alert('Compra finalizada com sucesso! Obrigado.');
  atualizarCarrinhoUI();
}

// Quando carregar a página carrinho, atualiza a lista
document.addEventListener('DOMContentLoaded', () => {
  atualizarCarrinhoUI();
});

// Exportar função para ser chamada no HTML dos produtos
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.limparCarrinho = limparCarrinho;
window.removerDoCarrinho = removerDoCarrinho;
