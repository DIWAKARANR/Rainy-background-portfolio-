document.addEventListener('DOMContentLoaded', () => {
    const rainContainer = document.getElementById('rain-container');
    const splashScreen = document.querySelector('.splash-screen');
    const content = document.querySelector('.content');

    // Create rain effect
    function createRain() {
        const raindropsCount = 100;
        for (let i = 0; i < raindropsCount; i++) {
            const raindrop = document.createElement('div');
            raindrop.classList.add('raindrop');
            raindrop.style.left = `${Math.random() * 100}%`;
            raindrop.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
            raindrop.style.animationDelay = `${Math.random() * 2}s`;
            rainContainer.appendChild(raindrop);
        }
    }

    // Splash screen animation
    function removeSplashScreen() {
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
            content.style.display = 'block';
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.opacity = '1';
            }, 50);
        }, 500);
    }

    // Scroll animation
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-item, .internship-item, .project-item, .certification-item');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop >= 0) && (elementBottom <= window.innerHeight);
            if (isVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Lightning effect
    function createLightning() {
        const lightning = document.createElement('div');
        lightning.style.position = 'fixed';
        lightning.style.top = '0';
        lightning.style.left = '0';
        lightning.style.width = '100%';
        lightning.style.height = '100%';
        lightning.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
        lightning.style.opacity = '0';
        lightning.style.zIndex = '999';
        lightning.style.pointerEvents = 'none';
        document.body.appendChild(lightning);

        function flash() {
            lightning.style.opacity = '1';
            setTimeout(() => {
                lightning.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                lightning.style.opacity = '0.2';
            }, 100);

            setTimeout(() => {
                lightning.style.opacity = '0';
            }, 150);
        }

        setInterval(() => {
            if (Math.random() < 0.1) {
                flash();
            }
        }, 5000);
    }

    // Initialize effects and animations
    createRain();
    createLightning();
    window.addEventListener('scroll', animateOnScroll);
    splashScreen.addEventListener('click', removeSplashScreen);

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        });
    });

    // Typing effect for the splash screen title
    const splashTitle = document.querySelector('.splash-content h1');
    const titleText = splashTitle.textContent;
    splashTitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < titleText.length) {
            splashTitle.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
});
