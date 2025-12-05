document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initMarquee();
    initParallax();
    initNavbar();
});

/* --- 1. スクロール時のふわっと表示 --- */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up');

    const checkReveal = () => {
        const triggerBottom = window.innerHeight * 0.85;
        reveals.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', checkReveal);
    checkReveal();
}

/* --- 2. 文字列の無限ループ --- */
function initMarquee() {
    const marqueeContainer = document.querySelector('.marquee-content');
    if (!marqueeContainer) return;

    // 内容をコピーして追加し、途切れさせない
    const clone = marqueeContainer.innerHTML;
    marqueeContainer.innerHTML += clone; 
    marqueeContainer.innerHTML += clone; 
}

/* --- 3. 背景の視差効果 (パララックス) --- */
function initParallax() {
    const bg = document.querySelector('.parallax-bg');
    if (!bg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        bg.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

/* --- 4. ナビゲーションの見た目変更 --- */
function initNavbar() {
    const nav = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-lg', 'py-2');
            nav.classList.remove('py-4');
        } else {
            nav.classList.remove('shadow-lg', 'py-2');
            nav.classList.add('py-4');
        }
    });

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const target = document.querySelector(targetId);
            if(target){
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}