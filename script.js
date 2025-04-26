document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile nav if it doesn't exist
            if (!document.querySelector('.mobile-nav')) {
                const mobileNav = document.createElement('div');
                mobileNav.className = 'mobile-nav';
                
                const mobileNavList = navList.cloneNode(true);
                mobileNav.appendChild(mobileNavList);
                
                document.body.appendChild(mobileNav);
                
                // Add click event to mobile nav links
                const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
                mobileNavLinks.forEach(link => {
                    link.addEventListener('click', function() {
                        mobileMenuBtn.classList.remove('active');
                        mobileNav.classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    });
                });
            }
            
            const mobileNav = document.querySelector('.mobile-nav');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }
    
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTopBtn() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For this example, we'll just log it to the console
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll event listeners
    window.addEventListener('scroll', function() {
        toggleBackToTopBtn();
        animateSkillBars();
    });
    
    // Initial calls
    toggleBackToTopBtn();
    animateSkillBars();
    
    // Add CSS for mobile nav
    const style = document.createElement('style');
    style.textContent = `
        body.no-scroll {
            overflow: hidden;
        }
        
        .mobile-nav {
            position: fixed;
            top: var(--header-height);
            left: 0;
            width: 100%;
            height: calc(100vh - var(--header-height));
            background-color: white;
            padding: 2rem;
            z-index: 999;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
            overflow-y: auto;
        }
        
        .mobile-nav.active {
            transform: translateX(0);
        }
        
        .mobile-nav .nav-list {
            flex-direction: column;
            gap: 2rem;
        }
        
        .mobile-nav .nav-link {
            font-size: 1.25rem;
        }
        
        .mobile-menu-btn.active .bar:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        
        .mobile-menu-btn.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active .bar:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
});