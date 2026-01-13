import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const ContactWidgets: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 animate-fade-in">
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/15551234567" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group relative"
      >
        <MessageCircle size={24} fill="white" />
        <span className="absolute right-full mr-3 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call Button */}
      <a 
        href="tel:+15551234567" 
        className="bg-gold-500 text-black p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group relative"
      >
        <Phone size={24} fill="currentColor" />
        <span className="absolute right-full mr-3 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Call Salon
        </span>
      </a>
    </div>
  );
};

export default ContactWidgets;