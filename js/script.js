/**
 * The90Percenters - Global JavaScript
 * ----------------------------------
 * This file contains shared functionality used across the site
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any global elements or functionality
    setupNavigation();
    setupBackToTop();
    setupAnalytics();
});

/**
 * Setup responsive navigation functionality
 */
function setupNavigation() {
    // This will be expanded when you create a full navigation menu
    const header = document.querySelector('header');
    
    // Add scroll event to change header styling on scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

/**
 * Setup back to top button
 */
function setupBackToTop() {
    // Create back to top button if it doesn't exist
    let backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) {
        backToTopButton = document.createElement('button');
        backToTopButton.id = 'back-to-top';
        backToTopButton.innerHTML = '&uarr;';
        backToTopButton.setAttribute('aria-label', 'Back to top');
        backToTopButton.classList.add('back-to-top-btn');
        document.body.appendChild(backToTopButton);
        
        // Add styles if not in CSS
        backToTopButton.style.position = 'fixed';
        backToTopButton.style.bottom = '20px';
        backToTopButton.style.right = '20px';
        backToTopButton.style.backgroundColor = 'rgba(255, 45, 85, 0.8)';
        backToTopButton.style.color = 'white';
        backToTopButton.style.border = 'none';
        backToTopButton.style.borderRadius = '50%';
        backToTopButton.style.width = '40px';
        backToTopButton.style.height = '40px';
        backToTopButton.style.fontSize = '20px';
        backToTopButton.style.cursor = 'pointer';
        backToTopButton.style.display = 'none';
        backToTopButton.style.zIndex = '1000';
        backToTopButton.style.transition = 'opacity 0.3s, transform 0.3s';
    }
    
    // Show button when user scrolls down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.style.display = 'block';
            // Small delay for animation
            setTimeout(() => {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.transform = 'translateY(0)';
            }, 10);
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'translateY(20px)';
            // Hide after animation
            setTimeout(() => {
                if (window.scrollY <= 500) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Setup analytics tracking
 */
function setupAnalytics() {
    // If you're using Google Analytics, you would initialize it here
    // This is a placeholder for future implementation
    
    // Track outbound links
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        const href = link.getAttribute('href');
        
        // Check if it's an external link
        if (href && href.indexOf('http') === 0 && !href.includes(window.location.hostname)) {
            // If there's a gtag function available, track the outbound link
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'outbound',
                    'event_label': href,
                    'transport_type': 'beacon'
                });
            }
            
            // Log to console in development
            console.log('Outbound link clicked:', href);
        }
    });
}

/**
 * Utility function to format numbers with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Utility function to format dates
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

/**
 * Utility function to validate email addresses
 */
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Utility function to create a debounce function
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Utility function to create a throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utility function to detect mobile devices
 */
function isMobileDevice() {
    return (window.innerWidth <= 768);
}

/**
 * Utility function to handle fetch API with error handling
 */
async function fetchData(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        // Return null or throw an error based on your preference
        return null;
    }
}