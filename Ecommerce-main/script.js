// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeRegisterModal = document.getElementById('closeRegisterModal');
    
    // Navegação entre páginas
    function showPage(pageId) {
        // Remove classe active de todas as páginas
        pages.forEach(page => page.classList.remove('active'));
        
        // Remove classe active de todos os botões de navegação
        navBtns.forEach(btn => btn.classList.remove('active'));
        
        // Mostra a página selecionada
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        // Adiciona classe active ao botão correspondente
        const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }
    
    // Event listeners para navegação
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Toggle do menu do usuário
    userMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });
    
    // Fecha o dropdown quando clica fora
    document.addEventListener('click', function(e) {
        if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
        }
    });
    
    // Modais de Login e Cadastro
    loginBtn.addEventListener('click', function() {
        loginModal.classList.add('active');
        userDropdown.classList.remove('active');
    });
    
    registerBtn.addEventListener('click', function() {
        registerModal.classList.add('active');
        userDropdown.classList.remove('active');
    });
    
    closeLoginModal.addEventListener('click', function() {
        loginModal.classList.remove('active');
    });
    
    closeRegisterModal.addEventListener('click', function() {
        registerModal.classList.remove('active');
    });
    
    // Fecha modal quando clica no fundo
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
    
    registerModal.addEventListener('click', function(e) {
        if (e.target === registerModal) {
            registerModal.classList.remove('active');
        }
    });
    
    // Animações dos cards de produtos
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula envio do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'ENVIADO!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    // Formulários de autenticação
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.auth-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'PROCESSANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'SUCESSO!';
                submitBtn.style.background = '#4CAF50';
                
                setTimeout(() => {
                    // Fecha o modal
                    loginModal.classList.remove('active');
                    registerModal.classList.remove('active');
                    
                    // Reset do formulário
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 1500);
            }, 2000);
        });
    });
    
    // FAQ interativo
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Simula abertura de FAQ
            this.style.background = 'rgba(255, 255, 255, 0.3)';
            this.innerHTML += ' <i class="fas fa-chevron-down"></i>';
            
            setTimeout(() => {
                this.style.background = '';
                this.innerHTML = this.innerHTML.replace(' <i class="fas fa-chevron-down"></i>', '');
            }, 2000);
        });
    });
    
    // Efeito de scroll suave para navegação
    function smoothScrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Adiciona efeito de scroll suave quando muda de página
    navBtns.forEach(btn => {
        btn.addEventListener('click', smoothScrollToTop);
    });
    
    // Animação de entrada para elementos
    function animateOnScroll() {
        const elements = document.querySelectorAll('.product-card, .about-content, .cti-content, .support-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializa animações
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez no carregamento
    
    // Efeito de digitação para títulos
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplica efeito de digitação nos títulos principais
    const mainTitles = document.querySelectorAll('h2');
    mainTitles.forEach((title, index) => {
        const originalText = title.textContent;
        setTimeout(() => {
            if (title.closest('.page.active') || title.closest('#home')) {
                typeWriter(title, originalText, 50);
            }
        }, index * 500);
    });
    
    // Contador de produtos (simulação)
    let productCount = 0;
    const productCounters = document.querySelectorAll('.product-price');
    
    function updateProductCount() {
        productCount++;
        productCounters.forEach(counter => {
            if (Math.random() > 0.7) { // 30% de chance de atualizar
                const currentPrice = parseFloat(counter.textContent.replace('R$', '').replace(',', '.'));
                const newPrice = (currentPrice + Math.random() * 2 - 1).toFixed(2);
                counter.textContent = `R$${newPrice.replace('.', ',')}`;
            }
        });
    }
    
    // Inicialização
    console.log('PulsoTech Website carregado com sucesso!');
    console.log('Funcionalidades ativas:');
    console.log('- Navegação entre páginas');
    console.log('- Menu de usuário interativo');
    console.log('- Modais de login e cadastro');
    console.log('- Formulários funcionais');
    console.log('- Animações e efeitos visuais');
    
});

// Função para adicionar efeitos de partículas (opcional)
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 5}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
    
    document.body.appendChild(particlesContainer);
}

// CSS para animação das partículas
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);

// Ativa partículas (descomente para usar)
// createParticles();

