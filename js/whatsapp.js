/**
 * WhatsApp Integration
 * Handles WhatsApp message sending functionality
 */

// WhatsApp phone number (without + and spaces)
const WHATSAPP_NUMBER = '557598828297';

/**
 * Creates a WhatsApp message URL
 * @param {string} message - The message to send
 * @returns {string} - WhatsApp URL
 */
function createWhatsAppURL(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Sends a message via WhatsApp
 * @param {string} message - The message to send
 */
function sendWhatsAppMessage(message) {
    const url = createWhatsAppURL(message);
    window.open(url, '_blank');
}

/**
 * Handles contact form submission via WhatsApp
 * @param {FormData} formData - Form data from contact form
 */
function sendContactFormViaWhatsApp(formData) {
    const nome = formData.get('nome') || '';
    const email = formData.get('email') || '';
    const telefone = formData.get('telefone') || '';
    const empresa = formData.get('empresa') || '';
    const servico = formData.get('servico') || '';
    const mensagem = formData.get('mensagem') || '';
    
    let whatsappMessage = `*Contato via Site - Júco Consultoria*\n\n`;
    whatsappMessage += `*Nome:* ${nome}\n`;
    whatsappMessage += `*E-mail:* ${email}\n`;
    whatsappMessage += `*Telefone:* ${telefone}\n`;
    
    if (empresa) {
        whatsappMessage += `*Empresa:* ${empresa}\n`;
    }
    
    if (servico) {
        whatsappMessage += `*Serviço de Interesse:* ${servico}\n`;
    }
    
    whatsappMessage += `\n*Mensagem:*\n${mensagem}`;
    
    sendWhatsAppMessage(whatsappMessage);
}

/**
 * Handles newsletter subscription via WhatsApp
 * @param {string} email - Email address
 */
function sendNewsletterViaWhatsApp(email) {
    const message = `*Inscrição Newsletter - Júco Consultoria*\n\nGostaria de me inscrever na newsletter.\n\n*E-mail:* ${email}`;
    sendWhatsAppMessage(message);
}

/**
 * Sends a general consultation request via WhatsApp
 * @param {string} context - Context of the consultation request
 */
function sendConsultationRequest(context = '') {
    let message = `*Solicitação de Consultoria - Júco Consultoria*\n\n`;
    message += `Olá! Gostaria de agendar uma consultoria estratégica inicial.`;
    
    if (context) {
        message += `\n\n*Contexto:* ${context}`;
    }
    
    message += `\n\nAguardo retorno para agendarmos uma conversa.`;
    
    sendWhatsAppMessage(message);
}

/**
 * Sends a service inquiry via WhatsApp
 * @param {string} serviceName - Name of the service
 */
function sendServiceInquiry(serviceName) {
    const message = `*Interesse em Serviço - Júco Consultoria*\n\nOlá! Tenho interesse em saber mais sobre:\n\n*${serviceName}*\n\nGostaria de receber mais informações e agendar uma conversa.`;
    sendWhatsAppMessage(message);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sendWhatsAppMessage,
        sendContactFormViaWhatsApp,
        sendNewsletterViaWhatsApp,
        sendConsultationRequest,
        sendServiceInquiry
    };
}