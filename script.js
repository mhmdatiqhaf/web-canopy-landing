document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Language Switcher
    let currentLang = localStorage.getItem('sseLanguage') || 'ms';
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle?.querySelector('.lang-text');

    const switchLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('sseLanguage', lang);
        if (langText) langText.textContent = lang === 'ms' ? 'EN' : 'BM';
        document.documentElement.lang = lang === 'ms' ? 'ms' : 'en';
        document.querySelectorAll('[data-lang-ms][data-lang-en]').forEach(el => {
            const newText = el.getAttribute(`data-lang-${lang}`);
            if (newText) el.innerHTML = newText;
        });
    };
    switchLanguage(currentLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => switchLanguage(currentLang === 'ms' ? 'en' : 'ms'));
    }

    // Back to Top
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) backToTopBtn?.classList.add('visible');
        else backToTopBtn?.classList.remove('visible');
    }, { passive: true });

    backToTopBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Mobile Menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - navHeight, behavior: 'smooth' });
                if (navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn?.classList.remove('active');
                    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.pageYOffset > 100) {
                    navbar.style.cssText = 'background:rgba(26,26,26,0.95);backdrop-filter:blur(10px);box-shadow:0 4px 20px rgba(0,0,0,0.2);padding:1rem 0';
                } else {
                    navbar.style.cssText = 'background:transparent;backdrop-filter:none;box-shadow:none;padding:1.5rem 0';
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Counter Animation
    const animateCounter = (el, target, duration = 2000, isDecimal = false) => {
        const startTime = performance.now();
        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(2, -10 * progress);
            const current = target * ease;
            el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + el.dataset.suffix;
            if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number, .big-number').forEach(el => {
                    if (!el.classList.contains('animated')) {
                        const hasDecimal = el.dataset.decimal === 'true';
                        animateCounter(el, parseFloat(el.dataset.target), 2000, hasDecimal);
                        el.classList.add('animated');
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.hero-stats, .why-us-visual').forEach(el => statsObserver.observe(el));

    // Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const eventDate = document.getElementById('eventDate');
        if (eventDate) eventDate.min = new Date().toISOString().split('T')[0];

        const validate = (field) => {
            const error = field.parentElement.querySelector('.error-message');
            let valid = true;
            if (field.required && !field.value.trim()) valid = false;
            if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) valid = false;
            if (field.type === 'tel' && field.value && !/^[0-9]{9,12}$/.test(field.value.replace(/[^0-9]/g, ''))) valid = false;

            field.classList.toggle('error', !valid);
            return valid;
        };

        contactForm.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('blur', () => validate(field));
            field.addEventListener('input', () => field.classList.remove('error'));
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;
            this.querySelectorAll('[required]').forEach(f => { if (!validate(f)) isValid = false; });
            if (!isValid) {
                this.querySelector('.error')?.focus();
                return;
            }

            const data = new FormData(this);
            const msg = `🎪 *PERTANYAAN BARU - SERI SENAWANG EVENT*

📋 *Maklumat Pelanggan*
👤 Nama: ${data.get('name')}
📞 Telefon: ${data.get('phone')}
📧 Email: ${data.get('email') || 'Tidak disediakan'}

📅 *Maklumat Majlis*
🎉 Jenis: ${data.get('eventType')}
📆 Tarikh: ${new Date(data.get('eventDate')).toLocaleDateString('ms-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
👥 Anggaran Tetamu: ${data.get('guests') || 'Tidak dinyatakan'}
📍 Lokasi: ${data.get('location') || 'Belum ditentukan'}

💬 *Nota:* ${data.get('message') || '-'}`;

            const btn = this.querySelector('.btn-submit');
            btn.disabled = true;
            btn.innerHTML = '<span class="spinner">↻</span> Sedang Proses...';

            setTimeout(() => {
                document.querySelector('.contact-form-wrapper').innerHTML = `
                    <div class="form-success">
                        <div class="form-success-icon">✅</div>
                        <h4>Terima Kasih!</h4>
                         <p>Pertanyaan anda sedang diproses. Anda akan dialihkan ke WhatsApp...</p>
                    </div>`;
                window.open(`https://wa.me/60139677269?text=${encodeURIComponent(msg)}`, '_blank');
            }, 800);
        });
    }

    // Gallery Click
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => window.open('https://t.me/serisenawangeventgallery', '_blank'));
    });

    // Dynamic Year
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    console.log('🎪 Seri Senawang Event Loaded');
});
