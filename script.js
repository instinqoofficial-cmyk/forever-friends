// Scroll Reveal Animations
function startScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
        observer.observe(el);
    });
}

// Preloader & Typing Animation Logic
document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById("start-screen");
    const startBtn = document.getElementById("start-btn");
    const scanningView = document.getElementById("scanning-view");
    const matchFound = document.getElementById("match-found");
    const matchIcon = document.getElementById("match-icon");
    const matchTitle = document.getElementById("match-title");
    const matchName = document.getElementById("match-name");
    const loader = document.getElementById("loader");
    
    if (!loader || !scanningView) {
        startScrollReveal();
        return;
    }

    // Wrap the scanning sequence in a function
    function startScannerSequence() {
        // 1. Show scanning for 2.8 seconds
        setTimeout(() => {
            scanningView.style.display = "none";
            matchFound.style.display = "block";
            
            // Use a tiny timeout to allow display: block to render before starting transitions
            setTimeout(() => {
                if (matchIcon) {
                    matchIcon.style.opacity = "1";
                    matchIcon.style.transform = "scale(1)";
                }
                
                setTimeout(() => {
                    if (matchTitle) {
                        matchTitle.style.opacity = "1";
                        matchTitle.style.transform = "translateY(0)";
                    }
                    
                    setTimeout(() => {
                        if (matchName) {
                            matchName.style.opacity = "1";
                            matchName.style.transform = "translateY(0)";
                        }
                        
                        // Hide loader after reading
                        setTimeout(() => {
                            loader.style.opacity = "0";
                            loader.style.transform = "translateY(-100%)";
                            
                            setTimeout(() => {
                                startScrollReveal();
                            }, 400); 

                            setTimeout(() => {
                                loader.style.display = "none";
                            }, 1000);
                        }, 2200);
                    }, 600); // Delay before name
                }, 400); // Delay before title
            }, 50); 
        }, 2800); // Scanning duration
    }

    // Wait for user to click 'Open' to bypass browser autoplay rules
    if (startBtn && startScreen) {
        startBtn.addEventListener("click", () => {
            startScreen.style.opacity = "0";
            setTimeout(() => {
                startScreen.style.display = "none";
            }, 500);

            // Start the music instantly!
            if (window.playBackgroundMusic) {
                window.playBackgroundMusic();
            }

            // Start the scanning animation
            startScannerSequence();
        });
    } else {
        startScannerSequence(); // Fallback
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        const targetElement = document.getElementById(targetId.substring(1));
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic Music Player Logic
window.playBackgroundMusic = null; 

document.addEventListener("DOMContentLoaded", () => {
    const musicBtn = document.getElementById('music-btn');
    const bgMusic = document.getElementById('bg-music');
    let isPlaying = false;

    // Set the single song source
    let currentSongSrc = 'assets/song.mp3';

    if (musicBtn && bgMusic) {
        
        function toggleMusic() {
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
                musicBtn.classList.remove('playing');
            } else {
                bgMusic.play().then(() => {
                    musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    musicBtn.classList.add('playing');
                }).catch(e => console.log("Audio play failed:", e));
            }
            isPlaying = !isPlaying;
        }

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            toggleMusic();
        });

        // Ensure the single song is loaded
        bgMusic.src = currentSongSrc;

        // Autoplay function (called by envelope loader)
        window.playBackgroundMusic = function() {
            if (!isPlaying) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    musicBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                    musicBtn.classList.add('playing');
                }).catch(e => {
                    console.log("Autoplay blocked by browser. Will play on first click.");
                });
            }
        };

        // Fallback: if browser blocked the initial autoplay, play on tap anywhere
        document.body.addEventListener('click', () => {
            if (!isPlaying && window.playBackgroundMusic) {
                window.playBackgroundMusic();
            }
        }, { once: true });
    }
});

// Final Surprise Animation
document.addEventListener("DOMContentLoaded", () => {
    const finalBtn = document.getElementById('final-surprise-btn');
    const finalOverlay = document.getElementById('final-overlay');
    const typingContainer = document.getElementById('typing-container');

    if (finalBtn && finalOverlay) {
        finalBtn.addEventListener('click', () => {
            finalOverlay.style.display = 'flex';
            setTimeout(() => {
                finalOverlay.style.opacity = '1';
                startFinalTyping();
            }, 50);
        });
    }

    function startFinalTyping() {
        typingContainer.innerHTML = '';
        typingContainer.style.textAlign = 'center';
        
        const sequence = [
            { text: "Loading Memories...", delay: 1200 },
            { text: "", delay: 400, space: true },
            { text: "✓ First Meeting", delay: 1000 },
            { text: "✓ Endless Laughs", delay: 1000 },
            { text: "✓ Random Conversations", delay: 1000 },
            { text: "✓ Unforgettable Moments", delay: 1000 },
            { text: "", delay: 500, space: true },
            { text: "Completed...", delay: 1000 },
            { text: "", delay: 500, space: true },
            { text: "There are countless people in this world...", delay: 1000 },
            { text: "", delay: 500, space: true },
            { text: "But only one Kowsi.", delay: 1000 },
            { text: "", delay: 500, space: true },
            { text: "Thank you for being an amazing friend.", delay: 1500 },
            { html: "<div style='text-align: center; margin-top: 3rem; width: 100%; display: flex; justify-content: center; align-items: center;'><span style='font-size: clamp(1.8rem, 6vw, 3rem); color: var(--accent-purple); font-family: var(--font-heading); text-shadow: 0 0 15px rgba(162,117,227,0.3); white-space: nowrap;'>🌸 Happy Friendship Day! 🌸</span></div>", delay: 800, action: "hearts" }
        ];

        let i = 0;
        
        function processNext() {
            if (i < sequence.length) {
                let step = sequence[i];
                let lineDiv = document.createElement('div');
                lineDiv.style.marginBottom = step.space ? "2rem" : "0.5rem";
                
                if (step.text !== undefined && !step.space) {
                    lineDiv.style.fontFamily = "'Caveat', cursive";
                    lineDiv.style.fontSize = "clamp(1.6rem, 5vw, 2.4rem)";
                    lineDiv.style.color = "#555";
                    
                    let charIdx = 0;
                    
                    function typeChar() {
                        if (charIdx < step.text.length) {
                            lineDiv.innerHTML = step.text.substring(0, charIdx + 1) + "<span class='pen-cursor'>🖋️</span>";
                            charIdx++;
                            // Add a random delay between 40-90ms to simulate realistic human handwriting speed
                            let charDelay = Math.random() * 50 + 40;
                            setTimeout(typeChar, charDelay);
                        } else {
                            // Writing finished for this line, remove the pen
                            lineDiv.innerHTML = step.text;
                            i++;
                            setTimeout(processNext, step.delay);
                        }
                    }
                    typeChar();
                    
                } else if (step.html) {
                    lineDiv.innerHTML = step.html;
                    lineDiv.style.opacity = '0';
                    lineDiv.style.transform = 'translateY(15px) scale(0.95)';
                    lineDiv.style.transition = 'all 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    
                    // Trigger reflow
                    void lineDiv.offsetWidth;
                    lineDiv.style.opacity = '1';
                    lineDiv.style.transform = 'translateY(0) scale(1)';
                    
                    if (step.action === "hearts") {
                        createFloatingHearts();
                    }

                    i++;
                    setTimeout(processNext, step.delay);
                }
                
                typingContainer.appendChild(lineDiv);
                finalOverlay.scrollTo({ top: finalOverlay.scrollHeight, behavior: 'smooth' });

                if (step.space) {
                    i++;
                    setTimeout(processNext, step.delay);
                    return;
                }
            } else {
                setTimeout(() => {
                    let closeDiv = document.createElement('div');
                    closeDiv.style.textAlign = 'center';
                    closeDiv.style.marginTop = '3rem';
                    let closeBtn = document.createElement('button');
                    closeBtn.className = 'btn btn-purple';
                    closeBtn.innerHTML = 'Close';
                    closeBtn.style.opacity = '0';
                    closeBtn.style.transition = 'opacity 1s ease';
                    closeBtn.onclick = () => {
                        finalOverlay.style.opacity = '0';
                        setTimeout(() => { finalOverlay.style.display = 'none'; typingContainer.innerHTML = ''; }, 500);
                    };
                    closeDiv.appendChild(closeBtn);
                    typingContainer.appendChild(closeDiv);
                    
                    void closeBtn.offsetWidth;
                    closeBtn.style.opacity = '1';
                    finalOverlay.scrollTo({ top: finalOverlay.scrollHeight, behavior: 'smooth' });
                }, 1000);
            }
        }
        
        function createFloatingHearts() {
            const emojis = ['💖', '🌸', '✨', '💕'];
            for (let j = 0; j < 40; j++) {
                let heart = document.createElement('div');
                heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
                heart.style.position = 'absolute';
                heart.style.left = Math.random() * 100 + 'vw';
                heart.style.top = '100vh';
                heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
                heart.style.opacity = Math.random() * 0.8 + 0.2;
                heart.style.zIndex = '10001';
                heart.style.pointerEvents = 'none';
                heart.style.transition = `transform ${Math.random() * 3 + 2}s linear, opacity ${Math.random() * 3 + 2}s ease-out`;
                
                finalOverlay.appendChild(heart);
                
                setTimeout(() => {
                    heart.style.transform = `translateY(-120vh) rotate(${Math.random() * 360}deg)`;
                    heart.style.opacity = '0';
                }, 50);
                
                setTimeout(() => {
                    heart.remove();
                }, 5000);
            }
        }

        processNext();
    }
});
