// ========================================
// SERI SENAWANG EVENT - LANDING PAGE JS
// Interactive features for high conversion
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // LANGUAGE TRANSLATION SYSTEM
    // ========================================
    let currentLang = localStorage.getItem('sseLanguage') || 'ms';
    const langToggle = document.getElementById('langToggle');
    const langText = langToggle?.querySelector('.lang-text');

    // Function to switch language
    const switchLanguage = (lang) => {
        currentLang = lang;
        localStorage.setItem('sseLanguage', lang);

        // Update toggle button text
        if (langText) {
            langText.textContent = lang === 'ms' ? 'EN' : 'BM';
        }

        // Update HTML lang attribute
        document.documentElement.lang = lang === 'ms' ? 'ms' : 'en';

        // Update all elements with data-lang attributes
        document.querySelectorAll('[data-lang-ms][data-lang-en]').forEach(el => {
            const newText = el.getAttribute(`data-lang-${lang}`);
            if (newText) {
                // Check if the element has innerHTML or just text
                if (newText.includes('<')) {
                    el.innerHTML = newText;
                } else {
                    el.textContent = newText;
                }
            }
        });
    };

    // Initialize language on page load
    switchLanguage(currentLang);

    // Language toggle click handler
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'ms' ? 'en' : 'ms';
            switchLanguage(newLang);
        });
    }

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTopBtn = document.getElementById('backToTop');

    // Show/hide button based on scroll position
    const toggleBackToTop = () => {
        if (window.scrollY > 500) {
            backToTopBtn?.classList.add('visible');
        } else {
            backToTopBtn?.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);

    // Scroll to top on click
    backToTopBtn?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks?.classList.remove('active');
                mobileMenuBtn?.classList.remove('active');
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card, .testimonial-card, .package-card, .why-feature, .gallery-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Stagger animation for grid items
    document.querySelectorAll('.services-grid, .testimonials-grid, .packages-grid').forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Counter Animation for Stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.dataset.suffix || '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.dataset.suffix || '');
            }
        };

        updateCounter();
    };

    // Observe stats for animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number, .big-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    const text = statNumber.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        statNumber.dataset.suffix = text.replace(/\d/g, '').trim();
                        animateCounter(statNumber, number);
                        statNumber.classList.add('animated');
                    }
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat, .visual-card').forEach(el => {
        statsObserver.observe(el);
    });

    // WhatsApp Button Hide on Scroll Up
    const whatsappFloat = document.querySelector('.whatsapp-float');
    let hideTimeout;

    window.addEventListener('scroll', () => {
        if (whatsappFloat) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.pointerEvents = 'auto';

            clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                // Keep visible always on mobile
                if (window.innerWidth <= 768) return;
            }, 2000);
        }
    });

    // Add dynamic styles for mobile menu
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(26, 71, 42, 0.98);
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                transform: translateX(-100%);
                transition: transform 0.3s ease;
                z-index: 99;
            }
            
            .nav-links.active {
                display: flex;
                transform: translateX(0);
            }
            
            .nav-links a {
                font-size: 1.5rem;
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(mobileStyles);

    // Track CTA Clicks (for analytics)
    document.querySelectorAll('a[href*="wasap.click"], a[href^="tel:"]').forEach(cta => {
        cta.addEventListener('click', function () {
            const ctaType = this.href.includes('wasap') ? 'whatsapp' : 'phone';
            const ctaLocation = this.closest('section')?.className || 'unknown';

            // Log for analytics (can be connected to GA, FB Pixel, etc.)
            console.log(`CTA Click: ${ctaType} from ${ctaLocation}`);

            // You can add actual analytics tracking here
            // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': ctaType });
        });
    });

    // Testimonial Carousel (if needed for more testimonials)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');

    // Gallery Lightbox Effect (simple version)
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            // Could implement full lightbox here
            window.open('https://t.me/serisenawangeventgallery', '_blank');
        });
    });

    // Form validation helper (if forms are added later)
    window.validateForm = (formElement) => {
        const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    };

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Set minimum date to today for event date
        const eventDateInput = document.getElementById('eventDate');
        if (eventDateInput) {
            const today = new Date().toISOString().split('T')[0];
            eventDateInput.setAttribute('min', today);
        }

        // Real-time validation on input
        contactForm.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('blur', function () {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                } else {
                    this.classList.remove('error');
                }
            });

            field.addEventListener('input', function () {
                this.classList.remove('error');
            });
        });

        // Form submission
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate form
            if (!window.validateForm(this)) {
                // Scroll to first error
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Gather form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email') || 'Tidak disediakan';
            const eventType = formData.get('eventType');
            const eventDate = formData.get('eventDate');
            const guests = formData.get('guests') || 'Tidak dinyatakan';
            const location = formData.get('location') || 'Belum ditentukan';
            const message = formData.get('message') || '-';

            // Format date nicely
            const dateObj = new Date(eventDate);
            const formattedDate = dateObj.toLocaleDateString('ms-MY', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Build WhatsApp message
            const whatsappMessage = `🎪 *PERTANYAAN BARU - SERI SENAWANG EVENT*

📋 *Maklumat Pelanggan*
━━━━━━━━━━━━━━━
👤 Nama: ${name}
📞 Telefon: ${phone}
📧 Email: ${email}

📅 *Maklumat Majlis*
━━━━━━━━━━━━━━━
🎉 Jenis: ${eventType}
📆 Tarikh: ${formattedDate}
👥 Anggaran Tetamu: ${guests}
📍 Lokasi: ${location}

💬 *Nota Tambahan*
━━━━━━━━━━━━━━━
${message}

_Dihantar dari Website Landing Page_`;

            // Encode for WhatsApp URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            const whatsappURL = `https://wa.me/60139677269?text=${encodedMessage}`;

            // Show success message
            const formWrapper = document.querySelector('.contact-form-wrapper');
            if (formWrapper) {
                formWrapper.innerHTML = `
                    <div class="form-success">
                        <div class="form-success-icon">✅</div>
                        <h4>Terima Kasih!</h4>
                        <p>Pertanyaan anda sedang diproses. Anda akan dialihkan ke WhatsApp...</p>
                    </div>
                `;
            }

            // Log for analytics
            console.log('Contact Form Submitted:', {
                name, phone, eventType, eventDate, guests, location
            });

            // Open WhatsApp after short delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
            }, 1500);
        });
    }

    console.log('🎪 Seri Senawang Event - Landing Page Loaded Successfully!');
});

// Lazy load images (if image sources are added)
document.addEventListener('DOMContentLoaded', () => {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
});
