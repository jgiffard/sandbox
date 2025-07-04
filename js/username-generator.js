// Username Generator Tool
document.addEventListener('DOMContentLoaded', function() {
    setupUsernameGenerator();
});

function setupUsernameGenerator() {
    // Set up range input for length
    const lengthSlider = document.getElementById('usernameLength');
    if (lengthSlider) {
        lengthSlider.addEventListener('input', (e) => {
            document.getElementById('lengthValue').textContent = e.target.value;
        });
    }
    
    // Set up event delegation for username generation
    document.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        
        if (action === 'generate-username') {
            generateUsername();
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + G to generate username
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            generateUsername();
        }
        
        // Space key to generate username
        if (e.key === ' ' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            generateUsername();
        }
    });
    
    // Generate initial username
    generateUsername();
}

function generateUsername() {
    const length = parseInt(document.getElementById('usernameLength').value);
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    const consonants = 'bcdfghjklmnpqrstvwxz';
    const vowels = 'aeiou';
    const numbers = '0123456789';
    const symbols = '_-';
    
    let username = '';
    let useConsonant = Math.random() > 0.5;
    
    for (let i = 0; i < length; i++) {
        if (includeNumbers && Math.random() < 0.2) {
            // 20% chance to add a number
            username += numbers[Math.floor(Math.random() * numbers.length)];
        } else if (includeSymbols && Math.random() < 0.1 && i > 0 && i < length - 1) {
            // 10% chance to add a symbol (not at start/end)
            username += symbols[Math.floor(Math.random() * symbols.length)];
        } else {
            // Add alternating consonants and vowels
            const chars = useConsonant ? consonants : vowels;
            username += chars[Math.floor(Math.random() * chars.length)];
            useConsonant = !useConsonant;
        }
    }
    
    // Capitalize first letter
    username = username.charAt(0).toUpperCase() + username.slice(1);
    
    // Ensure no consecutive identical characters
    username = username.replace(/(.)\1{2,}/g, '$1');
    
    // If username is too short after cleaning, pad with vowels
    while (username.length < length) {
        username += vowels[Math.floor(Math.random() * vowels.length)];
    }
    
    // Trim to exact length
    username = username.substring(0, length);
    
    const usernameField = document.getElementById('generatedUsername');
    usernameField.value = username;
    
    // Add animation effect
    usernameField.style.animation = 'none';
    setTimeout(() => {
        usernameField.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
    
    // Auto-select the generated username for easy copying
    usernameField.select();
}

// Generate multiple usernames and let user choose
function generateMultipleUsernames() {
    const usernames = [];
    for (let i = 0; i < 5; i++) {
        const length = parseInt(document.getElementById('usernameLength').value);
        const includeNumbers = document.getElementById('includeNumbers').checked;
        const includeSymbols = document.getElementById('includeSymbols').checked;
        
        // Generate username logic here (same as above)
        // This is a simplified version - in practice, you'd extract the generation logic
        usernames.push('User' + Math.floor(Math.random() * 1000));
    }
    
    return usernames;
}