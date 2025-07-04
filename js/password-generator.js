// Password Generator Tool
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordGenerator();
});

function setupPasswordGenerator() {
    // Set up range input for length
    const lengthSlider = document.getElementById('passwordLength');
    if (lengthSlider) {
        lengthSlider.addEventListener('input', (e) => {
            document.getElementById('passwordLengthValue').textContent = e.target.value;
        });
    }
    
    // Set up event delegation for password generation
    document.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        
        if (action === 'generate-password') {
            generatePassword();
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + G to generate password
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            generatePassword();
        }
        
        // Space key to generate password
        if (e.key === ' ' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            generatePassword();
        }
    });
    
    // Generate initial password
    generatePassword();
    
    // Auto-regenerate when options change
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            setTimeout(generatePassword, 100); // Small delay for better UX
        });
    });
    
    // Auto-regenerate when length changes
    if (lengthSlider) {
        lengthSlider.addEventListener('input', () => {
            clearTimeout(window.passwordGenerationTimeout);
            window.passwordGenerationTimeout = setTimeout(generatePassword, 300);
        });
    }
}

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includePasswordNumbers').checked;
    const includeSymbols = document.getElementById('includePasswordSymbols').checked;
    
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('Veuillez sélectionner au moins un type de caractère');
        return;
    }
    
    let charset = '';
    const charTypes = [];
    
    if (includeUppercase) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }
    if (includeLowercase) {
        charset += 'abcdefghijklmnopqrstuvwxyz';
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }
    if (includeNumbers) {
        charset += '0123456789';
        charTypes.push('0123456789');
    }
    if (includeSymbols) {
        charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        charTypes.push('!@#$%^&*()_+-=[]{}|;:,.<>?');
    }
    
    let password = '';
    
    // Ensure at least one character of each selected type is included
    charTypes.forEach(type => {
        password += type[Math.floor(Math.random() * type.length)];
    });
    
    // Fill remaining length with random characters
    for (let i = password.length; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Shuffle the password to avoid predictable patterns
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    // Ensure password doesn't start or end with symbols (better usability)
    if (includeSymbols && password.length > 1) {
        const symbolRegex = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/;
        if (symbolRegex.test(password[0])) {
            // Move first symbol to middle
            const firstChar = password[0];
            const middleIndex = Math.floor(password.length / 2);
            password = password.slice(1, middleIndex) + firstChar + password.slice(middleIndex);
        }
    }
    
    const passwordField = document.getElementById('generatedPassword');
    passwordField.value = password;
    
    // Add animation effect
    passwordField.style.animation = 'none';
    setTimeout(() => {
        passwordField.style.animation = 'fadeIn 0.5s ease-in-out';
    }, 10);
    
    // Update password strength
    updatePasswordStrength(password);
    
    // Auto-select the generated password for easy copying
    passwordField.select();
}

function updatePasswordStrength(password) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    let score = 0;
    let feedback = [];
    
    // Length scoring
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Character type scoring
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    // Pattern checking (reduce score for common patterns)
    if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
    if (/123|abc|qwe/i.test(password)) score -= 1; // Sequential patterns
    
    // Ensure score is within bounds
    score = Math.max(0, Math.min(7, score));
    
    // Strength evaluation
    let strength, color, percentage;
    
    if (score < 4) {
        strength = 'Faible';
        color = 'strength-weak';
        percentage = 33;
        feedback.push('Ajoutez plus de caractères ou de types différents');
    } else if (score < 6) {
        strength = 'Moyen';
        color = 'strength-medium';
        percentage = 66;
        feedback.push('Bon mot de passe, mais peut être amélioré');
    } else {
        strength = 'Fort';
        color = 'strength-strong';
        percentage = 100;
        feedback.push('Excellent mot de passe !');
    }
    
    strengthFill.className = `strength-fill ${color}`;
    strengthFill.style.width = `${percentage}%`;
    strengthText.textContent = `Force du mot de passe: ${strength}`;
    
    // Add entropy information
    const entropy = calculateEntropy(password);
    if (entropy > 0) {
        strengthText.textContent += ` (${entropy.toFixed(0)} bits d'entropie)`;
    }
}

function calculateEntropy(password) {
    let charset = 0;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charset += 32;
    
    return Math.log2(Math.pow(charset, password.length));
}

// Add CSS animation keyframes if not already present
if (!document.querySelector('style[data-password-gen]')) {
    const style = document.createElement('style');
    style.setAttribute('data-password-gen', '');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}