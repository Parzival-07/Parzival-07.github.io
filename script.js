// Add this to the top of your script.js file (before everything else)
window.onbeforeunload = function() {
  window.scrollTo(0, 0);
  
  // Store the scroll position as 0 in sessionStorage
  sessionStorage.setItem('scrollPosition', 0);
};

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Force scroll to top on page load with higher priority
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Use 'auto' instead of 'smooth' for immediate scrolling
    });
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        mirror: false
    });

    // Theme Switcher
    const themeSwitch = document.getElementById('checkbox');
    themeSwitch.addEventListener('change', () => {
        document.documentElement.setAttribute('data-theme', 
            themeSwitch.checked ? 'dark' : 'light');
        localStorage.setItem('theme', 
            themeSwitch.checked ? 'dark' : 'light');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeSwitch.checked = savedTheme === 'dark';
    } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeSwitch.checked = true;
        }
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Change cursor size on clickable elements
    const links = document.querySelectorAll('a, button, .gallery-item, .theme-switch');

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            cursor.style.backgroundColor = 'var(--secondary-color)';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.backgroundColor = 'var(--primary-color)';
        });
    });

    // Gallery scrolling with mouse wheel
    const galleryContainer = document.querySelector('.gallery-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (galleryContainer) {
        // Calculate gallery variables
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length > 0) {
            const itemWidth = galleryItems[0].offsetWidth;
            const gap = 24; // 1.5rem converted to px
            const scrollAmount = itemWidth + gap;
            
            // Scroll with buttons
            nextBtn.addEventListener('click', () => {
                galleryContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
            
            prevBtn.addEventListener('click', () => {
                galleryContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            
            // Scroll with mouse wheel - prevent page scroll
            galleryContainer.addEventListener('wheel', (e) => {
                if (galleryContainer.matches(':hover')) {
                    e.preventDefault();
                    galleryContainer.scrollLeft += e.deltaY;
                }
            });
            
            // Make gallery items draggable for mobile
            let isDown = false;
            let startX;
            let scrollLeft;

            galleryContainer.addEventListener('mousedown', (e) => {
                isDown = true;
                galleryContainer.style.cursor = 'grabbing';
                startX = e.pageX - galleryContainer.offsetLeft;
                scrollLeft = galleryContainer.scrollLeft;
            });

            galleryContainer.addEventListener('mouseleave', () => {
                isDown = false;
                galleryContainer.style.cursor = 'grab';
            });

            galleryContainer.addEventListener('mouseup', () => {
                isDown = false;
                galleryContainer.style.cursor = 'grab';
            });

            galleryContainer.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - galleryContainer.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed
                galleryContainer.scrollLeft = scrollLeft - walk;
            });
        }
    }

    // Skill tag animation
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('animated');
    });

    // Scroll reveal animation
    const scrollElements = document.querySelectorAll('.reveal');
    
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('active');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('active');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 70)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Back to top button
    const backToTopButton = document.createElement('div');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    // Page loading animation
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = '<div class="loader-circle"></div>';
    document.body.prepend(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Remove loader after transition
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });

    // Sassy background effect
    createSassyBackground();

    function createSassyBackground() {
        // Create the sassy background container
        const sassyBg = document.createElement('div');
        sassyBg.className = 'sassy-background';
        document.body.prepend(sassyBg);
        
        // Add animated elements
        for (let i = 0; i < 12; i++) {
            const energyLine = document.createElement('div');
            energyLine.className = 'energy-line';
            
            // Randomize position, size, and animation
            energyLine.style.left = `${Math.random() * 100}%`;
            energyLine.style.width = `${Math.random() * 2 + 0.5}px`;
            energyLine.style.height = `${Math.random() * 50 + 20}%`;
            energyLine.style.animationDuration = `${Math.random() * 6 + 6}s`;
            energyLine.style.animationDelay = `${Math.random() * 5}s`;
            
            sassyBg.appendChild(energyLine);
        }
        
        // Add pulsating orbs
        for (let i = 0; i < 8; i++) {
            const energyOrb = document.createElement('div');
            energyOrb.className = 'energy-orb';
            
            // Randomize properties
            energyOrb.style.left = `${Math.random() * 100}%`;
            energyOrb.style.top = `${Math.random() * 100}%`;
            const size = Math.random() * 80 + 40;
            energyOrb.style.width = `${size}px`;
            energyOrb.style.height = `${size}px`;
            energyOrb.style.animationDuration = `${Math.random() * 10 + 8}s`;
            energyOrb.style.animationDelay = `${Math.random() * 5}s`;
            
            sassyBg.appendChild(energyOrb);
        }
        
        // Create occasional lightning flashes
        setInterval(() => {
            if (Math.random() > 0.7) {
                const flash = document.createElement('div');
                flash.className = 'lightning-flash';
                flash.style.left = `${Math.random() * 100}%`;
                flash.style.top = `${Math.random() * 100}%`;
                
                sassyBg.appendChild(flash);
                
                // Remove after animation completes
                setTimeout(() => {
                    flash.remove();
                }, 1000);
            }
        }, 5000);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Konami code easter egg
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiPosition = 0;

    document.addEventListener('keydown', (e) => {
        // Get the key pressed
        const key = e.key;
        
        // Check if it's the expected key in the sequence
        const expectedKey = konamiCode[konamiPosition];
        
        if (key === expectedKey) {
            // Move to the next key in the sequence
            konamiPosition++;
            
            // Check if the full sequence was entered
            if (konamiPosition === konamiCode.length) {
                // Activate matrix mode
                activateMatrixMode();
                // Reset the position for next time
                konamiPosition = 0;
            }
        } else {
            // Reset the position if a wrong key is pressed
            konamiPosition = 0;
        }
    });
    
    // Matrix effect for Konami code
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    
    let matrixActive = false;
    
    function activateMatrixMode() {
        document.body.classList.toggle('matrix-active');
        
        if (!matrixActive) {
            matrixActive = true;
            
            // Set canvas dimensions
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            // Matrix rain characters
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
            const charArray = characters.split('');
            
            const fontSize = 14;
            const columns = canvas.width / fontSize;
            
            // Array to track current position of each column
            const drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = 1;
            }
            
            const drawMatrix = () => {
                // Semi-transparent black to create fade effect
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                ctx.fillStyle = '#0F0'; // Matrix green
                ctx.font = fontSize + 'px monospace';
                
                // Loop through drops
                for (let i = 0; i < drops.length; i++) {
                    // Random character
                    const text = charArray[Math.floor(Math.random() * charArray.length)];
                    
                    // x = i*fontSize, y = value of drops[i]*fontSize
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    // After drawing character, increment y position
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            };
            
            // Start animation
            const matrixInterval = setInterval(drawMatrix, 33);
            
            // Auto deactivate after 10 seconds
            setTimeout(() => {
                clearInterval(matrixInterval);
                document.body.classList.remove('matrix-active');
                matrixActive = false;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 10000);
        }
    }
    
    // Marvel Easter Egg - Thanos Snap
    const marvelRef = document.getElementById('marvel-ref');
    // Preload the snap sound 
    const snapSound = new Audio('im/thanos-snap-sound-effect.mp3');
    snapSound.preload = 'auto';
    snapSound.volume = 0.3;
    snapSound.load(); // Force browser to start loading the sound file immediately

    if (marvelRef) {
        marvelRef.addEventListener('click', (e) => {
            e.preventDefault();
            // Always trigger the snap effect now (removed the random chance)
            const elements = document.querySelectorAll('p, h3, li');
            elements.forEach((el, index) => {
                if (Math.random() > 0.5) { // Still randomize which elements disappear
                    setTimeout(() => {
                        el.style.opacity = '0';
                        el.style.transition = 'opacity 2s ease';
                    }, index * 50); // Made this faster (50ms instead of 100ms)
                }
            });
            
            // Play the preloaded sound (should now play instantly)
            const playPromise = snapSound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(e => {
                    console.log("Couldn't play snap sound", e);
                    // If there's an error, create a new Audio instance and try again
                    const fallbackSound = new Audio('im/thanos-snap-sound-effect.mp3');
                    fallbackSound.volume = 0.3;
                    fallbackSound.play();
                });
            }
            
            setTimeout(() => {
                // Restore everything after 5 seconds
                elements.forEach(el => {
                    el.style.opacity = '1';
                    el.style.transition = 'opacity 1s ease';
                });
            }, 5000);
        });
    }
    
    // Crazy Quote Animation
    const crazyQuote = document.getElementById('crazy-quote');
    if (crazyQuote) {
        crazyQuote.addEventListener('click', () => {
            crazyQuote.classList.add('konami-active');
            setTimeout(() => {
                crazyQuote.classList.remove('konami-active');
            }, 2000);
        });
    }

    // Text analyzer functionality
    const analyzeTextInput = document.getElementById('analyzeTextInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const analyzeResults = document.getElementById('analyzeResults');
    
    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', function() {
            const text = analyzeTextInput.value.trim();
            
            // Remove the minimum text length check
            if (text.length === 0) {
                alert("Please enter some text to analyze.");
                return;
            }
            
            analyzeText(text);
            analyzeResults.style.display = 'block';
            analyzeResults.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    
    function analyzeText(text) {
        // Basic text statistics calculation
        calculateBasicStats(text);
        
        // Tokenize text and analyze linguistic elements
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Analyze pronouns
        analyzePronouns(words);
        
        // Analyze prepositions
        analyzePrepositions(words);
        
        // Analyze indefinite articles
        analyzeArticles(words);
    }
    
    function calculateBasicStats(text) {
        // Letters count (alphabetic characters)
        const letterCount = (text.match(/[a-zA-Z]/g) || []).length;
        document.getElementById('letterCount').textContent = letterCount.toLocaleString();
        
        // Words count (sequences of characters separated by whitespace)
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        document.getElementById('wordCount').textContent = wordCount.toLocaleString();
        
        // Spaces count (all whitespace characters)
        const spaceCount = (text.match(/\s/g) || []).length;
        document.getElementById('spaceCount').textContent = spaceCount.toLocaleString();
        
        // Newlines count
        const newlineCount = (text.match(/\n/g) || []).length;
        document.getElementById('newlineCount').textContent = newlineCount.toLocaleString();
        
        // Special symbols count (non-alphanumeric, non-whitespace characters)
        const specialCount = (text.match(/[^\w\s]/g) || []).length;
        document.getElementById('specialCount').textContent = specialCount.toLocaleString();
    }
    
    function analyzePronouns(words) {
        const pronouns = {
            // Personal pronouns
            'i': 0, 'me': 0, 'my': 0, 'mine': 0, 'myself': 0,
            'you': 0, 'your': 0, 'yours': 0, 'yourself': 0, 'yourselves': 0,
            'he': 0, 'him': 0, 'his': 0, 'himself': 0,
            'she': 0, 'her': 0, 'hers': 0, 'herself': 0,
            'it': 0, 'its': 0, 'itself': 0,
            'we': 0, 'us': 0, 'our': 0, 'ours': 0, 'ourselves': 0,
            'they': 0, 'them': 0, 'their': 0, 'theirs': 0, 'themselves': 0,
            
            // Demonstrative pronouns
            'this': 0, 'that': 0, 'these': 0, 'those': 0,
            
            // Relative/Interrogative pronouns
            'who': 0, 'whom': 0, 'whose': 0, 'which': 0, 'what': 0, 'whatever': 0, 'whoever': 0, 'whomever': 0, 'whichever': 0,
            
            // Indefinite pronouns
            'anybody': 0, 'anyone': 0, 'anything': 0, 'each': 0, 'either': 0, 'everybody': 0, 
            'everyone': 0, 'everything': 0, 'neither': 0, 'nobody': 0, 'none': 0, 'no one': 0,
            'nothing': 0, 'one': 0, 'somebody': 0, 'someone': 0, 'something': 0, 'both': 0, 
            'few': 0, 'many': 0, 'several': 0, 'all': 0, 'any': 0, 'most': 0, 'some': 0,
            
            // Reciprocal pronouns
            'each other': 0, 'one another': 0,
            
            // Archaic pronouns
            'thou': 0, 'thee': 0, 'thy': 0, 'thine': 0, 'thyself': 0, 'ye': 0
        };
        
        // Count occurrences of each pronoun
        words.forEach(word => {
            if (pronouns.hasOwnProperty(word)) {
                pronouns[word]++;
            }
        });
        
        // Display results
        displayResults('pronounsResults', pronouns);
    }
    
    function analyzePrepositions(words) {
        const prepositions = {
            'about': 0, 'above': 0, 'across': 0, 'after': 0, 'against': 0, 'along': 0, 'amid': 0, 'amidst': 0,
            'among': 0, 'amongst': 0, 'around': 0, 'as': 0, 'at': 0, 'before': 0, 'behind': 0, 'below': 0,
            'beneath': 0, 'beside': 0, 'besides': 0, 'between': 0, 'beyond': 0, 'but': 0, 'by': 0, 
            'concerning': 0, 'considering': 0, 'despite': 0, 'down': 0, 'during': 0, 'except': 0, 
            'excepting': 0, 'excluding': 0, 'following': 0, 'for': 0, 'from': 0, 'in': 0, 'inside': 0,
            'into': 0, 'like': 0, 'minus': 0, 'near': 0, 'next to': 0, 'of': 0, 'off': 0, 'on': 0,
            'onto': 0, 'opposite': 0, 'out': 0, 'outside': 0, 'over': 0, 'past': 0, 'per': 0, 'plus': 0,
            'regarding': 0, 'round': 0, 'save': 0, 'since': 0, 'than': 0, 'through': 0, 'throughout': 0,
            'till': 0, 'to': 0, 'toward': 0, 'towards': 0, 'under': 0, 'underneath': 0, 'unlike': 0,
            'until': 0, 'up': 0, 'upon': 0, 'versus': 0, 'via': 0, 'with': 0, 'within': 0, 'without': 0,
            
            // Common compound prepositions
            'according to': 0, 'ahead of': 0, 'apart from': 0, 'aside from': 0, 'because of': 0,
            'close to': 0, 'due to': 0, 'except for': 0, 'far from': 0, 'in addition to': 0,
            'in front of': 0, 'in spite of': 0, 'instead of': 0, 'next to': 0, 'out of': 0,
            'prior to': 0, 'with regard to': 0, 'with respect to': 0
        };
        
        // Count occurrences of each preposition
        words.forEach(word => {
            if (prepositions.hasOwnProperty(word)) {
                prepositions[word]++;
            }
        });
        
        // Check for compound prepositions in original text
        const text = words.join(' ');
        Object.keys(prepositions).forEach(prep => {
            if (prep.includes(' ')) {
                // Count compound prepositions
                const regex = new RegExp('\\b' + prep + '\\b', 'gi');
                const matches = text.match(regex);
                if (matches) {
                    prepositions[prep] = matches.length;
                }
            }
        });
        
        // Display results
        displayResults('prepositionsResults', prepositions);
    }
    
    function analyzeArticles(words) {
        const articles = {
            // Definite article
            // 'the': 0,
            
            // Indefinite articles
            'a': 0,
            'an': 0,
            
           
        };
        
        // Count occurrences of each article
        words.forEach(word => {
            if (articles.hasOwnProperty(word)) {
                articles[word]++;
            }
        });
        
        // Display results
        displayResults('articlesResults', articles);
    }
    
    function displayResults(containerId, countObject) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        // Filter out items with zero count and sort by count (descending)
        const sortedItems = Object.entries(countObject)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1]);
        
        if (sortedItems.length === 0) {
            // Fix the layout by using a div with appropriate styling instead of a paragraph
            container.innerHTML = '<div class="no-results">No items found in the text.</div>';
            return;
        }
        
        // Add result items to the container
        sortedItems.forEach(([word, count]) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'result-item';
            itemElement.innerHTML = `
                <span class="result-word">${word}</span>
                <span class="result-count">${count}</span>
            `;
            container.appendChild(itemElement);
        });
    }

    // Rick Roll Easter Egg - improved version
    const rickRollTrigger = document.querySelector('.rick-roll-trigger');
    
    if (rickRollTrigger) {
        
        rickRollTrigger.addEventListener('click', function(e) {
            
            // Create audio element with Bazinga sound
            const bazingaSound = new Audio('https://www.myinstants.com/media/sounds/bazinga.mp3');
            
            // Set volume and play options
            bazingaSound.volume = 0.8;
            bazingaSound.preload = 'auto';
            
            // Play the sound with user interaction handling
            const playPromise = bazingaSound.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    
                    // After sound completes (about 1 second), redirect to Rick Roll
                    setTimeout(() => {
                        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                    }, 1000);
                }).catch(error => {
                    
                    // If sound fails to play, still redirect
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                });
            } else {
                // Fallback for browsers where play() doesn't return a promise
                setTimeout(() => {
                    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                }, 1000);
            }
        });
    } else {
        console.warn('Rick Roll trigger element not found!');
    }

    // Contact form submission handler for Google Forms
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Prevent the default form submission
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Log the data to console (for testing)
            console.log('Form submission:', { name, email, subject, message });
            
            // Create a hidden iframe to target the form submission
            const iframe = document.createElement('iframe');
            iframe.name = 'hidden-form';
            iframe.id = 'hidden-form-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            // Change the Google Form URL from viewform to formResponse
            let googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdUfs2JtwnHZGHROueBE1lUK2EEjqiVVuZ8NDX4Wbakhmshsg/formResponse';
            
            // Create a form to submit within the iframe
            const hiddenForm = document.createElement('form');
            hiddenForm.setAttribute('action', googleFormUrl);
            hiddenForm.setAttribute('method', 'post');
            hiddenForm.setAttribute('target', 'hidden-form'); // Target the iframe
            
            // Create input fields for each form field
            const nameInput = document.createElement('input');
            nameInput.setAttribute('name', 'entry.716235625');
            nameInput.setAttribute('value', name);
            hiddenForm.appendChild(nameInput);
            
            const emailInput = document.createElement('input');
            emailInput.setAttribute('name', 'entry.1839292105');
            emailInput.setAttribute('value', email);
            hiddenForm.appendChild(emailInput);
            
            const subjectInput = document.createElement('input');
            subjectInput.setAttribute('name', 'entry.1081247999');
            subjectInput.setAttribute('value', subject);
            hiddenForm.appendChild(subjectInput);
            
            const messageInput = document.createElement('input');
            messageInput.setAttribute('name', 'entry.660518647');
            messageInput.setAttribute('value', message);
            hiddenForm.appendChild(messageInput);
            
            document.body.appendChild(hiddenForm);
            
            // Show success message immediately - don't wait for Google's response
            const formContainer = contactForm.parentElement;
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out, ${name}. I'll get back to you soon.</p>
                <button class="btn btn-reset">Send another message</button>
            `;
            
            // Hide the form and show success message
            contactForm.style.display = 'none';
            formContainer.appendChild(successMessage);
            
            // Submit the form to the hidden iframe
            hiddenForm.submit();
            
            // Remove the temporary iframe and form after submission
            setTimeout(() => {
                if (document.body.contains(hiddenForm)) {
                    document.body.removeChild(hiddenForm);
                }
                if (document.body.contains(iframe)) {
                    document.body.removeChild(iframe);
                }
            }, 1000);
            
            // Reset button functionality
            const resetBtn = successMessage.querySelector('.btn-reset');
            resetBtn.addEventListener('click', function() {
                // Reset the form
                contactForm.reset();
                // Show the form again
                contactForm.style.display = 'block';
                // Remove success message
                successMessage.remove();
            });
        });
    }

    // Mobile Navigation Toggle
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create menu toggle button
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `<span></span><span></span><span></span>`;
    navbar.insertBefore(menuToggle, navLinks);
    
    // Add toggle functionality
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
});