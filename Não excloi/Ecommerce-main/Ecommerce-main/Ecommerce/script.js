// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

    // Seletores principais
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const userMenuBtn = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
  
    // ====================
    // Navegação
    // ====================
    function showPage(pageId) {
      pages.forEach(p => p.classList.remove('active'));
      navBtns.forEach(b => b.classList.remove('active'));
  
      const page = document.getElementById(pageId);
      const btn = document.querySelector(`[data-page="${pageId}"]`);
      page?.classList.add('active');
      btn?.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  
    navBtns.forEach(b =>
      b.addEventListener('click', () => showPage(b.dataset.page))
    );
  
    // ====================
    // Menu do usuário
    // ====================
    userMenuBtn?.addEventListener('click', e => {
      e.stopPropagation();
      userDropdown.classList.toggle('active');
    });
  
    document.addEventListener('click', e => {
      if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target))
        userDropdown.classList.remove('active');
    });
  
    // ====================
    // Modais
    // ====================
    function openModal(modal) {
      modal?.classList.add('active');
      userDropdown?.classList.remove('active');
    }
    function closeModal(modal) {
      modal?.classList.remove('active');
    }
  
    document.getElementById('loginBtn')?.addEventListener('click', () => openModal(loginModal));
    document.getElementById('registerBtn')?.addEventListener('click', () => openModal(registerModal));
    document.getElementById('closeLoginModal')?.addEventListener('click', () => closeModal(loginModal));
    document.getElementById('closeRegisterModal')?.addEventListener('click', () => closeModal(registerModal));
  
    [loginModal, registerModal].forEach(m =>
      m?.addEventListener('click', e => e.target === m && closeModal(m))
    );
  
    // ====================
    // Animações
    // ====================
    document.querySelectorAll('.product-card').forEach(c => {
      c.addEventListener('mouseenter', () => c.style.transform = 'translateY(-15px) scale(1.02)');
      c.addEventListener('mouseleave', () => c.style.transform = '');
    });
  
    function animateOnScroll() {
      document.querySelectorAll('.product-card, .about-content, .cti-content, .support-content')
        .forEach(el => {
          if (el.getBoundingClientRect().top < window.innerHeight - 150) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
  
    // ====================
    // Formulários
    // ====================
    function fakeSubmit(form, successText = 'ENVIADO!') {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"], .auth-btn');
        const original = btn.textContent;
        btn.textContent = 'PROCESSANDO...'; btn.disabled = true;
  
        setTimeout(() => {
          btn.textContent = successText; btn.style.background = '#4CAF50';
          setTimeout(() => {
            form.reset();
            btn.textContent = original; btn.disabled = false; btn.style.background = '';
            closeModal(loginModal); closeModal(registerModal);
          }, 1500);
        }, 1500);
      });
    }
  
    document.querySelector('.contact-form') && fakeSubmit(document.querySelector('.contact-form'), 'ENVIADO!');
    document.querySelectorAll('.auth-form').forEach(f => fakeSubmit(f, 'SUCESSO!'));
  
    // ====================
    // FAQ
    // ====================
    document.querySelectorAll('.faq-item').forEach(i =>
      i.addEventListener('click', () => {
        i.style.background = 'rgba(255,255,255,0.3)';
        setTimeout(() => i.style.background = '', 2000);
      })
    );
  
    // ====================
    // Efeito digitação
    // ====================
    function typeWriter(el, text, speed = 50) {
      el.textContent = '';
      [...text].forEach((ch, i) =>
        setTimeout(() => el.textContent += ch, i * speed)
      );
    }
  
    document.querySelectorAll('h2').forEach((t, i) =>
      setTimeout(() => {
        if (t.closest('.page.active') || t.closest('#home')) typeWriter(t, t.textContent);
      }, i * 500)
    );
  
    console.log('PulsoTech Website carregado!');
  });
  