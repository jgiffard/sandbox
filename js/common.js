// Common utilities for all tools
document.addEventListener('DOMContentLoaded', function() {
    // Initialize entry animations
    setTimeout(animateOnLoad, 300);
    
    // Set up common event listeners
    setupEventDelegation();
    setupRangeInputs();
});

// =====================================
// COMMON EVENT DELEGATION
// =====================================

function setupEventDelegation() {
    document.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        
        if (!action) return;
        
        if (action === 'copy-to-clipboard') {
            const targetId = event.target.getAttribute('data-target');
            if (targetId) {
                copyToClipboard(targetId);
            }
        }
    });
}

// =====================================
// UTILITIES
// =====================================

function setupRangeInputs() {
    // Update slider values
    const ranges = document.querySelectorAll('input[type="range"]');
    ranges.forEach(range => {
        range.addEventListener('input', (e) => {
            const targetId = e.target.id + 'Value';
            const target = document.getElementById(targetId);
            if (target) {
                target.textContent = e.target.value;
            }
        });
    });
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.select();
    element.setSelectionRange(0, 99999); // For mobile compatibility
    
    try {
        document.execCommand('copy');
        
        // Visual feedback
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✓';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1000);
        
    } catch (err) {
        console.error('Copy to clipboard error:', err);
        alert('Erreur lors de la copie dans le presse-papier');
    }
}

function animateNumber(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent) || 0;
    const increment = targetValue > currentValue ? 1 : -1;
    const steps = Math.abs(targetValue - currentValue);
    
    if (steps === 0) return;
    
    let current = currentValue;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === targetValue) {
            clearInterval(timer);
        }
    }, Math.max(1, 50 / steps));
}

// Entry animation for elements
function animateOnLoad() {
    const elements = document.querySelectorAll('.tool-card, .nav-btn, .tools-grid a');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Navigation helpers
function goHome() {
    window.location.href = '../index.html';
}

function goToTool(toolName) {
    window.location.href = `../tools/${toolName}.html`;
}

// Generic form validation
function validateRequiredFields(selector) {
    const fields = document.querySelectorAll(selector);
    let isValid = true;
    
    fields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else {
            field.classList.remove('error');
        }
    });
    
    return isValid;
}

// Common keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to go back home
    if (e.key === 'Escape') {
        const homeBtn = document.querySelector('.back-home');
        if (homeBtn) {
            homeBtn.click();
        }
    }
});

// Export functions for modules
window.CommonUtils = {
    animateNumber,
    copyToClipboard,
    validateRequiredFields,
    goHome,
    goToTool
};