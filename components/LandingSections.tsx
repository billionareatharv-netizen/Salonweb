import React, { useState } from 'react';
import { Play, Star, Clock, MapPin, Phone, Instagram, Send, Mail } from 'lucide-react';
import { Service, Stylist } from '../types';

interface SectionProps {
  onScrollTo: (id: string) => void;
}

interface ServicesProps extends SectionProps {
    services: Service[];
}

interface StylistProps extends SectionProps {
    stylists: Stylist[];
}

interface MembershipProps {
  onJoinClick: () => void;
}

export const HeroSection: React.FC<SectionProps> = ({ onScrollTo }) => (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
    {/* Background Video/Image Placeholder */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2070&auto=format&fit=crop" 
        alt="Salon Background" 
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-luxury-black"></div>
    </div>

    <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center justify-center h-full">
      <div className="inline-block mb-4 md:mb-6 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 backdrop-blur-md">
        <span className="text-gold-500 text-[10px] md:text-xs font-bold tracking-widest uppercase">Award Winning Luxury</span>
      </div>
      
      <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-tight leading-tight">
        Not Just a Salon. <br />
        <span className="italic text-gold-400">A Masterpiece.</span>
      </h1>
      
      <p className="text-gray-300 text-sm sm:text-base md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto font-light leading-relaxed px-2">
        Where precision meets artistry. Experience the finest hair, skin, and wellness treatments in an environment designed for the elite.
      </p>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-4 justify-center items-center px-4">
        <button onClick={() => onScrollTo('booking')} className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Book Appointment
        </button>
        <button onClick={() => onScrollTo('ai-preview')} className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center backdrop-blur-sm">
          <Play size={20} className="mr-2 fill-current" /> Watch Film
        </button>
      </div>

      {/* Floating Review Badge */}
      <div className="absolute top-1/2 right-4 md:right-10 transform -translate-y-1/2 hidden lg:block animate-slide-up" style={{ animationDelay: '0.5s' }}>
        <div className="glass-panel p-4 rounded-xl max-w-xs text-left">
          <div className="flex text-gold-500 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <p className="text-white text-sm italic mb-3">"The most sophisticated salon experience I've ever had. The AI preview was mind-blowing!"</p>
          <div className="flex items-center gap-3">
             <img src="https://i.pravatar.cc/150?img=32" className="w-8 h-8 rounded-full" alt="Reviewer"/>
             <span className="text-xs text-gray-400 font-bold uppercase">Emily R. • Google Reviews</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export const LiveWaitTicker = () => (
  <div className="bg-gold-500 text-black overflow-hidden py-2 relative z-20">
    <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
      {[1,2,3,4].map(i => (
        <div key={i} className="flex items-center mx-4 md:mx-8">
            <Clock size={16} className="mr-2" />
            <span className="font-bold text-xs md:text-sm uppercase tracking-wider">Live Status: Salon Open • Current Wait Time: <span className="bg-black text-gold-500 px-2 rounded ml-1">12 Mins</span> • 3 Stylists Available</span>
        </div>
      ))}
    </div>
  </div>
);

export const ServicesGrid: React.FC<ServicesProps> = ({ services, onScrollTo }) => (
  <section id="services" className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24">
    <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-16">
        <div className="w-full md:w-auto text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Curated Services</h2>
            <p className="text-gray-400 max-w-md mx-auto md:mx-0 text-sm md:text-base">Premium treatments designed to rejuvenate your style and spirit.</p>
        </div>
        <button onClick={() => onScrollTo('booking')} className="hidden md:block text-gold-500 border-b border-gold-500 pb-1 hover:text-white hover:border-white transition-colors mt-6 md:mt-0 text-sm md:text-base">View Full Menu</button>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {services.map((service) => (
        <div key={service.id} className="group relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden cursor-pointer shadow-lg" onClick={() => onScrollTo('booking')}>
          <img 
            src={service.image} 
            alt={service.name} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          
          <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform">
             {service.popular && (
                 <span className="bg-gold-500 text-black text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block uppercase">Most Popular</span>
             )}
            <h3 className="text-xl md:text-2xl font-serif text-white mb-1">{service.name}</h3>
            <p className="text-gray-300 text-xs md:text-sm mb-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{service.category}</p>
            
            <div className="flex justify-between items-center border-t border-white/20 pt-4">
               <span className="text-gold-500 font-bold">₹{service.price}</span>
               <span className="text-white text-xs md:text-sm flex items-center"><Clock size={14} className="mr-1"/> {service.duration}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="mt-8 text-center md:hidden">
       <button onClick={() => onScrollTo('booking')} className="text-gold-500 border-b border-gold-500 pb-1 text-sm">View Full Menu</button>
    </div>
  </section>
);

export const StylistSection: React.FC<StylistProps> = ({ stylists, onScrollTo }) => (
  <section id="stylists" className="py-12 md:py-24 bg-neutral-900/50 scroll-mt-24">
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      <h2 className="text-center text-3xl md:text-5xl font-serif text-white mb-10 md:mb-16">Meet The Artists</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {stylists.map(stylist => (
          <div key={stylist.id} className="bg-luxury-black border border-white/5 rounded-2xl p-6 hover:border-gold-500/30 transition-colors group">
            <div className="relative mb-6">
               <img src={stylist.image} alt={stylist.name} className="w-full aspect-[3/4] object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
               <div className="absolute bottom-4 right-4 bg-white text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
                  <Star size={12} fill="black" className="mr-1"/> {stylist.rating}
               </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-1">{stylist.name}</h3>
            <p className="text-gold-500 text-sm mb-4 uppercase tracking-wider">{stylist.role}</p>
            <p className="text-gray-400 text-sm mb-6 line-clamp-2">Expert in {stylist.specialty}. Bringing over 8 years of international styling experience.</p>
            <button className="w-full py-3 border border-white/10 rounded-lg text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all" onClick={() => onScrollTo('booking')}>Book with {stylist.name.split(' ')[0]}</button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const MembershipCard: React.FC<MembershipProps> = ({ onJoinClick }) => (
  <section id="membership" className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto scroll-mt-24">
    <div className="glass-panel rounded-3xl p-6 md:p-16 relative overflow-hidden text-center">
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent transform rotate-45 scale-150 animate-pulse"></div>
      
      <span className="text-gold-500 font-bold tracking-widest uppercase mb-4 block text-xs md:text-sm">Lumière Elite</span>
      <h2 className="text-3xl md:text-6xl font-serif text-white mb-6">Unlock Unlimited Luxury</h2>
      <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-base md:text-lg">
        Join our exclusive membership program. Priority booking, 20% off all services, and complimentary monthly spa treatments.
      </p>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
        <button className="bg-gold-500 text-black px-10 py-4 rounded-full font-bold text-lg hover:bg-white transition-colors w-full md:w-auto" onClick={onJoinClick}>
          Become a Member
        </button>
        <button className="text-white underline hover:text-gold-500 transition-colors mt-2 md:mt-0" onClick={() => alert("Demo: Showing benefits modal...")}>
          View Benefits
        </button>
      </div>
    </div>
  </section>
);

export const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('sent');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto border-t border-white/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Get in Touch</h2>
                    <p className="text-gray-400 mb-8">Have a question or special request? Send us a message and our concierge will get back to you shortly.</p>
                    <div className="space-y-4 text-gray-400">
                         <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                            <Phone className="text-gold-500" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Phone</p>
                                <p className="text-white">+1 (555) 123-4567</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                            <Mail className="text-gold-500" />
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Email</p>
                                <p className="text-white">concierge@lumieresalon.com</p>
                            </div>
                         </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required type="text" placeholder="First Name" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 focus:outline-none w-full" />
                        <input required type="text" placeholder="Last Name" className="bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 focus:outline-none w-full" />
                    </div>
                    <input required type="email" placeholder="Email Address" className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 focus:outline-none" />
                    <textarea required rows={4} placeholder="Your Message" className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white focus:border-gold-500 focus:outline-none"></textarea>
                    
                    <button 
                        disabled={status !== 'idle'}
                        className={`w-full py-4 rounded-lg font-bold flex items-center justify-center transition-all ${status === 'sent' ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-gold-500'}`}
                    >
                        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : <><Send size={18} className="mr-2"/> Send Message</>}
                    </button>
                </form>
            </div>
        </section>
    );
};

export const Footer: React.FC<SectionProps> = ({ onScrollTo }) => (
    <footer className="bg-black pt-12 md:pt-24 pb-12 border-t border-white/10 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-16">
            <div className="md:col-span-1">
                <h2 className="text-3xl font-serif text-white mb-6">Lumière.</h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto md:mx-0">
                    Redefining luxury beauty services with technology and artistry. 
                </p>
            </div>
            <div>
                <h3 className="text-white font-bold mb-6">Contact</h3>
                <ul className="space-y-4 text-gray-500 text-sm flex flex-col items-center md:items-start">
                    <li className="flex items-start"><MapPin size={16} className="mr-2 mt-1 shrink-0"/> 1084 Park Avenue, NY 10028</li>
                    <li className="flex items-center"><Phone size={16} className="mr-2"/> +1 (555) 123-4567</li>
                    <li className="flex items-center text-green-500"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> Open Now until 9 PM</li>
                </ul>
            </div>
            <div>
                <h3 className="text-white font-bold mb-6">Quick Links</h3>
                <ul className="space-y-3 text-gray-500 text-sm">
                    <li><button onClick={() => onScrollTo('services')} className="hover:text-gold-500 transition-colors">Services Menu</button></li>
                    <li><button onClick={() => onScrollTo('booking')} className="hover:text-gold-500 transition-colors">Book Appointment</button></li>
                    <li><button onClick={() => onScrollTo('stylists')} className="hover:text-gold-500 transition-colors">Stylist Portfolio</button></li>
                    <li><button onClick={() => onScrollTo('membership')} className="hover:text-gold-500 transition-colors">Membership</button></li>
                </ul>
            </div>
            <div>
                 <h3 className="text-white font-bold mb-6">Follow Us</h3>
                 <div className="flex justify-center md:justify-start space-x-4 mb-6">
                     {[1,2,3].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black transition-colors cursor-pointer">
                             <Instagram size={20} />
                         </div>
                     ))}
                 </div>
                 <p className="text-gray-600 text-xs">© 2024 Lumière Salon. All rights reserved.</p>
            </div>
        </div>
    </footer>
);