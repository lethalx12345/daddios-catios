// Professional Daddios Catios Website JavaScript

class DaddiosCatios {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupNavigation();
        this.setupFormHandling();
        this.setupIntersectionObserver();
        this.setupScrollEffects();
        this.setupPhoneFormatting();
    }

    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (!mobileMenuButton || !mobileMenu) return;

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Update active state
                    navLinks.forEach(l => l.classList.remove('text-orange-600'));
                    link.classList.add('text-orange-600');
                }
            });
        });

        // Update active nav on scroll
        window.addEventListener('scroll', () => this.updateActiveNav());
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('a[href^="#"]').forEach(link => {
                    link.classList.remove('text-orange-600');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-orange-600');
                    }
                });
            }
        });
    }

    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate form
            if (!this.validateForm(contactForm)) return;

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Submit form
            this.submitForm(contactForm, data);
        });
    }

    validateForm(form) {
        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const catioType = form.querySelector('[name="catio-type"]');

        if (!name.value.trim()) {
            this.showNotification('Please enter your name.', 'error');
            return false;
        }

        if (!email.value.trim()) {
            this.showNotification('Please enter your email address.', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }

        if (!catioType.value) {
            this.showNotification('Please select a catio type.', 'error');
            return false;
        }

        return true;
    }

    submitForm(form, data) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="inline-block animate-spin">⏳</span> Sending...';

        // Simulate API call
        setTimeout(() => {
            this.showNotification(
                'Thank you! We\'ve received your inquiry and will contact you within 24 hours.',
                'success'
            );
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = originalText;

            // Log form data (in production, send to server)
            console.log('Form submitted:', data);
        }, 1500);
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll(
            '.service-card, .gallery-item, .review-card, .bg-white'
        ).forEach(el => {
            observer.observe(el);
        });
    }

    setupScrollEffects() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateScrollEffects();
            }, 10);
        });
    }

    updateScrollEffects() {
        const scrollPos = window.pageYOffset;

        // Parallax effect on hero
        const hero = document.getElementById('home');
        if (hero && scrollPos < window.innerHeight) {
            const elements = hero.querySelectorAll('.absolute');
            elements.forEach((el, index) => {
                el.style.transform = `translateY(${scrollPos * 0.5 * (index + 1)}px)`;
            });
        }
    }

    setupPhoneFormatting() {
        const phoneInput = document.getElementById('phone');
        if (!phoneInput) return;

        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 10) {
                value = value.slice(0, 10);
            }

            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
                }
            }

            e.target.value = value;
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500',
            warning: 'bg-yellow-500'
        }[type] || 'bg-blue-500';

        notification.className = `fixed top-24 right-4 z-50 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <p class="font-medium">${message}</p>
                <button class="ml-4 text-white hover:text-gray-200 transition-colors">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Close button
        notification.querySelector('button').addEventListener('click', () => {
            this.removeNotification(notification);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 50);
    }

    removeNotification(notification) {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DaddiosCatios();
    console.log('🐱 Daddios Catios website initialized successfully!');
});
