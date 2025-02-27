
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Evita o comportamento padrão do link
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Rola suavemente até a seção
        });
    });
});


let carrinho = [];


function atualizarContadorCarrinho() {
    const contador = document.getElementById('contador-carrinho');
    if (contador) {
        contador.textContent = carrinho.length;
    }
}


function atualizarListaCarrinho() {
    const lista = document.getElementById('lista-carrinho');
    if (lista) {
        lista.innerHTML = ''; 

        carrinho.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${item.nome} - Tamanho: ${item.tamanho}
                <button class="btn btn-sm btn-danger" onclick="removerDoCarrinho(${index})">Remover</button>
            `;
            lista.appendChild(li);
        });
    }
}


function adicionarAoCarrinho(nome, tamanho) {
    const item = { nome, tamanho };
    carrinho.push(item);
    atualizarContadorCarrinho();
    atualizarListaCarrinho();
    alert(`${nome} adicionado ao carrinho!`);
}


function removerDoCarrinho(index) {
    if (index >= 0 && index < carrinho.length) {
        carrinho.splice(index, 1);
        atualizarContadorCarrinho();
        atualizarListaCarrinho();
    }
}


const botaoLimparCarrinho = document.getElementById('limpar-carrinho');
if (botaoLimparCarrinho) {
    botaoLimparCarrinho.addEventListener('click', () => {
        carrinho = [];
        atualizarContadorCarrinho();
        atualizarListaCarrinho();
    });
}


document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.card');
        if (card) {
            const nome = card.querySelector('.card-title')?.textContent || 'Produto sem nome';
            const tamanhoMatch = card.querySelector('.card-text')?.textContent.match(/Tamanhos?: (.+)/);
            const tamanho = tamanhoMatch ? tamanhoMatch[1] : 'Tamanho não especificado';
            adicionarAoCarrinho(nome, tamanho);
        }
    });
});


const form = document.getElementById('form-fale-conosco');
if (form) {
    form.addEventListener('submit', (e) => {
        const email = form.querySelector('input[type="email"]');
        if (!email || !email.value.includes('@')) {
            e.preventDefault(); 
            alert('Por favor, insira um e-mail válido.');
        } else {
            alert('Mensagem enviada com sucesso!');
            form.reset(); 
        }
    });
}