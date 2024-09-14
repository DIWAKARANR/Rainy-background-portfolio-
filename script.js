document.addEventListener('DOMContentLoaded', () => {
    const rainContainer = document.getElementById('rain-container');
    const splashScreen = document.querySelector('.splash-screen');
    const content = document.querySelector('.content');
    const lightning = document.getElementById('lightning');

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

    // Lightning and thunder effect
    function createLightningAndThunder() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        function createThunderSound() {
            const bufferSize = 2 * audioContext.sampleRate;
            const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = noiseBuffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                output[i] = Math.random() * 2 - 1;
            }

            const whiteNoise = audioContext.createBufferSource();
            whiteNoise.buffer = noiseBuffer;

            const bandpass = audioContext.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.value = 80; // Lower frequency for a deeper thunder effect

            const lowpass = audioContext.createBiquadFilter();
            lowpass.type = 'lowpass';
            lowpass.frequency.value = 800; // Lower value for a muffled, heavy thunder effect

            const highpass = audioContext.createBiquadFilter();
            highpass.type = 'highpass';
            highpass.frequency.value = 40; // Lowering this makes the sound more rumbling

            const gainNode = audioContext.createGain();
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(1.5, audioContext.currentTime + 0.01); // Increased gain for louder thunder
            gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 3); // Maintain sound for longer before fading

            whiteNoise.connect(bandpass);
            bandpass.connect(lowpass);
            lowpass.connect(highpass);
            highpass.connect(gainNode);
            gainNode.connect(audioContext.destination);

            whiteNoise.start();
            whiteNoise.stop(audioContext.currentTime + 3);
        }

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

            // Play thunder sound with a delay
            setTimeout(() => {
                createThunderSound();
            }, 300);
        }

        setInterval(() => {
            if (Math.random() < 0.1) {
                flash();
            }
        }, 5000);
    }

    // Initialize effects and animations
    createRain();
    createLightningAndThunder();
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
        
