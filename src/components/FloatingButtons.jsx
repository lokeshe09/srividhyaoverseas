import { Phone, MessageCircle } from 'lucide-react';
import { telLink, whatsappLink } from '../utils/contact.js';

export default function FloatingButtons() {
  return (
    <div className="floating-actions">
      <a className="fab fab-call" href={telLink} aria-label="Call Sri Vidhya Overseas">
        <Phone size={22} />
      </a>
      <a
        className="fab fab-whatsapp"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
        <span className="fab-label">Chat with us</span>
      </a>
    </div>
  );
}
