document.addEventListener('DOMContentLoaded', () => {
    // 1. ローディング終了処理
    setTimeout(() => {
        document.body.classList.add('loaded');
        initScrollAnimations();
        initDancingText(); // 追加: 文字アニメーション開始
    }, 1500); 

    initCustomCursor(); // 追加: マウスストーカー
    initNavbar();
});

/* --- 1. スクロールアニメーション --- */
function initScrollAnimations() {
    const targets = document.querySelectorAll('.js-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });
    targets.forEach(target => observer.observe(target));
}

/* --- 2. 踊る文字 (Dancing Text) の生成 --- */
function initDancingText() {
    const textElements = document.querySelectorAll('.dancing-text');
    
    textElements.forEach(el => {
        const text = el.innerText;
        el.innerHTML = ''; // 一旦空にする
        
        // 1文字ずつspanで囲む
        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.innerText = char === ' ' ? '\u00A0' : char; // 空白文字の処理
            span.classList.add('dancing-char');
            // ランダムにウェーブを開始させる
            span.style.animationDelay = `${index * 0.1}s`;
            span.classList.add('animate-wave');
            el.appendChild(span);
        });
    });
}

/* --- 3. カスタムカーソル (星がついてくる) --- */
function initCustomCursor() {
    const cursor = document.getElementById('cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        // 少し遅れてついてくる演出
        setTimeout(() => {
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        }, 50);
    });

    // ホバー時のエフェクト（ボタンに乗ったら大きくなる等）
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.querySelector('.cursor-star').style.transform = 'scale(2) rotate(180deg)');
        el.addEventListener('mouseleave', () => cursor.querySelector('.cursor-star').style.transform = 'scale(1) rotate(0deg)');
    });
}

/* --- 4. ナビゲーション制御 --- */
function initNavbar() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-2', 'shadow-xl');
            nav.classList.remove('py-3');
        } else {
            nav.classList.remove('py-2', 'shadow-xl');
            nav.classList.add('py-3');
        }
    });

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