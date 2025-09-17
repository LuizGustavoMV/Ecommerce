// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

    // Seletores dos elementos interativos
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const productCards = document.querySelectorAll('.product-card');
    
    // ===================================
    // ABRIR E FECHAR MODAIS E DROPDOWNS
    // ===================================

    // Função para abrir um modal
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
        }
        // Fecha o dropdown do usuário se estiver aberto
        if (userDropdown) {
            userDropdown.classList.remove('active');
        }
    }

    // Função para fechar um modal
    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
        }
    }

    // Evento para abrir o dropdown do usuário
    userMenuBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown?.classList.toggle('active');
    });

    // Evento para fechar o dropdown se clicar fora
    document.addEventListener('click', (e) => {
        if (userMenuBtn && !userMenuBtn.contains(e.target) && userDropdown && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });

    // Eventos para abrir modais de login/cadastro
    document.getElementById('loginBtn')?.addEventListener('click', () => openModal(loginModal));
    document.getElementById('registerBtn')?.addEventListener('click', () => openModal(registerModal));

    // Eventos para abrir modais de produto
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.dataset.modalTarget;
            if (modalId) {
                const modal = document.querySelector(modalId);
                openModal(modal);
            }
        });
    });
    
    // Eventos para fechar QUALQUER modal (botão 'x' ou clique fora)
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        // Fechar clicando no 'x'
        const closeBtn = modal.querySelector('[data-close-modal]');
        if(closeBtn) {
            closeBtn.addEventListener('click', () => closeModal(modal));
        }

        // Fechar clicando fora do conteúdo do modal
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // ====================
    // SIMULAÇÃO DE ENVIO DE FORMULÁRIO
    // ====================
    function fakeSubmit(form, successText = 'ENVIADO!') {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"], .auth-btn');
            const originalText = btn.textContent;
            btn.textContent = 'PROCESSANDO...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = successText;
                btn.style.backgroundColor = '#4CAF50';
                setTimeout(() => {
                    form.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    // Fecha o modal após o sucesso
                    const parentModal = form.closest('.modal');
                    closeModal(parentModal);
                }, 1500);
            }, 1000);
        });
    }

    document.querySelector('.contact-form') && fakeSubmit(document.querySelector('.contact-form'));
    document.querySelectorAll('.auth-form').forEach(form => fakeSubmit(form, 'SUCESSO!'));


    console.log('PulsoTech Website carregado e scripts funcionando!');
});