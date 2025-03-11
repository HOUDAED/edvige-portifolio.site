// Main initialization wrapper
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements once
    const elements = {
        carousel: document.querySelector('.carousel'),
        prevBtn: document.querySelector('.prev-btn'),
        nextBtn: document.querySelector('.next-btn'),
        navToggle: document.querySelector('.nav-toggle'),
        navMenu: document.querySelector('nav ul'),
        langSwitcher: document.querySelector('.lang-switch'),
        revealElements: document.querySelectorAll('.reveal'),
        tabButtons: document.querySelectorAll('.tab-button'),
        tabContents: document.querySelectorAll('.tab-content')
    };

    // Tab functionality
    function showTab(tabId) {
        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Remove active class from all buttons
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
            button.setAttribute('aria-selected', 'false');
        });
        
        // Show selected tab content
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        // Set active button
        const selectedButton = document.querySelector(`[onclick="showTab('${tabId}')"]`);
        if (selectedButton) {
            selectedButton.classList.add('active');
            selectedButton.setAttribute('aria-selected', 'true');
        }
    }

    // Carousel functionality
    function initCarousel() {
        if (!elements.carousel) return;

        let index = 0;
        let autoScrollInterval;

        function updateCarousel() {
            elements.carousel.style.transform = `translateX(-${index * 100}%)`;
        }

        function resetAutoScroll() {
            clearInterval(autoScrollInterval);
            startAutoScroll();
        }

        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                index = (index + 1) % elements.carousel.children.length;
                updateCarousel();
            }, 5000);
        }

        elements.nextBtn?.addEventListener('click', () => {
            index = (index + 1) % elements.carousel.children.length;
            updateCarousel();
            resetAutoScroll();
        });

        elements.prevBtn?.addEventListener('click', () => {
            index = (index - 1 + elements.carousel.children.length) % elements.carousel.children.length;
            updateCarousel();
            resetAutoScroll();
        });

        startAutoScroll();
    }

    // Mobile menu functionality
    function initMobileMenu() {
        if (!elements.navToggle || !elements.navMenu) return;

        const handleMenuToggle = (isOpen) => {
            elements.navToggle.setAttribute('aria-expanded', isOpen);
            elements.navToggle.innerHTML = isOpen ? '✕' : '☰';
            document.body.classList.toggle('menu-open', isOpen);
            elements.navMenu.classList.toggle('active', isOpen);
        };

        elements.navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const willOpen = !elements.navMenu.classList.contains('active');
            handleMenuToggle(willOpen);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && elements.navMenu.classList.contains('active')) {
                handleMenuToggle(false);
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && elements.navMenu.classList.contains('active')) {
                handleMenuToggle(false);
            }
        });
    }

    // Scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        elements.revealElements.forEach(el => observer.observe(el));
    }

    // Skill animations
    function animateSkill(element, percentage) {
        if (!element) return;

        const skillFill = element.querySelector('.skill-fill');
        const skillPercent = element.querySelector('.skill-percent');
        
        if (!skillFill || !skillPercent) return;

        skillFill.style.width = '0';
        skillPercent.style.opacity = '0';

        requestAnimationFrame(() => {
            skillFill.style.width = `${percentage}%`;
            let counter = 0;
            
            const increment = () => {
                if (counter < percentage) {
                    counter++;
                    skillPercent.textContent = `${counter}%`;
                    requestAnimationFrame(increment);
                }
            };

            increment();
            setTimeout(() => skillPercent.style.opacity = '1', 1000);
        });
    }

    // Animate language proficiency bars when they become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const level = card.dataset.level;
                const bar = card.querySelector('.proficiency-level');
                bar.style.width = level + '%';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.language-card').forEach(card => {
        observer.observe(card);
    });

    // Initialize everything
    initCarousel();
    initMobileMenu();
    initScrollAnimations();

    // Make functions globally available
    window.showTab = showTab;
    window.animateSkill = animateSkill;
});

