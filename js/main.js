// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupCharacterCounter();
    setupPercentageCalculator();
    setupPasswordGenerator();
    setupUsernameGenerator();
    setupRangeInputs();
}

// =====================================
// NAVIGATION ENTRE LES OUTILS
// =====================================

function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const toolSections = document.querySelectorAll('.tool-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTool = button.getAttribute('data-tool');
            
            // Mise à jour des boutons actifs
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mise à jour des sections actives
            toolSections.forEach(section => {
                section.classList.remove('active');
            });
            
            const targetSection = document.getElementById(targetTool);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// =====================================
// COMPTEUR DE CARACTÈRES
// =====================================

function setupCharacterCounter() {
    const textInput = document.getElementById('textInput');
    if (!textInput) return;

    textInput.addEventListener('input', updateCharacterCount);
    
    // Mise à jour initiale
    updateCharacterCount();
}

function updateCharacterCount() {
    const textInput = document.getElementById('textInput');
    const text = textInput.value;
    
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lineCount = text === '' ? 0 : text.split('\n').length;
    
    // Mise à jour de l'affichage avec animation
    animateNumber('charCount', charCount);
    animateNumber('charCountNoSpaces', charCountNoSpaces);
    animateNumber('wordCount', wordCount);
    animateNumber('lineCount', lineCount);
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

// =====================================
// GÉNÉRATEUR QR CODE
// =====================================

function generateQR() {
    const input = document.getElementById('qrInput');
    const canvas = document.getElementById('qrCanvas');
    const downloadBtn = document.getElementById('downloadQR');
    
    if (!input.value.trim()) {
        alert('Veuillez entrer un texte ou une URL à encoder');
        return;
    }
    
    // Générer le QR code
    QRCode.toCanvas(canvas, input.value, {
        width: 256,
        margin: 2,
        color: {
            dark: '#1e293b',
            light: '#ffffff'
        }
    }, function(error) {
        if (error) {
            console.error('Erreur lors de la génération du QR code:', error);
            alert('Erreur lors de la génération du QR code');
        } else {
            downloadBtn.style.display = 'inline-flex';
        }
    });
}

function downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
}

// =====================================
// GÉNÉRATEUR DE PSEUDO
// =====================================

function setupUsernameGenerator() {
    const lengthSlider = document.getElementById('usernameLength');
    if (lengthSlider) {
        lengthSlider.addEventListener('input', (e) => {
            document.getElementById('lengthValue').textContent = e.target.value;
        });
    }
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
            // 20% de chance d'ajouter un chiffre
            username += numbers[Math.floor(Math.random() * numbers.length)];
        } else if (includeSymbols && Math.random() < 0.1 && i > 0 && i < length - 1) {
            // 10% de chance d'ajouter un symbole (pas au début/fin)
            username += symbols[Math.floor(Math.random() * symbols.length)];
        } else {
            // Ajouter une consonne ou une voyelle en alternance
            const chars = useConsonant ? consonants : vowels;
            username += chars[Math.floor(Math.random() * chars.length)];
            useConsonant = !useConsonant;
        }
    }
    
    // Capitaliser la première lettre
    username = username.charAt(0).toUpperCase() + username.slice(1);
    
    document.getElementById('generatedUsername').value = username;
}

// =====================================
// CALCULATRICE DE POURCENTAGES
// =====================================

function setupPercentageCalculator() {
    // Calculateur 1: X% de Y
    const percent1 = document.getElementById('percent1');
    const value1 = document.getElementById('value1');
    
    if (percent1 && value1) {
        percent1.addEventListener('input', calculatePercentage1);
        value1.addEventListener('input', calculatePercentage1);
    }
    
    // Calculateur 2: X est quel % de Y
    const value2 = document.getElementById('value2');
    const total2 = document.getElementById('total2');
    
    if (value2 && total2) {
        value2.addEventListener('input', calculatePercentage2);
        total2.addEventListener('input', calculatePercentage2);
    }
    
    // Calculateur 3: Variation en pourcentage
    const oldValue = document.getElementById('oldValue');
    const newValue = document.getElementById('newValue');
    
    if (oldValue && newValue) {
        oldValue.addEventListener('input', calculatePercentage3);
        newValue.addEventListener('input', calculatePercentage3);
    }
}

function calculatePercentage1() {
    const percent = parseFloat(document.getElementById('percent1').value) || 0;
    const value = parseFloat(document.getElementById('value1').value) || 0;
    const result = (percent * value) / 100;
    
    document.getElementById('result1').textContent = result.toFixed(2);
}

function calculatePercentage2() {
    const value = parseFloat(document.getElementById('value2').value) || 0;
    const total = parseFloat(document.getElementById('total2').value) || 0;
    const result = total !== 0 ? (value / total) * 100 : 0;
    
    document.getElementById('result2').textContent = result.toFixed(2);
}

function calculatePercentage3() {
    const oldVal = parseFloat(document.getElementById('oldValue').value) || 0;
    const newVal = parseFloat(document.getElementById('newValue').value) || 0;
    const result = oldVal !== 0 ? ((newVal - oldVal) / oldVal) * 100 : 0;
    
    const resultElement = document.getElementById('result3');
    resultElement.textContent = (result >= 0 ? '+' : '') + result.toFixed(2);
    
    // Couleur en fonction du résultat
    if (result > 0) {
        resultElement.style.background = '#10b981';
    } else if (result < 0) {
        resultElement.style.background = '#ef4444';
    } else {
        resultElement.style.background = '#6366f1';
    }
}

// =====================================
// GÉNÉRATEUR DE MOT DE PASSE
// =====================================

function setupPasswordGenerator() {
    const lengthSlider = document.getElementById('passwordLength');
    if (lengthSlider) {
        lengthSlider.addEventListener('input', (e) => {
            document.getElementById('passwordLengthValue').textContent = e.target.value;
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
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    
    // S'assurer qu'au moins un caractère de chaque type sélectionné est inclus
    if (includeUppercase) password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
    if (includeLowercase) password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)];
    if (includeNumbers) password += '0123456789'[Math.floor(Math.random() * 10)];
    if (includeSymbols) password += '!@#$%^&*()_+-=[]{}|;:,.<>?'[Math.floor(Math.random() * 25)];
    
    // Compléter avec des caractères aléatoires
    for (let i = password.length; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }
    
    // Mélanger le mot de passe
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    document.getElementById('generatedPassword').value = password;
    updatePasswordStrength(password);
}

function updatePasswordStrength(password) {
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    let score = 0;
    let feedback = [];
    
    // Longueur
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    
    // Types de caractères
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    // Évaluation
    let strength, color, percentage;
    
    if (score < 4) {
        strength = 'Faible';
        color = 'strength-weak';
        percentage = 33;
    } else if (score < 6) {
        strength = 'Moyen';
        color = 'strength-medium';
        percentage = 66;
    } else {
        strength = 'Fort';
        color = 'strength-strong';
        percentage = 100;
    }
    
    strengthFill.className = `strength-fill ${color}`;
    strengthFill.style.width = `${percentage}%`;
    strengthText.textContent = `Force du mot de passe: ${strength}`;
}

// =====================================
// UTILITAIRES
// =====================================

function setupRangeInputs() {
    // Mise à jour des valeurs des sliders
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
    element.setSelectionRange(0, 99999); // Pour mobile
    
    try {
        document.execCommand('copy');
        
        // Feedback visuel
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = '✓';
        button.style.background = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 1000);
        
    } catch (err) {
        console.error('Erreur lors de la copie:', err);
        alert('Erreur lors de la copie dans le presse-papier');
    }
}

// Gestion des raccourcis clavier
document.addEventListener('keydown', function(e) {
    // Ctrl + G pour générer (tous les générateurs)
    if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        const activeSection = document.querySelector('.tool-section.active');
        if (activeSection) {
            const sectionId = activeSection.id;
            switch (sectionId) {
                case 'qrcode':
                    generateQR();
                    break;
                case 'username':
                    generateUsername();
                    break;
                case 'password':
                    generatePassword();
                    break;
            }
        }
    }
    
    // Navigation avec les flèches
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const navButtons = document.querySelectorAll('.nav-btn');
        const activeButton = document.querySelector('.nav-btn.active');
        if (activeButton) {
            const currentIndex = Array.from(navButtons).indexOf(activeButton);
            let newIndex;
            
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : navButtons.length - 1;
            } else {
                newIndex = currentIndex < navButtons.length - 1 ? currentIndex + 1 : 0;
            }
            
            navButtons[newIndex].click();
        }
    }
});

// Gestion du redimensionnement de la fenêtre
window.addEventListener('resize', function() {
    // Réajuster le QR code si nécessaire
    const qrCanvas = document.getElementById('qrCanvas');
    if (qrCanvas && qrCanvas.style.display !== 'none') {
        const input = document.getElementById('qrInput');
        if (input && input.value.trim()) {
            // Régénérer le QR code avec la nouvelle taille
            setTimeout(() => generateQR(), 100);
        }
    }
});

// Animation d'entrée pour les éléments
function animateOnLoad() {
    const elements = document.querySelectorAll('.tool-card, .nav-btn');
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

// Lancer l'animation au chargement
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateOnLoad, 300);
});