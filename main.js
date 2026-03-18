// ===== js/main.js =====
// Фоновые частицы (particles)
function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-bg';
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    function createParticles(count = 100) {
        particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: `rgba(98, 0, 255, ${Math.random() * 0.5 + 0.2})`
            });
        }
    }
    
    function draw() {
        ctx.clearRect(0, 0, width, height);
        
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Движение
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Возврат при выходе за границы
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;
        });
        
        requestAnimationFrame(draw);
    }
    
    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });
    
    resize();
    createParticles();
    draw();
}

// Плавное появление при скролле
function setupScrollAnimation() {
    const elements = document.querySelectorAll('.glass-card, .game-card, .team-card, .blog-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
}

// Фильтрация портфолио (если на странице есть фильтры)
function setupPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gameCards = document.querySelectorAll('.game-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Убираем активный класс у всех
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            gameCards.forEach(card => {
                if (filter === 'all' || card.dataset.genre === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    setupScrollAnimation();
    setupPortfolioFilters();
    
    // Подсветка текущей страницы в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.style.color = 'var(--secondary)';
        }
    });
});