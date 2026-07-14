import emailjs from '@emailjs/browser';

// EmailJS credentials — read from .env first, fall back to hardcoded values
const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'service_085ebfb';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_kykpgv3';
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'Qsbg1lEo1UOYTXmeY';

/**
 * Sends an email notification using EmailJS on new contact / consultation submissions.
 *
 * @param {Object} params
 * @param {string} params.name        - Sender full name
 * @param {string} params.email       - Sender email address
 * @param {string} params.phone       - Sender phone number
 * @param {string} params.serviceType - Selected service / query category
 * @param {string} params.message     - Message body
 * @param {string} params.type        - Submission type ('callback', 'booking', etc.)
 */
export const sendEmailNotification = async ({ name, email, phone, serviceType, message, type }) => {
  try {
    const templateParams = {
      from_name:       name        || 'N/A',
      reply_to:        email       || 'N/A',
      phone_number:    phone       || 'N/A',
      service_type:    serviceType || 'General Inquiry',
      message_content: message     || 'No message provided',
      submission_type: type        || 'contact',
      timestamp:       new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    console.log('[EmailJS] Sending with service:', SERVICE_ID, '| template:', TEMPLATE_ID);

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

    console.log('[EmailJS] ✅ Sent successfully —', response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error('[EmailJS] ❌ Failed to send:', error);
    return { success: false, error };
  }
};
