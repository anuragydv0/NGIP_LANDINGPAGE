import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export function openContactModal() {
  window.dispatchEvent(new CustomEvent('openContactModal'));
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    organization: '',
    interest: 'Investing',
    message: '',
    _gotcha: '' // honeypot
  };

  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOpen = () => {
      returnFocusRef.current = document.activeElement as HTMLElement;
      setIsOpen(true);
      setStatus('idle');
      setErrors({});
      setFormData(initialFormData);
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    };

    window.addEventListener('openContactModal', handleOpen);
    return () => window.removeEventListener('openContactModal', handleOpen);
  }, []);

  const close = () => {
    setIsOpen(false);
    if (returnFocusRef.current) {
      returnFocusRef.current.focus();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
      
      // Focus trap
      if (e.key === 'Tab' && isOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      // Focus first invalid field
      const firstInvalidField = document.querySelector(`[name="${Object.keys(newErrors)[0]}"]`) as HTMLElement;
      firstInvalidField?.focus();
      return false;
    }
    return true;
  };

  const handleBlur = (field: keyof typeof formData) => {
    if (errors[field]) {
      validate();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    // Honeypot check
    if (formData._gotcha) {
      setStatus('success');
      setFormData(initialFormData);
      return;
    }

    setStatus('submitting');

    try {
      const formspreeUrl = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/meaqdyea'; 
      
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData(initialFormData);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={close}
          />
          
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative w-full max-w-lg bg-ngip-bg text-ngip-navy rounded-2xl shadow-2xl border border-black/10 overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-black/5 bg-white shrink-0">
              <h2 id="contact-modal-title" className="text-2xl font-serif font-medium">Get in touch</h2>
              <button 
                onClick={close}
                className="p-2 text-ngip-navy/50 hover:text-ngip-navy hover:bg-black/5 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div aria-live="polite" className="sr-only">
                {status === 'success' ? 'Message sent successfully.' : status === 'error' ? 'Something went wrong. Please try again.' : ''}
              </div>

              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-ngip-green/10 text-ngip-green rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-serif font-medium mb-2">Message Sent</h3>
                  <p className="text-ngip-navy/70 mb-8">Thanks for reaching out! We'll get back to you soon.</p>
                  <button 
                    onClick={close}
                    className="w-full bg-ngip-navy text-white px-6 py-3 rounded-xl font-medium hover:bg-ngip-navy/90 transition-all active:scale-[0.98]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                  {status === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm mb-4">
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-ngip-navy/80 mb-1">Name <span className="text-red-500">*</span></label>
                      <input 
                        ref={firstInputRef}
                        type="text" 
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        onBlur={() => handleBlur('name')}
                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-black/10 focus:ring-ngip-navy/20'} focus:outline-none focus:ring-4 focus:border-ngip-navy transition-all bg-white`}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-ngip-navy/80 mb-1">Email <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onBlur={() => handleBlur('email')}
                        className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-300 focus:ring-red-500' : 'border-black/10 focus:ring-ngip-navy/20'} focus:outline-none focus:ring-4 focus:border-ngip-navy transition-all bg-white`}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-ngip-navy/80 mb-1">Phone <span className="text-ngip-navy/40 font-normal">(Optional)</span></label>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-4 focus:ring-ngip-navy/20 focus:border-ngip-navy transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-ngip-navy/80 mb-1">Organization <span className="text-ngip-navy/40 font-normal">(Optional)</span></label>
                      <input 
                        type="text" 
                        id="organization"
                        name="organization"
                        placeholder="Organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-4 focus:ring-ngip-navy/20 focus:border-ngip-navy transition-all bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="interest" className="block text-sm font-medium text-ngip-navy/80 mb-1">What are you looking for?</label>
                    <select 
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={(e) => setFormData({...formData, interest: e.target.value})}
                      className="w-full px-4 py-2.5 rounded-lg border border-black/10 focus:outline-none focus:ring-4 focus:ring-ngip-navy/20 focus:border-ngip-navy transition-all bg-white appearance-none"
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23101B33%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                    >
                      <option value="Investing">Investing</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Data/API access">Data/API access</option>
                      <option value="Press">Press</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-ngip-navy/80 mb-1">Message <span className="text-red-500">*</span></label>
                    <textarea 
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      onBlur={() => handleBlur('message')}
                      className={`w-full px-4 py-2.5 rounded-lg border ${errors.message ? 'border-red-300 focus:ring-red-500' : 'border-black/10 focus:ring-ngip-navy/20'} focus:outline-none focus:ring-4 focus:border-ngip-navy transition-all bg-white resize-none`}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {/* Honeypot */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" value={formData._gotcha} onChange={(e) => setFormData({...formData, _gotcha: e.target.value})} />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-ngip-navy text-white px-6 py-3 rounded-xl font-medium hover:bg-ngip-navy/90 transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                  
                  <div className="text-center text-xs text-ngip-navy/50 mt-4">
                    or email us directly at <a href="mailto:hello@ngip.com" className="underline hover:text-ngip-navy transition-colors">hello@ngip.com</a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
