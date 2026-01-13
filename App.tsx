import React, { useState, useEffect } from 'react';
import { Menu, X, Scissors, CheckCircle } from 'lucide-react';
import BookingSystem from './components/BookingSystem';
import Dashboard from './components/Dashboard';
import AiFeature from './components/AiFeature';
import Auth from './components/Auth';
import ContactWidgets from './components/ContactWidgets';
import { HeroSection, LiveWaitTicker, ServicesGrid, StylistSection, MembershipCard, ContactForm, Footer } from './components/LandingSections';
import { Service, Stylist, Booking, User } from './types';

// Mock Data
const MOCK_SERVICES: Service[] = [
  { id: '1', name: 'Signature Haircut', price: 1200, duration: '45 min', category: 'Hair', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop', popular: true },
  { id: '2', name: 'Balayage & Color', price: 4500, duration: '120 min', category: 'Hair', image: 'https://images.unsplash.com/photo-1595476103518-3c182f246eaf?q=80&w=2069&auto=format&fit=crop' },
  { id: '3', name: 'Royal Facial', price: 3000, duration: '60 min', category: 'Skin', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop', popular: true },
  { id: '4', name: 'Bridal Makeup', price: 15000, duration: '180 min', category: 'Makeup', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop' },
];

const MOCK_STYLISTS: Stylist[] = [
  { id: 's1', name: 'Elena Vance', role: 'Senior Director', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop', rating: 4.9, specialty: 'Color & Cuts' },
  { id: 's2', name: 'Marco Rossi', role: 'Creative Stylist', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop', rating: 4.8, specialty: 'Short Hair' },
  { id: 's3', name: 'Sarah Wu', role: 'Skin Specialist', image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1780&auto=format&fit=crop', rating: 5.0, specialty: 'Facials' },
];

export const App: React.FC = () => {
  const [view, setView] = useState<'customer' | 'owner' | 'login' | 'signup'>('customer');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showMemberPopup, setShowMemberPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewBooking = (booking: Booking) => {
      setBookings(prev => [booking, ...prev]);
  };

  const handleAuthSuccess = (type: 'admin' | 'user', data?: any) => {
    if (type === 'admin') {
      setView('owner');
    } else {
      // User Signup Logic
      if (view === 'signup' && data) {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          name: data.name,
          email: data.email,
          joinDate: new Date().toISOString(),
          isMember: true
        };
        setUsers(prev => [...prev, newUser]);
        setShowMemberPopup(true);
        setTimeout(() => setShowMemberPopup(false), 4000);
      }
      setView('customer');
    }
  };

  // Robust smooth scroll handler
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    
    // If we are not in customer view, go there first
    if (view !== 'customer') {
      setView('customer');
      // Wait for render then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (view === 'owner') {
    return (
      <>
        <div className="fixed bottom-4 right-4 z-50">
           <button 
             onClick={() => setView('customer')}
             className="bg-black text-white px-6 py-3 rounded-full shadow-2xl font-bold border border-white/20 hover:bg-gray-900 transition-all flex items-center"
           >
             <Scissors size={18} className="mr-2" /> Back to Website
           </button>
        </div>
        <Dashboard bookings={bookings} users={users} />
      </>
    );
  }

  if (view === 'login' || view === 'signup') {
    return (
      <Auth 
        type={view} 
        onAuthSuccess={handleAuthSuccess} 
        onSwitch={() => setView(view === 'login' ? 'signup' : 'login')}
        onBack={() => setView('customer')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black text-gray-200 font-sans selection:bg-gold-500 selection:text-black">
      
      {/* Membership Success Popup */}
      {showMemberPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-luxury-dark border border-gold-500 p-8 rounded-2xl text-center max-w-sm mx-4 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gold-500/10 animate-pulse"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-serif text-white mb-2">Congratulations!</h2>
              <p className="text-gray-300">You have successfully become a Lumière Elite member.</p>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-serif font-bold text-white tracking-tighter cursor-pointer" onClick={() => scrollToSection('root')}>
            Lumière<span className="text-gold-500">.</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <button onClick={() => scrollToSection('services')} className="text-gray-300 hover:text-white transition-colors">Services</button>
            <button onClick={() => scrollToSection('stylists')} className="text-gray-300 hover:text-white transition-colors">Stylists</button>
            <button onClick={() => scrollToSection('ai-preview')} className="text-gray-300 hover:text-white transition-colors">AI Preview</button>
            <button onClick={() => scrollToSection('membership')} className="text-gray-300 hover:text-white transition-colors">Membership</button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
             <button 
               onClick={() => setView('login')}
               className="text-xs text-gray-500 hover:text-white transition-colors"
             >
               Login
             </button>
             <button onClick={() => scrollToSection('booking')} className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gold-500 transition-colors">
               Book Now
             </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in">
              <button onClick={() => scrollToSection('services')} className="text-2xl font-serif text-white">Services</button>
              <button onClick={() => scrollToSection('stylists')} className="text-2xl font-serif text-white">Stylists</button>
              <button onClick={() => scrollToSection('booking')} className="text-gold-500 text-2xl font-serif">Book Now</button>
              <button onClick={() => { setMobileMenuOpen(false); setView('login'); }} className="text-white text-xl">Login</button>
          </div>
      )}

      {/* Main Content */}
      <main id="root">
        <HeroSection onScrollTo={scrollToSection} />
        <LiveWaitTicker />
        <ServicesGrid services={MOCK_SERVICES} onScrollTo={scrollToSection} />
        <AiFeature />
        <BookingSystem 
            services={MOCK_SERVICES} 
            stylists={MOCK_STYLISTS} 
            onBookingComplete={handleNewBooking}
        />
        <StylistSection stylists={MOCK_STYLISTS} onScrollTo={scrollToSection} />
        <MembershipCard onJoinClick={() => setView('signup')} />
        <ContactForm />
      </main>

      <Footer onScrollTo={scrollToSection} />
      
      <ContactWidgets />

    </div>
  );
};