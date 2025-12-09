/* ========================================================
   KB Park Main Script with MicroCMS
   ======================================================== */

// ★重要: MicroCMSを使わない場合はこのままでOKです（自動でダミー画像になります）
const MICROCMS_SERVICE_ID = 'YOUR_SERVICE_ID'; 
const MICROCMS_API_KEY    = 'YOUR_API_KEY';    
const MICROCMS_API_NAME   = 'site_data';       

document.addEventListener('DOMContentLoaded', () => {
    // 1. ローディング終了処理
    setTimeout(() => {
        document.body.classList.add('loaded');
        initScrollAnimations();
    }, 1500); 

    initMouseParallax();
    initNavbar();
    fetchSiteData(); // CMSデータの取得（設定されていれば）
});

/* --- 1. スクロールアニメーション (Intersection Observer) --- */
function initScrollAnimations() {
    const targets = document.querySelectorAll('.js-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    targets.forEach(target => observer.observe(target));
}

/* --- 2. マウス連動パララックス --- */
function initMouseParallax() {
    const orbs = document.querySelectorAll('.bg-orb');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20; 
            const moveX = (x - 0.5) * speed;
            const moveY = (y - 0.5) * speed;
            orb.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        });
    });
}

/* --- 3. ナビゲーション制御 --- */
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

/* --- 4. MicroCMS データ取得 (設定済みの場合のみ動作) --- */
async function fetchSiteData() {
    if (MICROCMS_SERVICE_ID === 'YOUR_SERVICE_ID') return;

    try {
        const url = `https://${MICROCMS_SERVICE_ID}.microcms.io/api/v1/${MICROCMS_API_NAME}`;
        const response = await fetch(url, {
            headers: { 'X-MICROCMS-API-KEY': MICROCMS_API_KEY }
        });
        if (!response.ok) throw new Error('Failed');
        const data = await response.json();

        if (data.hero_image?.url) document.getElementById('hero-image').src = data.hero_image.url;
        if (data.wall_run_image?.url) document.getElementById('wall-run-image').src = data.wall_run_image.url;
        if (data.dunk_image?.url) document.getElementById('dunk-image').src = data.dunk_image.url;
        if (data.kids_image?.url) document.getElementById('kids-image').src = data.kids_image.url; // ID追加済み

    } catch (error) {
        console.log('CMS load skipped or failed');
    }
}