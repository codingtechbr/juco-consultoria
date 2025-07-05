/**
 * Contact Page JavaScript
 * Handles form submission, FAQ interactions, and contact page specific functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== FAQ Functionality =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ===== Contact Form Handling =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const requiredFields = ['nome', 'email', 'telefone', 'mensagem'];
            let isValid = true;
            
            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    showFieldError(input, 'Este campo é obrigatório');
                    isValid = false;
                } else {
                    clearFieldError(input);
                }
            });
            
            // Validate email format
            if (data.email && !isValidEmail(data.email)) {
                const emailInput = contactForm.querySelector('[name="email"]');
                showFieldError(emailInput, 'Por favor, insira um e-mail válido');
                isValid = false;
            }
            
            // Check if terms are accepted
            const termsCheckbox = contactForm.querySelector('input[type="checkbox"]');
            if (!termsCheckbox.checked) {
                showMessage('Por favor, aceite os termos para continuar.', 'error');
                isValid = false;
            }
            
            if (isValid) {
                // Send via WhatsApp instead of traditional form submission
                sendContactFormViaWhatsApp(formData);
                showMessage('Redirecionando para WhatsApp...', 'success');
                contactForm.reset();
            }
        });
    }

    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                showMessage('Por favor, insira seu e-mail.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Send newsletter subscription via WhatsApp
            sendNewsletterViaWhatsApp(email);
            showMessage('Redirecionando para WhatsApp...', 'success');
            newsletterForm.reset();
        });
    }

    // ===== Helper Functions =====
    function showFieldError(input, message) {
        clearFieldError(input);
        
        input.style.borderColor = 'var(--danger)';
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = 'var(--danger)';
        errorDiv.style.fontSize = 'var(--font-size-sm)';
        errorDiv.style.marginTop = 'var(--spacing-xs)';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(input) {
        input.style.borderColor = '';
        const existingError = input.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        messageDiv.style.padding = 'var(--spacing-md)';
        messageDiv.style.borderRadius = 'var(--border-radius-md)';
        messageDiv.style.marginBottom = 'var(--spacing-lg)';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = '600';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else {
            messageDiv.style.backgroundColor = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }
        
        messageDiv.textContent = message;
        
        // Insert message at the top of the form
        const form = contactForm || newsletterForm;
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }
    
    // ===== Phone Number Formatting =====
    const phoneInput = document.querySelector('input[name="telefone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                if (value.length <= 2) {
                    value = value.replace(/(\d{0,2})/, '($1');
                } else if (value.length <= 7) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
                }
            }
            
            e.target.value = value;
        });
    }
});