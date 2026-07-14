import React from 'react';
import { MessageCircle, PhoneCall } from 'lucide-react';
import { useLanguage } from '../utils/LanguageContext';

const FloatingActions = () => {
  const { t } = useLanguage();
  const whatsappNumber = '917601078843';
  const phoneNumber = '+918790420585';
  const whatsappText = encodeURIComponent("Hello Nissi Constructions, I am looking for luxury home construction services. Can you help me?");

  return (
    <div className="floating-container">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn whatsapp-btn"
        title={t("Chat via WhatsApp")}
        style={{
          animation: 'pulse-gold 2s infinite',
          animationName: 'none', // Overwrite standard pulse, let's keep it steady with a hover lift
        }}
      >
        <MessageCircle size={26} fill="white" />
      </a>

      {/* Call Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="floating-btn call-btn"
        title={t("Book Call")}
        style={{
          boxShadow: '0 5px 15px rgba(212, 175, 55, 0.4)'
        }}
      >
        <PhoneCall size={24} />
      </a>
    </div>
  );
};

export default FloatingActions;
