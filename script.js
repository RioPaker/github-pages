// Cookie Consent
document.addEventListener('DOMContentLoaded', function() {
    // Check if user has already made a choice or visited before
    const hasVisited = sessionStorage.getItem('hasVisited') || localStorage.getItem('cookieConsent');

    if (!hasVisited) {
        // First visit - show the cookie consent banner with animation
        setTimeout(() => {
            const cookieConsent = document.querySelector('.cookie-consent');
            cookieConsent.classList.add('show');
        }, 1000);

        // Mark that user has visited the site in this session
        sessionStorage.setItem('hasVisited', 'true');
    }

    // Accept cookies button
    document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        document.querySelector('.cookie-consent').classList.remove('show');

        // Show a confirmation message
        const confirmationMsg = document.createElement('div');
        confirmationMsg.style.position = 'fixed';
        confirmationMsg.style.bottom = '20px';
        confirmationMsg.style.left = '50%';
        confirmationMsg.style.transform = 'translateX(-50%)';
        confirmationMsg.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
        confirmationMsg.style.color = 'white';
        confirmationMsg.style.padding = '12px 25px';
        confirmationMsg.style.borderRadius = '30px';
        confirmationMsg.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        confirmationMsg.style.zIndex = '9998';
        confirmationMsg.innerHTML = '<i class="fas fa-check" style="margin-right: 8px;"></i> Cookies accepted!';

        document.body.appendChild(confirmationMsg);

        setTimeout(() => {
            confirmationMsg.style.opacity = '0';
            confirmationMsg.style.transition = 'opacity 0.5s ease';
            setTimeout(() => confirmationMsg.remove(), 500);
        }, 3000);
    });

    // Decline cookies button
    document.getElementById('decline-cookies').addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'declined');
        document.querySelector('.cookie-consent').classList.remove('show');

        // Show a confirmation message
        const confirmationMsg = document.createElement('div');
        confirmationMsg.style.position = 'fixed';
        confirmationMsg.style.bottom = '20px';
        confirmationMsg.style.left = '50%';
        confirmationMsg.style.transform = 'translateX(-50%)';
        confirmationMsg.style.background = 'rgba(255, 255, 255, 0.1)';
        confirmationMsg.style.color = 'white';
        confirmationMsg.style.padding = '12px 25px';
        confirmationMsg.style.borderRadius = '30px';
        confirmationMsg.style.backdropFilter = 'blur(10px)';
        confirmationMsg.style.border = '1px solid rgba(255, 255, 255, 0.2)';
        confirmationMsg.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        confirmationMsg.style.zIndex = '9998';
        confirmationMsg.innerHTML = '<i class="fas fa-ban" style="margin-right: 8px;"></i> Cookies declined!';

        document.body.appendChild(confirmationMsg);

        setTimeout(() => {
            confirmationMsg.style.opacity = '0';
            confirmationMsg.style.transition = 'opacity 0.5s ease';
            setTimeout(() => confirmationMsg.remove(), 500);
        }, 3000);
    });
});

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

// Number counter animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let value = Math.floor(progress * (end - start) + start);
        if (end.toString().includes('+')) {
            value = value + '+';
        }
        obj.innerHTML = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize counter for hero stats
const initCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let hasAnimated = false;

    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Function to handle scroll events
    const handleScroll = () => {
        if (hasAnimated) return;

        const heroSection = document.querySelector('.hero');
        if (isInViewport(heroSection)) {
            statNumbers.forEach(stat => {
                let endValue = parseInt(stat.textContent.replace(/\D/g, ''));
                let hasPlus = stat.textContent.includes('+');
                animateValue(stat, 0, hasPlus ? endValue : endValue, 2000);
            });
            hasAnimated = true;
            window.removeEventListener('scroll', handleScroll);
        }
    };

    // Add initial animation on page load
    setTimeout(() => {
        handleScroll();
    }, 500);

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);

    // Add hover effects for stats
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('h3').style.transform = 'scale(1.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('h3').style.transform = 'scale(1)';
        });
    });
};

// Call counter initialization on DOM load
document.addEventListener('DOMContentLoaded', initCounters);

// Cursor effects on hoverable elements
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '50px';
        cursor.style.height = '50px';
        cursorDot.style.width = '8px';
        cursorDot.style.height = '8px';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorDot.style.width = '5px';
        cursorDot.style.height = '5px';
    });
});

// Enhanced header scroll effect with intersection observer
const headerScrollObserver = new IntersectionObserver(
    (entries) => {
        const header = document.querySelector('header');
        if (!entries[0].isIntersecting) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    },
    { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
);

// Observe the top of the page
const topObserverTarget = document.querySelector('.hero');
if (topObserverTarget) {
    headerScrollObserver.observe(topObserverTarget);
}

// Highlight active nav item based on scroll position
const sections = document.querySelectorAll('section[id]');
const navHighlightObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    },
    { threshold: 0.5 }
);

sections.forEach(section => {
    navHighlightObserver.observe(section);
});

// Enhanced mobile menu toggle with animations
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const socialLinks = document.querySelector('.social-links');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');

    if (!navLinks.classList.contains('active')) {
        // Opening menu
        navLinks.style.display = 'flex';
        socialLinks.style.display = 'flex';

        // Trigger reflow
        navLinks.offsetHeight;
        socialLinks.offsetHeight;

        navLinks.classList.add('active');
        socialLinks.classList.add('active');
    } else {
        // Closing menu
        navLinks.classList.remove('active');
        socialLinks.classList.remove('active');

        // Hide after animation completes
        setTimeout(() => {
            if (!navLinks.classList.contains('active')) {
                navLinks.style.display = '';
                socialLinks.style.display = '';
            }
        }, 400);
    }
});

// Add hover animations for nav items
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';

        // Add ripple effect to other links
        const siblings = Array.from(document.querySelectorAll('.nav-links a')).filter(item => item !== this);
        siblings.forEach((sibling, index) => {
            setTimeout(() => {
                sibling.style.transform = 'translateY(-2px)';
                setTimeout(() => {
                    sibling.style.transform = '';
                }, 200);
            }, index * 50);
        });
    });

    link.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add hover and click effects for social links and email links
document.querySelectorAll('.social-links a, a[href^="mailto:"]').forEach(link => {
    link.addEventListener('mouseenter', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.add('fa-beat');
            setTimeout(() => {
                icon.classList.remove('fa-beat');
            }, 800);
        }
    });

    // Add click animation
    link.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bounce');
            setTimeout(() => {
                icon.classList.remove('fa-bounce');
            }, 800);
        }

        // Create ripple effect on click
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        ripple.style.left = '0';
        ripple.style.top = '0';
        ripple.style.setProperty('--size', `${Math.max(rect.width, rect.height) * 2}px`);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    // Make social links open in a new window
    link.target = "_blank";
    link.rel = "noopener noreferrer";
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate skills on scroll
const animateSkills = () => {
    const skills = document.querySelectorAll('.skill-bar span');
    skills.forEach((skill, index) => {
        const targetWidth = skill.style.width;
        skill.style.width = '0';
        setTimeout(() => {
            skill.style.width = targetWidth;
        }, 100 + (index * 150)); // Staggered animation
    });
};

// Add animated elements for About section
const animateAboutSection = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animated');
                }, 150 * index);
            });
        }
    });
};

// Intersection Observer for skill animation
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(skillsSection);
}

// Observer for about section animations
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    // Add animation classes to elements
    const animatedElements = aboutSection.querySelectorAll('.about-image, .experience-badge, .about-text h2, .highlight-text, .about-text p, .skills, .about-cta');
    animatedElements.forEach(el => el.classList.add('animate-on-scroll'));

    const aboutObserver = new IntersectionObserver(animateAboutSection, {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    });

    aboutObserver.observe(aboutSection);

    // Add hover effect to skill items
    const skillItems = aboutSection.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            icon.classList.add('fa-bounce');
            setTimeout(() => {
                icon.classList.remove('fa-bounce');
            }, 1000);
        });
    });
}

// Enhanced Testimonials slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');

    if (testimonialTrack && testimonialCards.length > 0) {
        let currentSlide = 0;
        const maxSlide = testimonialCards.length - 1;
        let isAnimating = false;
        let autoSlideInterval;
        const slideDelay = 4000; // Time between auto slides (ms)
        const animationDuration = 800; // Duration of slide transition (ms)

        // Initialize the slider on load
        function initSlider() {
            console.log("Initializing testimonial slider with", testimonialCards.length, "slides");

            // Set the width of the track based on the number of cards
            testimonialTrack.style.width = `${testimonialCards.length * 100}%`;

            // Position each card
            testimonialCards.forEach((card, index) => {
                card.style.width = `${100 / testimonialCards.length}%`;
                card.setAttribute('data-index', index);

                // Clear any existing inline styles that might interfere
                card.style.position = "relative";
                card.style.display = "block";
                card.style.float = "left";

                // Set initial opacity and transform
                card.style.opacity = index === 0 ? '1' : '0.4';
                card.style.transform = index === 0 ? 'scale(1)' : 'scale(0.9)';

                // Force all content to be visible
                const content = card.querySelector('.testimonial-content');
                const clientInfo = card.querySelector('.client-info');
                if (content) content.style.opacity = '1';
                if (clientInfo) clientInfo.style.opacity = '1';

                // Ensure all inner elements are visible too
                card.querySelectorAll('p, h4, .client-rating, .quote-icon, .client-image').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });

                // Mark all content elements for animation
                const animateElements = card.querySelectorAll('.testimonial-content p, .client-rating, .client-info, .quote-icon');
                animateElements.forEach(el => {
                    el.classList.add('animate-on-active');
                });

                // Initially activate the first slide content
                if (index === 0) {
                    card.classList.add('active');
                    animateElements.forEach(el => {
                        el.classList.add('animated');
                    });
                }
            });

            // Set the first dot as active
            if (dots.length > 0) {
                dots[0].classList.add('active');
            }

            // Add visual indicator for auto-sliding
            const navContainer = document.querySelector('.testimonial-navigation');
            if (navContainer) {
                // Remove any existing progress indicators
                const existingIndicator = navContainer.querySelector('.slider-progress');
                if (existingIndicator) existingIndicator.remove();

                // Add new progress indicator
                const sliderIndicator = document.createElement('div');
                sliderIndicator.className = 'slider-progress';
                navContainer.appendChild(sliderIndicator);
            }

            // Preload all testimonial images for smooth transitions
            testimonialCards.forEach(card => {
                const img = card.querySelector('.client-image img');
                if (img) {
                    // Force image to load and be visible
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                    img.style.display = 'block';

                    const preloadImg = new Image();
                    preloadImg.src = img.src;
                }
            });

            // Force immediate activation of first slide
            activateSlide(0);

            // Force proper positioning of track
            testimonialTrack.style.transform = 'translateX(0%)';

            // Start auto-slide after a short delay
            setTimeout(() => {
                startAutoSlide();
            }, 1000);
        }

        // Function to specifically activate slide content
        function activateSlide(index) {
            const card = testimonialCards[index];
            if (!card) {
                console.error("No card found at index", index);
                return;
            }

            console.log("Activating slide", index);

            // Clear active state from all cards
            testimonialCards.forEach(c => {
                c.classList.remove('active');
                c.style.opacity = '0.4';
                c.style.transform = 'scale(0.9)';

                // Reset animations for inactive cards
                const elements = c.querySelectorAll('.animate-on-active');
                elements.forEach(el => {
                    el.classList.remove('animated');
                });
            });

            // Set active state on current card
            card.classList.add('active');
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';

            // Force card content to be fully visible
            const content = card.querySelector('.testimonial-content');
            const clientInfo = card.querySelector('.client-info');
            const rating = card.querySelector('.client-rating');

            if (content) content.style.opacity = '1';
            if (clientInfo) clientInfo.style.opacity = '1';
            if (rating) rating.style.opacity = '1';

            // Animate all elements inside card
            const elements = card.querySelectorAll('.animate-on-active');
            elements.forEach((el, i) => {
                // Force reset any transform or opacity
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transitionDelay = `${i * 50}ms`;
                el.classList.add('animated');
            });

            // Update dots
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        // Function to go to a specific slide with enhanced transitions
        function goToSlide(slideIndex, isAuto = false) {
            if (isAnimating) return;
            isAnimating = true;

            // Handle wrapping
            if (slideIndex < 0) {
                slideIndex = maxSlide;
            } else if (slideIndex > maxSlide) {
                slideIndex = 0;
            }

            console.log("Going to slide", slideIndex, "out of", maxSlide);

            // Update current slide
            currentSlide = slideIndex;

            // Add transition class to track
            testimonialTrack.classList.add('transitioning');

            // Move track with smooth transition - make sure this works correctly
            testimonialTrack.style.transform = `translateX(-${currentSlide * (100 / testimonialCards.length)}%)`;

            // Update active states and apply visual effects
            testimonialCards.forEach((card, index) => {
                const isActive = index === currentSlide;

                // Reset any existing animations
                card.style.transition = `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;

                // Update visual state
                card.classList.toggle('active', isActive);
                card.style.opacity = isActive ? '1' : '0.4';
                card.style.transform = isActive ? 'scale(1)' : 'scale(0.9)';

                // Add entrance animations for the active card
                if (isActive) {
                    // Pause and then animate elements inside the card
                    setTimeout(() => {
                        const elements = card.querySelectorAll('.animate-on-active');
                        elements.forEach((el, i) => {
                            // Force reset any transform or opacity
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                            el.style.transitionDelay = `${i * 50}ms`;
                            el.classList.add('animated');
                        });
                    }, 300);
                } else {
                    // Reset animations for inactive cards
                    const elements = card.querySelectorAll('.animate-on-active');
                    elements.forEach(el => {
                        el.style.transitionDelay = '0ms';
                        el.classList.remove('animated');
                    });
                }
            });

            // Update active dot with animation
            dots.forEach((dot, index) => {
                const wasActive = dot.classList.contains('active');
                const shouldBeActive = index === currentSlide;

                if (wasActive && !shouldBeActive) {
                    // Animate out
                    dot.classList.add('deactivating');
                    setTimeout(() => {
                        dot.classList.remove('active', 'deactivating');
                    }, 300);
                } else if (!wasActive && shouldBeActive) {
                    // Animate in
                    dot.classList.add('active', 'activating');
                    setTimeout(() => {
                        dot.classList.remove('activating');
                    }, 300);
                }
            });

            // Reset the auto-slide progress indicator
            if (isAuto) {
                updateProgressIndicator(0);
            } else {
                const indicator = document.querySelector('.slider-progress');
                if (indicator) {
                    indicator.style.width = '0%';
                    indicator.style.transition = 'none';
                    setTimeout(() => {
                        indicator.style.transition = '';
                    }, 50);
                }
            }

            // Allow next animation after this one completes
            setTimeout(() => {
                isAnimating = false;
                testimonialTrack.classList.remove('transitioning');

                // If this was triggered manually, restart auto-slide
                if (!isAuto) {
                    restartAutoSlide();
                }
            }, animationDuration);
        }

        // Progress indicator for auto-slide
        function updateProgressIndicator(percent) {
            const indicator = document.querySelector('.slider-progress');
            if (indicator) {
                indicator.style.width = `${percent}%`;
            }
        }

        // Start auto-slide with progress indication
        function startAutoSlide() {
            console.log("Starting auto-slide for testimonials");

            // Clear any existing interval
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                cancelAnimationFrame(autoSlideInterval);
            }

            // Reset progress indicator
            updateProgressIndicator(0);

            // Use interval for reliable timing instead of requestAnimationFrame
            let progress = 0;
            const progressStep = 100 / (slideDelay / 100); // Update every 100ms

            function updateProgress() {
                progress += progressStep;
                if (progress >= 100) {
                    progress = 0;
                    goToSlide(currentSlide + 1, true);
                }
                updateProgressIndicator(progress);
            }

            // Start the interval
            autoSlideInterval = setInterval(updateProgress, 100);

            return autoSlideInterval;
        }

        // Restart auto-slide after user interaction
        function restartAutoSlide() {
            // Cancel any existing auto-slide
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                cancelAnimationFrame(autoSlideInterval);
            }

            // Start a new auto-slide
            autoSlideInterval = startAutoSlide();
        }

        // Next button click with ripple effect
        nextBtn.addEventListener('click', (e) => {
            // Add ripple effect
            addButtonRipple(e, nextBtn);

            // Go to next slide
            goToSlide(currentSlide + 1);
        });

        // Previous button click with ripple effect
        prevBtn.addEventListener('click', (e) => {
            // Add ripple effect
            addButtonRipple(e, prevBtn);

            // Go to previous slide
            goToSlide(currentSlide - 1);
        });

        // Add ripple effect to navigation buttons
        function addButtonRipple(e, button) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('nav-btn-ripple');
            button.appendChild(ripple);

            // Position ripple
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }

        // Dot click events with visual feedback
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Skip if already on this slide
                if (index === currentSlide) return;

                // Ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('dot-ripple');
                dot.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 500);

                // Go to selected slide
                goToSlide(index);
            });
        });

        // Pause auto slide on user interaction
        testimonialTrack.addEventListener('mouseenter', () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;

                // Pause the progress indicator animation
                const indicator = document.querySelector('.slider-progress');
                if (indicator) {
                    indicator.style.transition = 'none';
                }
            }
        });

        // Resume auto slide when mouse leaves
        testimonialTrack.addEventListener('mouseleave', () => {
            if (!autoSlideInterval) {
                autoSlideInterval = startAutoSlide();
            }
        });

        // Enhanced touch events for mobile swipe with visual feedback
        let touchStartX = 0;
        let touchStartY = 0;
        let touchMoveX = 0;
        let touchEndX = 0;
        let isSwiping = false;
        let swipeOverlay;

        testimonialTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;

            // Create swipe overlay for visual feedback
            swipeOverlay = document.createElement('div');
            swipeOverlay.className = 'swipe-overlay';
            testimonialTrack.appendChild(swipeOverlay);

            // Pause auto-sliding during touch
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }

            isSwiping = true;
        });

        testimonialTrack.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;

            touchMoveX = e.changedTouches[0].screenX;
            const diffX = touchMoveX - touchStartX;
            const diffY = e.changedTouches[0].screenY - touchStartY;

            // Only handle horizontal swipes (prevent vertical scrolling interference)
            if (Math.abs(diffX) > Math.abs(diffY)) {
                e.preventDefault();

                // Calculate swipe percentage and direction
                const swipePercent = Math.min(Math.abs(diffX) / (window.innerWidth / 2), 0.3);
                const direction = diffX > 0 ? 'right' : 'left';

                // Update swipe overlay to show direction
                if (swipeOverlay) {
                    swipeOverlay.style.opacity = swipePercent;
                    swipeOverlay.innerHTML = `<i class="fas fa-chevron-${direction === 'right' ? 'left' : 'right'}"></i>`;
                }

                // Slight movement of the track for visual feedback
                testimonialTrack.style.transform = `translateX(calc(-${currentSlide * (100 / testimonialCards.length)}% + ${diffX / 10}px))`;
            }
        });

        testimonialTrack.addEventListener('touchend', (e) => {
            if (!isSwiping) return;

            touchEndX = e.changedTouches[0].screenX;

            // Reset track position
            testimonialTrack.style.transform = `translateX(-${currentSlide * (100 / testimonialCards.length)}%)`;

            // Remove swipe overlay
            if (swipeOverlay) {
                swipeOverlay.remove();
                swipeOverlay = null;
            }

            handleSwipe();
            isSwiping = false;

            // Restart auto-sliding
            restartAutoSlide();
        });

        function handleSwipe() {
            // Minimum distance for swipe gesture
            const minSwipeDistance = 50;
            const diffX = touchEndX - touchStartX;

            if (Math.abs(diffX) >= minSwipeDistance) {
                if (diffX < 0) {
                    // Swiped left, go to next slide
                    goToSlide(currentSlide + 1);
                } else {
                    // Swiped right, go to previous slide
                    goToSlide(currentSlide - 1);
                }
            }
        }

        // Check and fix any broken testimonial images
        function checkTestimonialImages() {
            testimonialCards.forEach(card => {
                const img = card.querySelector('.client-image img');
                if (img) {
                    // Verify image is loading properly
                    img.onerror = function() {
                        // Use a fallback image if current one fails
                        this.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80';
                        console.log('Fixed broken testimonial image');
                    };

                    // Force image check
                    const currentSrc = img.src;
                    if (!img.complete || img.naturalWidth === 0) {
                        img.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80';
                    }

                    // Ensure the image is visible
                    img.style.opacity = '1';
                    img.style.visibility = 'visible';
                    img.style.display = 'block';
                }

                // Make sure all text content is visible
                card.querySelectorAll('p, h4').forEach(el => {
                    el.style.opacity = '1';
                    el.style.visibility = 'visible';
                });
            });
        }

        // Add additional animation classes to testimonial elements
        testimonialCards.forEach(card => {
            // Mark elements to animate when card becomes active
            card.querySelectorAll('.testimonial-content p, .client-info h4, .client-details p, .client-rating, .quote-icon').forEach(el => {
                el.classList.add('animate-on-active');
                // Ensure elements are visible
                el.style.opacity = '1';
                el.style.visibility = 'visible';
            });

            // Make sure all client images and content are visible
            const clientImg = card.querySelector('.client-image img');
            if (clientImg) {
                clientImg.style.opacity = '1';
                clientImg.style.visibility = 'visible';
            }

            // Enhanced hover effects
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'scale(0.95)';
                    this.style.opacity = '0.7';
                }

                const quoteIcon = this.querySelector('.quote-icon i');
                const clientImage = this.querySelector('.client-image');

                if (quoteIcon) {
                    quoteIcon.classList.add('fa-beat');
                    setTimeout(() => {
                        quoteIcon.classList.remove('fa-beat');
                    }, 1000);
                }

                if (clientImage) {
                    clientImage.style.transform = 'scale(1.1) rotate(5deg)';
                    clientImage.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'scale(0.9)';
                    this.style.opacity = '0.4';
                }

                const clientImage = this.querySelector('.client-image');
                if (clientImage) {
                    clientImage.style.transform = '';
                    clientImage.style.boxShadow = '';
                }
            });

            // Add subtle parallax effect on mouse move
            card.addEventListener('mousemove', function(e) {
                if (!this.classList.contains('active')) return;

                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const moveX = (x - centerX) / 30;
                const moveY = (y - centerY) / 30;

                this.style.transform = `scale(1) translate(${moveX}px, ${moveY}px)`;

                // Opposite movement for quote icon (enhanced depth effect)
                const quoteIcon = this.querySelector('.quote-icon');

                // Verify all email links are working correctly
                document.addEventListener('DOMContentLoaded', function() {
                    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

                    emailLinks.forEach(link => {
                        // Make sure the mailto link is properly formatted
                        const mailtoHref = link.getAttribute('href');
                        if (!mailtoHref.includes('?')) {
                            // Add subject parameter if missing
                            link.setAttribute('href', `${mailtoHref}?subject=Website%20Inquiry`);
                        }

                        // Add click tracking for email links
                        link.addEventListener('click', function(e) {
                            console.log('Email link clicked:', this.href);

                            // Create a visual feedback for the user
                            const feedbackEl = document.createElement('div');
                            feedbackEl.textContent = 'Opening email client...';
                            feedbackEl.style.position = 'fixed';
                            feedbackEl.style.bottom = '20px';
                            feedbackEl.style.left = '50%';
                            feedbackEl.style.transform = 'translateX(-50%)';
                            feedbackEl.style.background = 'var(--primary)';
                            feedbackEl.style.color = 'white';
                            feedbackEl.style.padding = '10px 20px';
                            feedbackEl.style.borderRadius = '30px';
                            feedbackEl.style.zIndex = '9999';
                            feedbackEl.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                            feedbackEl.style.transition = 'opacity 0.3s ease';

                            document.body.appendChild(feedbackEl);

                            setTimeout(() => {
                                feedbackEl.style.opacity = '0';
                                setTimeout(() => {
                                    feedbackEl.remove();
                                }, 300);
                            }, 2000);
                        });
                    });
                });

                if (quoteIcon) {
                    quoteIcon.style.transform = `translate(${-moveX * 2}px, ${-moveY * 2}px)`;
                }
            });

            // Reset parallax on mouse leave
            card.addEventListener('mouseleave', function() {
                if (this.classList.contains('active')) {
                    this.style.transform = 'scale(1)';

                    const quoteIcon = this.querySelector('.quote-icon');
                    if (quoteIcon) {
                        quoteIcon.style.transform = '';
                    }
                }
            });
        });

        // Initialize the slider
        initSlider();

        // Force immediate checks
        checkTestimonialImages();

        // Ensure first slide is properly activated
        setTimeout(() => {
            activateSlide(0);
            goToSlide(0, true);
        }, 200);

        // Additional check to make sure everything is working
        setTimeout(() => {
            // If somehow no slide is active, force first slide again
            if (!document.querySelector('.testimonial-card.active')) {
                console.log('Fixing testimonial slider - no active slide found');
                activateSlide(0);
                goToSlide(0, true);
            }

            // Check all client images again
            checkTestimonialImages();

            // Force testimonial track position
            testimonialTrack.style.transform = `translateX(-${currentSlide * (100 / testimonialCards.length)}%)`;
        }, 1000);

        // Final check after everything should be fully loaded
        setTimeout(() => {
            console.log("Final testimonial check");
            checkTestimonialImages();
            activateSlide(currentSlide);
        }, 3000);
    }
});

// Enhanced services section
document.addEventListener('DOMContentLoaded', () => {
    const servicesSlider = document.querySelector('.services-slider');
    const serviceCards = document.querySelectorAll('.service-card');

    if (servicesSlider) {
        // Pause animation on hover
        servicesSlider.addEventListener('mouseenter', () => {
            servicesSlider.style.animationPlayState = 'paused';
        });

        servicesSlider.addEventListener('mouseleave', () => {
            servicesSlider.style.animationPlayState = 'running';
        });

        // Add hover interactions for each service card
        serviceCards.forEach(card => {
            const icon = card.querySelector('i');

            // Add subtle icon animation on hover
            card.addEventListener('mouseenter', () => {
                icon.classList.add('fa-bounce');
                setTimeout(() => {
                    icon.classList.remove('fa-bounce');
                }, 1000);
            });

            // Make cards clickable
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                // You could add a modal or redirect to a service details page here
                const serviceName = card.querySelector('h3').textContent;
                console.log(`Service clicked: ${serviceName}`);
            });
        });
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 700) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });

        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Footer animations and effects
    const footerAnimateElements = () => {
        // Staggered animation for footer links
        const footerLinks = document.querySelectorAll('.footer-links a');
        footerLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(20px)';
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 * index);
        });

        // Add animation to footer social icons and make them open in new windows
        const socialLinks = document.querySelectorAll('.footer-social .social-links a');
        socialLinks.forEach((link, index) => {
            // Ensure all social links open in new window
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');

            link.style.opacity = '0';
            link.style.transform = 'scale(0.5)';
            setTimeout(() => {
                link.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                link.style.opacity = '1';
                link.style.transform = 'scale(1)';
            }, 100 * index);
        });
    };

    // Handle newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            const originalButtonHtml = button.innerHTML;

            // Disable input and button during submission
            input.disabled = true;
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success state
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.background = 'linear-gradient(45deg, #00c853, #64dd17)';

                // Create success message
                const successMessage = document.createElement('div');
                successMessage.style.fontSize = '14px';
                successMessage.style.marginTop = '10px';
                successMessage.style.color = '#00c853';
                successMessage.innerHTML = 'Thank you for subscribing!';
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.3s ease';

                // Insert success message
                newsletterForm.parentNode.appendChild(successMessage);

                // Show message with fade in
                setTimeout(() => {
                    successMessage.style.opacity = '1';
                }, 100);

                // Reset form after delay
                setTimeout(() => {
                    input.value = '';
                    input.disabled = false;
                    button.disabled = false;
                    button.innerHTML = originalButtonHtml;
                    button.style.background = '';

                    // Fade out success message
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 300);
                }, 3000);
            }, 1500);
        });
    }

    // Initialize footer animations when footer is visible
    const footer = document.querySelector('footer');
    if (footer) {
        // Use Intersection Observer to detect when footer is in viewport
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footerAnimateElements();
                    footerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        footerObserver.observe(footer);
    }

    // Make entire contact cards clickable
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('click', function() {
            // Find the link inside this card
            const link = this.querySelector('a');
            if (link) {
                // Trigger the link click
                link.click();
            }
        });
    });
});

// Enhanced form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Enhanced form field interactions
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Add focus effects for cursor
        input.addEventListener('focus', () => {
            const cursor = document.querySelector('.cursor');
            const cursorDot = document.querySelector('.cursor-dot');
            if (cursor && cursorDot) {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.border = '2px solid var(--primary)';
                cursorDot.style.backgroundColor = 'var(--primary)';
            }
        });

        input.addEventListener('blur', () => {
            const cursor = document.querySelector('.cursor');
            const cursorDot = document.querySelector('.cursor-dot');
            if (cursor && cursorDot) {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.border = '2px solid var(--primary)';
                cursorDot.style.backgroundColor = 'var(--primary)';

                // Create animated doodle background effect
                function createDoodleBackground() {
                    console.log("Creating doodle background effect");

                    // Create container for doodle elements
                    const doodleContainer = document.createElement('div');
                    doodleContainer.className = 'doodle-background';
                    document.body.appendChild(doodleContainer);

                    // Use document fragment for better performance
                    const fragment = document.createDocumentFragment();

                    // Create particles - reduced count for better performance
                    const particleCount = 10;
                    for (let i = 0; i < particleCount; i++) {
                        const particle = document.createElement('div');
                        particle.className = 'doodle-particle';

                        // Random size
                        const size = Math.random() * 10 + 5;
                        particle.style.width = `${size}px`;
                        particle.style.height = `${size}px`;

                        // Random position
                        const posX = Math.random() * 100;
                        const posY = Math.random() * 100;
                        particle.style.left = `${posX}%`;
                        particle.style.top = `${posY}%`;

                        // Random animation delay
                        const delay = Math.random() * 10;
                        particle.style.animationDelay = `${delay}s`;

                        // Random animation duration - slightly longer for smoother effect
                        const duration = Math.random() * 15 + 15;
                        particle.style.animationDuration = `${duration}s`;

                        fragment.appendChild(particle);
                    }

                    // Create floating lines - reduced count for better performance
                    const lineCount = 6;
                    for (let i = 0; i < lineCount; i++) {
                        const line = document.createElement('div');
                        line.className = 'doodle-line';

                        // Random width and position
                        const width = Math.random() * 150 + 50;
                        line.style.width = `${width}px`;

                        const posX = Math.random() * 100;
                        const posY = Math.random() * 100;
                        line.style.left = `${posX}%`;
                        line.style.top = `${posY}%`;

                        // Random rotation
                        const rotation = Math.random() * 180;
                        line.style.transform = `rotate(${rotation}deg)`;

                        // Random animation delay
                        const delay = Math.random() * 5;
                        line.style.animationDelay = `${delay}s`;

                        // Random animation duration
                        const duration = Math.random() * 15 + 20;
                        line.style.animationDuration = `${duration}s`;

                        fragment.appendChild(line);
                    }

                    // Create circles - reduced count for better performance
                    const circleCount = 5;
                    for (let i = 0; i < circleCount; i++) {
                        const circle = document.createElement('div');
                        circle.className = 'doodle-circle';

                        // Random size
                        const size = Math.random() * 200 + 50;
                        circle.style.width = `${size}px`;
                        circle.style.height = `${size}px`;

                        // Random position
                        const posX = Math.random() * 100;
                        const posY = Math.random() * 100;
                        circle.style.left = `${posX}%`;
                        circle.style.top = `${posY}%`;

                        // Random animation delay
                        const delay = Math.random() * 5;
                        circle.style.animationDelay = `${delay}s`;

                        fragment.appendChild(circle);
                    }

                    // Create squares - reduced count for better performance
                    const squareCount = 4;
                    for (let i = 0; i < squareCount; i++) {
                        const square = document.createElement('div');
                        square.className = 'doodle-square';

                        // Random size
                        const size = Math.random() * 100 + 30;
                        square.style.width = `${size}px`;
                        square.style.height = `${size}px`;

                        // Random position
                        const posX = Math.random() * 100;
                        const posY = Math.random() * 100;
                        square.style.left = `${posX}%`;
                        square.style.top = `${posY}%`;

                        // Random animation delay
                        const delay = Math.random() * 10;
                        square.style.animationDelay = `${delay}s`;

                        fragment.appendChild(square);
                    }

                    // Create triangles - reduced count for better performance
                    const triangleCount = 4;
                    for (let i = 0; i < triangleCount; i++) {
                        const triangle = document.createElement('div');
                        triangle.className = 'doodle-triangle';

                        // Random size by scaling
                        const scale = Math.random() * 2 + 0.5;
                        triangle.style.transform = `scale(${scale})`;

                        // Random position
                        const posX = Math.random() * 100;
                        const posY = Math.random() * 100;
                        triangle.style.left = `${posX}%`;
                        triangle.style.top = `${posY}%`;

                        // Random animation delay
                        const delay = Math.random() * 10;
                        triangle.style.animationDelay = `${delay}s`;

                        fragment.appendChild(triangle);
                    }

                    // Append all elements at once for better performance
                    doodleContainer.appendChild(fragment);
                }

                // Initialize doodle background when DOM is loaded
                document.addEventListener('DOMContentLoaded', () => {
                    // Add small delay to ensure the page loads quickly first
                    setTimeout(() => {
                        createDoodleBackground();
                    }, 500);
                });

            }
        });

        // Add validation visual feedback
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });

    // Form submission with email functionality
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Form validation - simple check
        if (!name || !email || !message) {
            alert("Please fill in all required fields (Name, Email, and Message)");
            return;
        }

        // Disable form during submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Always direct to riopaker0@gmail.com regardless of entered email
        const recipientEmail = 'riopaker0@gmail.com';

        // Create email content
        const emailSubject = encodeURIComponent(`${subject || 'Website Inquiry'}`);
        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone || 'Not provided'}\n\n` +
            `Message:\n${message}`
        );

        // Create mailto link
        const mailtoLink = `mailto:${recipientEmail}?subject=${emailSubject}&body=${emailBody}`;

        // Try to open email client
        const emailWindow = window.open(mailtoLink, '_blank');

        // Show clear success message with strong visual feedback
        setTimeout(() => {
            // Success animation
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Ready!';
            submitBtn.style.background = 'linear-gradient(45deg, #00c853, #64dd17)';

            // Dim the form fields
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.opacity = '0.5';
                const inputs = group.querySelectorAll('input, textarea');
                inputs.forEach(input => input.disabled = true);
            });

            // Create prominent success message
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.style.animation = 'fadeIn 0.5s ease';
            successMsg.style.background = 'rgba(0,0,0,0.05)';
            successMsg.style.borderRadius = '10px';
            successMsg.style.border = '1px solid rgba(255,255,255,0.1)';
            successMsg.style.marginBottom = '20px';

            // Message explaining what happened
            successMsg.innerHTML = `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: #64dd17; margin-bottom: 15px; text-shadow: 0 0 10px rgba(100,221,23,0.5);"></i>
                    <h3 style="margin-bottom: 10px; font-size: 1.5rem;">Message Ready to Send!</h3>
                    <p style="margin-bottom: 15px;">Your message has been prepared for <strong>riopaker0@gmail.com</strong></p>
                    <p style="margin-bottom: 15px;">If your email client didn't open automatically, please click the button below:</p>
                    <a href="${mailtoLink}" style="display: inline-block; background: linear-gradient(45deg, var(--primary), var(--secondary)); color: white; padding: 10px 20px; border-radius: 30px; text-decoration: none; font-weight: bold; box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);">
                        <i class="fas fa-envelope" style="margin-right: 8px;"></i> Open Email Client
                    </a>
                </div>
            `;

            // Insert before the form footer
            const formFooter = contactForm.querySelector('.form-footer');
            contactForm.insertBefore(successMsg, formFooter);

            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Reset form after delay
            setTimeout(() => {
                // Reset the form
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.background = '';

                // Restore form fields
                formGroups.forEach(group => {
                    group.style.opacity = '1';
                    const inputs = group.querySelectorAll('input, textarea');
                    inputs.forEach(input => input.disabled = false);
                });

                // Remove success message with fade effect
                successMsg.style.opacity = '0';
                successMsg.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    successMsg.remove();
                }, 500);
            }, 8000); // Longer display time for user to see and act
        }, 1000);
    });

    // Add smooth scroll to contact section when clicking links
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            contactSection.scrollIntoView({ behavior: 'smooth' });

            // Focus name field after scrolling
            setTimeout(() => {
                const nameInput = document.getElementById('name');
                if (nameInput) nameInput.focus();
            }, 1000);
        });
    });
}

// Fix for broken or missing images in work section
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded - Checking all images");
    const workItems = document.querySelectorAll('.work-item img');

    // Fallback image for specific sections
    const fallbackImages = {
        'Digital Products': 'https://images.unsplash.com/photo-1618556450994-a6a5a5d8c4ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80',
        'Web & Mobile Design': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80',
        'Branding & Identity': 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80',
        'Creative & Motion': 'https://images.unsplash.com/photo-1620674156044-52b714665818?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80',
        'Photography & Art Direction': 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80'
    };

    // Add loading="lazy" to all images and adjust sizes
    workItems.forEach(img => {
        // Ensure all images have the loading attribute
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }

        // Force full quality images but control size to improve loading
        if (img.src.includes('unsplash.com')) {
            // Use w=800 and h=600 for more appropriate ratio
            img.src = img.src.replace('&q=60', '&q=80')
                .replace('w=600', 'w=800')
                .replace('h=800', 'h=600');
        }

        // Set up error handling for images
        img.onerror = function() {
            // Find the closest section title
            const sectionTitle = this.closest('.work-grid').previousElementSibling.textContent.trim();
            // Use section-specific fallback or default
            const fallbackSrc = fallbackImages[sectionTitle] || 'https://images.unsplash.com/photo-1618556450994-a6a5a5d8c4ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80';
            this.src = fallbackSrc;
            this.alt = 'Project Image';
            console.log('Image failed to load, replaced with fallback for section: ' + sectionTitle);
        };

        // Force image reload to trigger potential onerror
        const currentSrc = img.src;
        img.src = '';
        setTimeout(() => {
            img.src = currentSrc;
        }, 50);

        // Recheck images that might be broken but don't trigger onerror
        if (!img.complete || img.naturalHeight === 0 || img.src === '') {
            const sectionTitle = img.closest('.work-grid').previousElementSibling.textContent.trim();
            const fallbackSrc = fallbackImages[sectionTitle] || 'https://images.unsplash.com/photo-1618556450994-a6a5a5d8c4ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80';
            img.src = fallbackSrc;
        }
    });

    // Add a second check after a delay to catch any images that failed
    setTimeout(() => {
        workItems.forEach(img => {
            if (!img.complete || img.naturalHeight === 0) {
                const sectionTitle = img.closest('.work-grid').previousElementSibling.textContent.trim();
                const fallbackSrc = fallbackImages[sectionTitle] || 'https://images.unsplash.com/photo-1618556450994-a6a5a5d8c4ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=800&q=80';
                img.src = fallbackSrc;
                console.log('Second-check: Replacing failed image in section: ' + sectionTitle);
            }
        });
    }, 2000);
});