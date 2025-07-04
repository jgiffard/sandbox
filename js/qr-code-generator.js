// QR Code Generator Tool
document.addEventListener('DOMContentLoaded', function() {
    setupQRCodeGenerator();
});

function setupQRCodeGenerator() {
    // Set up event delegation for QR code actions
    document.addEventListener('click', (event) => {
        const action = event.target.getAttribute('data-action');
        
        if (action === 'generate-qr') {
            generateQR();
        } else if (action === 'download-qr') {
            downloadQR();
        }
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + G to generate QR code
        if (e.ctrlKey && e.key === 'g') {
            e.preventDefault();
            generateQR();
        }
        
        // Enter key to generate QR code when input is focused
        if (e.key === 'Enter' && e.target.id === 'qrInput') {
            e.preventDefault();
            generateQR();
        }
    });
    
    // Auto-generate on input if there's text
    const qrInput = document.getElementById('qrInput');
    if (qrInput) {
        qrInput.addEventListener('input', function() {
            // Debounce the generation
            clearTimeout(window.qrGenerationTimeout);
            window.qrGenerationTimeout = setTimeout(() => {
                if (qrInput.value.trim()) {
                    generateQR();
                }
            }, 500);
        });
    }
}

function generateQR() {
    const input = document.getElementById('qrInput');
    const canvas = document.getElementById('qrCanvas');
    const downloadBtn = document.getElementById('downloadQR');
    
    if (!input.value.trim()) {
        alert('Veuillez entrer un texte ou une URL à encoder');
        input.focus();
        return;
    }
    
    // Generate QR code
    QRCode.toCanvas(canvas, input.value, {
        width: 256,
        margin: 2,
        color: {
            dark: '#1e293b',
            light: '#ffffff'
        }
    }, function(error) {
        if (error) {
            console.error('QR code generation error:', error);
            alert('Erreur lors de la génération du QR code');
        } else {
            downloadBtn.style.display = 'inline-flex';
            // Add success animation
            canvas.style.animation = 'fadeIn 0.5s ease-in-out';
        }
    });
}

function downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    const input = document.getElementById('qrInput');
    
    if (!canvas || !canvas.toDataURL) {
        alert('Aucun QR code à télécharger');
        return;
    }
    
    const link = document.createElement('a');
    const filename = input.value.length > 20 ? 
        input.value.substring(0, 20) + '_qrcode.png' : 
        input.value + '_qrcode.png';
    
    // Clean filename
    const cleanFilename = filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    link.download = cleanFilename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    // Visual feedback
    const downloadBtn = document.getElementById('downloadQR');
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = '✓ Téléchargé';
    downloadBtn.style.background = '#10b981';
    
    setTimeout(() => {
        downloadBtn.textContent = originalText;
        downloadBtn.style.background = '';
    }, 2000);
}

// Handle window resize to regenerate QR code if needed
window.addEventListener('resize', function() {
    const qrCanvas = document.getElementById('qrCanvas');
    const qrInput = document.getElementById('qrInput');
    
    if (qrCanvas && qrInput && qrInput.value.trim()) {
        // Regenerate QR code with new size after a brief delay
        setTimeout(() => generateQR(), 100);
    }
});