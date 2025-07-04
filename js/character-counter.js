// Character Counter Tool
document.addEventListener('DOMContentLoaded', function() {
    setupCharacterCounter();
});

function setupCharacterCounter() {
    const textInput = document.getElementById('textInput');
    if (!textInput) return;

    textInput.addEventListener('input', updateCharacterCount);
    
    // Initial update
    updateCharacterCount();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl + A to select all text
        if (e.ctrlKey && e.key === 'a' && e.target === textInput) {
            textInput.select();
        }
        
        // Ctrl + L to clear text
        if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            textInput.value = '';
            updateCharacterCount();
            textInput.focus();
        }
    });
}

function updateCharacterCount() {
    const textInput = document.getElementById('textInput');
    const text = textInput.value;
    
    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s/g, '').length;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const lineCount = text === '' ? 0 : text.split('\n').length;
    
    // Update display with animation
    if (window.CommonUtils) {
        window.CommonUtils.animateNumber('charCount', charCount);
        window.CommonUtils.animateNumber('charCountNoSpaces', charCountNoSpaces);
        window.CommonUtils.animateNumber('wordCount', wordCount);
        window.CommonUtils.animateNumber('lineCount', lineCount);
    } else {
        // Fallback without animation
        document.getElementById('charCount').textContent = charCount;
        document.getElementById('charCountNoSpaces').textContent = charCountNoSpaces;
        document.getElementById('wordCount').textContent = wordCount;
        document.getElementById('lineCount').textContent = lineCount;
    }
}