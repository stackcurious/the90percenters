/**
 * The90Percenters - Waitlist Page JavaScript
 * -------------------------------------------
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create floating elements in the background
    createFloatingElements();
    
    // Setup the form submission
    setupForm();
    
    // Animate counters
    animateCounters();
    
    // Setup the final CTA button
    setupFinalCta();
});

/**
 * Create floating elements in the hero background
 */
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    if (!container) return;
    
    const numElements = 15;
    
    for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Random position
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        
        // Random size
        const size = 20 + Math.random() * 60;
        
        // Random opacity
        const opacity = 0.03 + Math.random() * 0.08;
        
        // Random animation delay
        const delay = Math.random() * 5;
        
        element.style.top = `${top}%`;
        element.style.left = `${left}%`;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.opacity = opacity;
        element.style.animationDelay = `${delay}s`;
        
        container.appendChild(element);
    }
}

/**
 * Setup the waitlist form
 */
function setupForm() {
    const form = document.getElementById('waitlist-form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        // In production, remove this preventDefault and let the form submit
        // to your Beehiiv form handler
        // e.preventDefault();
        
        // Analytics tracking
        if (typeof gtag === 'function') {
            gtag('event', 'waitlist_signup', {
                'event_category': 'engagement',
                'event_label': 'Waitlist Signup'
            });
        }
        
        // You can add custom form validation here if needed
        const email = document.getElementById('email').value;
        const firstName = document.getElementById('firstName').value;
        
        console.log('Form submitted with:', {
            email,
            firstName,
            timestamp: new Date().toISOString()
        });
        
        // If you're using client-side validation and want to prevent the default submission:
        // e.preventDefault();
        // Then do your custom submission:
        // submitToBeehiiv(formData);
    });
    
    // Add focus effects for form fields
    const formInputs = form.querySelectorAll('input, select');
    formInputs.forEach(input => {
        // Add focus class to parent when input is focused
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Remove focus class when input loses focus
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

/**
 * Animate the counter numbers
 */
function animateCounters() {
    // Define the counters with their target values
    const counters = [
        { id: 'subscribers-counter', target: 2458, increment: 11 },
        { id: 'stories-counter', target: 83, increment: 1 },
        { id: 'countdown-counter', target: 14, increment: 1 }
    ];
    
    // Animate each counter
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (!element) return;
        
        // Start from 0
        let current = 0;
        
        // Calculate animation duration based on target value
        const duration = 2000; // 2 seconds
        const interval = duration / (counter.target / counter.increment);
        
        // Start the animation
        const timer = setInterval(() => {
            current += counter.increment;
            
            // If we've reached or exceeded the target, set the final value and clear the interval
            if (current >= counter.target) {
                element.textContent = counter.target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, interval);
    });
    
    // Occasionally increase subscribers to show activity
    setInterval(() => {
        const subscribersElement = document.getElementById('subscribers-counter');
        if (!subscribersElement) return;
        
        // Only increase sometimes
        if (Math.random() > 0.7) {
            const currentValue = parseInt(subscribersElement.textContent);
            subscribersElement.textContent = currentValue + 1;
            
            // Flash animation
            subscribersElement.style.color = '#28a745';
            setTimeout(() => {
                subscribersElement.style.color = '';
            }, 300);
        }
    }, 5000);
}

/**
 * Setup the final CTA button
 */
function setupFinalCta() {
    const finalCtaButton = document.getElementById('final-cta-button');
    if (!finalCtaButton) return;
    
    finalCtaButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Scroll to the waitlist form
        const form = document.getElementById('waitlist-form');
        if (!form) return;
        
        // Scroll to the form with smooth behavior
        form.scrollIntoView({ behavior: 'smooth' });
        
        // Focus on the first input after scrolling
        setTimeout(() => {
            const firstInput = document.getElementById('firstName');
            if (firstInput) firstInput.focus();
        }, 1000);
        
        // Track click on final CTA
        if (typeof gtag === 'function') {
            gtag('event', 'click_final_cta', {
                'event_category': 'engagement',
                'event_label': 'Final CTA Button'
            });
        }
    });
}

/**
 * Create the countdown timer (uncomment if needed)
 */
/*
function setupCountdown() {
    // Set your launch date here
    const launchDate = new Date('2025-05-01T00:00:00');
    
    // Update the countdown
    function updateCountdown() {
        const now = new Date();
        const difference = launchDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Update the elements
        document.getElementById('countdown-days').textContent = days;
        document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Initial update
    updateCountdown();
    
    // Update every second
    setInterval(updateCountdown, 1000);
}
*/