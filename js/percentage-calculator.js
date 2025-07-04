// Percentage Calculator Tool
document.addEventListener('DOMContentLoaded', function() {
    setupPercentageCalculator();
});

function setupPercentageCalculator() {
    // Calculator 1: X% of Y
    const percent1 = document.getElementById('percent1');
    const value1 = document.getElementById('value1');
    
    if (percent1 && value1) {
        percent1.addEventListener('input', calculatePercentage1);
        value1.addEventListener('input', calculatePercentage1);
    }
    
    // Calculator 2: X is what % of Y
    const value2 = document.getElementById('value2');
    const total2 = document.getElementById('total2');
    
    if (value2 && total2) {
        value2.addEventListener('input', calculatePercentage2);
        total2.addEventListener('input', calculatePercentage2);
    }
    
    // Calculator 3: Percentage change
    const oldValue = document.getElementById('oldValue');
    const newValue = document.getElementById('newValue');
    
    if (oldValue && newValue) {
        oldValue.addEventListener('input', calculatePercentage3);
        newValue.addEventListener('input', calculatePercentage3);
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + R to reset all fields
        if (e.ctrlKey && e.key === 'r') {
            e.preventDefault();
            resetAllCalculators();
        }
    });
    
    // Add focus navigation with Tab
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    inputs[0].focus(); // Go back to first input
                }
            }
        });
    });
}

function calculatePercentage1() {
    const percent = parseFloat(document.getElementById('percent1').value) || 0;
    const value = parseFloat(document.getElementById('value1').value) || 0;
    const result = (percent * value) / 100;
    
    const resultElement = document.getElementById('result1');
    resultElement.textContent = formatNumber(result);
    
    // Add animation
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

function calculatePercentage2() {
    const value = parseFloat(document.getElementById('value2').value) || 0;
    const total = parseFloat(document.getElementById('total2').value) || 0;
    const result = total !== 0 ? (value / total) * 100 : 0;
    
    const resultElement = document.getElementById('result2');
    resultElement.textContent = formatNumber(result);
    
    // Add animation
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

function calculatePercentage3() {
    const oldVal = parseFloat(document.getElementById('oldValue').value) || 0;
    const newVal = parseFloat(document.getElementById('newValue').value) || 0;
    const result = oldVal !== 0 ? ((newVal - oldVal) / oldVal) * 100 : 0;
    
    const resultElement = document.getElementById('result3');
    resultElement.textContent = (result >= 0 ? '+' : '') + formatNumber(result);
    
    // Color based on result
    if (result > 0) {
        resultElement.style.background = '#10b981';
        resultElement.style.color = 'white';
    } else if (result < 0) {
        resultElement.style.background = '#ef4444';
        resultElement.style.color = 'white';
    } else {
        resultElement.style.background = '#6366f1';
        resultElement.style.color = 'white';
    }
    
    // Add animation
    resultElement.style.animation = 'none';
    setTimeout(() => {
        resultElement.style.animation = 'pulse 0.5s ease-in-out';
    }, 10);
}

function formatNumber(num) {
    // Format number with appropriate decimal places
    if (num === 0) return '0';
    if (Math.abs(num) < 0.01) return num.toExponential(2);
    if (Math.abs(num) < 1) return num.toFixed(4);
    if (Math.abs(num) < 100) return num.toFixed(2);
    return num.toFixed(1);
}

function resetAllCalculators() {
    // Reset all input fields
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Reset all results
    document.getElementById('result1').textContent = '0';
    document.getElementById('result2').textContent = '0';
    document.getElementById('result3').textContent = '0';
    
    // Reset result3 styling
    const result3 = document.getElementById('result3');
    result3.style.background = '#6366f1';
    result3.style.color = 'white';
    
    // Focus first input
    if (inputs.length > 0) {
        inputs[0].focus();
    }
}

// Add CSS animation keyframes if not already present
if (!document.querySelector('style[data-percentage-calc]')) {
    const style = document.createElement('style');
    style.setAttribute('data-percentage-calc', '');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}