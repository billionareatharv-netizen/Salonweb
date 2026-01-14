import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Scissors, User, ChevronRight, ChevronLeft, Loader } from 'lucide-react';
import { Service, Stylist, Booking } from '../types';

interface BookingSystemProps {
  services: Service[];
  stylists: Stylist[];
  onBookingComplete: (booking: Booking) => void;
}

const steps = ['Service', 'Stylist', 'Time', 'Confirm'];

const BookingSystem: React.FC<BookingSystemProps> = ({ services, stylists, onBookingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedStylist, setSelectedStylist] = useState<Stylist | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const dates = ['Today, Oct 24', 'Tomorrow, Oct 25', 'Sat, Oct 26', 'Sun, Oct 27'];
  const times = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const isNextDisabled = () => {
    if (currentStep === 0) return !selectedService;
    if (currentStep === 1) return !selectedStylist;
    if (currentStep === 2) return !selectedDate || !selectedTime;
    return false;
  };

  const handleConfirmBooking = () => {
    if(!selectedService || !selectedStylist) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
        const newBooking: Booking = {
            id: Math.random().toString(36).substr(2, 9),
            serviceName: selectedService.name,
            stylistName: selectedStylist.name,
            price: selectedService.price,
            date: selectedDate,
            time: selectedTime,
            customerName: "You (Demo User)", // In a real app, this comes from auth
            status: 'Confirmed',
            avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
        };
        
        onBookingComplete(newBooking);
        setIsProcessing(false);
        setIsCompleted(true);
        
        // Reset after 5 seconds
        setTimeout(() => {
            setIsCompleted(false);
            setCurrentStep(0);
            setSelectedService(null);
            setSelectedStylist(null);
            setSelectedDate('');
            setSelectedTime('');
        }, 5000);
    }, 1500);
  };

  if (isCompleted) {
      return (
        <div id="booking" className="py-24 bg-luxury-dark relative overflow-hidden flex items-center justify-center min-h-[60vh]">
             <div className="w-full max-w-sm mx-4 text-center animate-fade-in p-8 glass-panel rounded-2xl border border-green-500/30">
                 <div className="w-20 h-20 bg-green-500 text-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                     <CheckCircle size={40} />
                 </div>
                 <h2 className="text-2xl font-serif text-white mb-4">Booking Confirmed!</h2>
                 <p className="text-gray-400 mb-6 text-sm">You are all set for {selectedDate} at {selectedTime}.<br/>A WhatsApp confirmation has been sent to your number.</p>
                 <button 
                    onClick={() => { setIsCompleted(false); setCurrentStep(0); }}
                    className="text-gold-500 hover:text-white underline p-2"
                 >
                     Book Another Appointment
                 </button>
             </div>
        </div>
      )
  }

  return (
    <div id="booking" className="py-16 md:py-24 bg-luxury-dark relative overflow-hidden scroll-mt-24 min-h-screen flex flex-col justify-center">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-4">Smart Booking</h2>
          <p className="text-gray-400 text-sm md:text-base">Experience the future of convenience. Book in under 60 seconds.</p>
        </div>

        <div className="glass-panel rounded-2xl p-4 md:p-8 shadow-2xl border border-white/10 w-full">
          {/* Progress Bar - Touch Friendly */}
          <div className="flex justify-between mb-8 relative px-2 w-full">
            <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-gray-800 -z-10 transform -translate-y-1/2"></div>
            {steps.map((step, index) => (
              <div key={step} className="flex flex-col items-center bg-luxury-dark px-1 md:px-2 z-10">
                <div 
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-colors duration-300 ${
                    index <= currentStep ? 'bg-gold-500 text-black' : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {index + 1}
                </div>
                {/* Hide labels on very small screens, show on larger */}
                <span className={`text-[10px] md:text-xs mt-2 ${index <= currentStep ? 'text-gold-500' : 'text-gray-600'} hidden xs:block`}>{step}</span>
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[350px] md:min-h-[400px]">
            {currentStep === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                {services.slice(0, 6).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`flex items-center p-3 md:p-4 rounded-xl border w-full text-left transition-all duration-300 active:scale-[0.98] ${
                      selectedService?.id === service.id 
                        ? 'border-gold-500 bg-gold-500/10' 
                        : 'border-white/5 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <img src={service.image} alt={service.name} className="w-12 h-12 rounded-lg object-cover mr-4 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-white font-medium text-sm md:text-base truncate">{service.name}</h4>
                      <div className="flex items-center text-xs md:text-sm text-gray-400 mt-1">
                        <span className="text-gold-500 font-bold mr-2">₹{service.price}</span>
                        <span>• {service.duration}</span>
                      </div>
                    </div>
                    {selectedService?.id === service.id && <CheckCircle className="ml-auto text-gold-500 w-5 h-5 shrink-0" />}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-fade-in">
                {stylists.map((stylist) => (
                  <button
                    key={stylist.id}
                    onClick={() => setSelectedStylist(stylist)}
                    className={`relative p-4 rounded-xl border flex flex-col items-center text-center transition-all active:scale-[0.98] ${
                        selectedStylist?.id === stylist.id
                        ? 'border-gold-500 bg-gold-500/10'
                        : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <img src={stylist.image} alt={stylist.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover mb-3 border-2 border-gray-700" />
                    <h4 className="text-white font-medium text-sm md:text-base">{stylist.name}</h4>
                    <p className="text-[10px] md:text-xs text-gray-400 mb-2">{stylist.role}</p>
                    <div className="text-[10px] md:text-xs bg-white/10 px-2 py-1 rounded text-gold-400">⭐ {stylist.rating}</div>
                    {selectedStylist?.id === stylist.id && (
                        <div className="absolute top-2 right-2 text-gold-500"><CheckCircle size={16} /></div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="animate-fade-in w-full">
                <h3 className="text-white mb-4 flex items-center"><Calendar className="mr-2 text-gold-500" /> Select Date</h3>
                {/* Horizontal Scroll for dates - Touch friendly */}
                <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide w-full" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`whitespace-nowrap flex-shrink-0 px-6 py-3 rounded-lg border transition-all text-sm md:text-base ${
                        selectedDate === date ? 'bg-gold-500 text-black border-gold-500 font-bold' : 'border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>

                <h3 className="text-white mb-4 flex items-center"><Clock className="mr-2 text-gold-500" /> Select Time</h3>
                {/* Grid for times - 2 cols on mobile is very tap friendly */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-lg border text-center transition-all text-sm md:text-base ${
                        selectedTime === time ? 'bg-gold-500 text-black border-gold-500 font-bold' : 'border-white/10 text-gray-400 hover:border-white/30'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="animate-fade-in flex flex-col items-center text-center pt-8">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="md:w-10 md:h-10" />
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">Booking Summary</h3>
                <p className="text-gray-400 mb-8 max-w-md text-sm md:text-base">Almost done! Review your appointment details below. We'll send a confirmation to your WhatsApp.</p>
                
                <div className="w-full max-w-md bg-white/5 rounded-xl p-4 md:p-6 border border-white/10 text-left space-y-4 text-sm md:text-base">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-gray-400 flex items-center"><Scissors size={16} className="mr-2"/> Service</span>
                    <span className="text-white font-medium text-right truncate ml-4">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-gray-400 flex items-center"><User size={16} className="mr-2"/> Stylist</span>
                    <span className="text-white font-medium text-right truncate ml-4">{selectedStylist?.name}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-gray-400 flex items-center"><Calendar size={16} className="mr-2"/> Time</span>
                    <span className="text-white font-medium text-right truncate ml-4">{selectedDate} <br className="sm:hidden"/> {selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">Total Price</span>
                    <span className="text-gold-500 text-xl font-bold">₹{selectedService?.price}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10 gap-4">
            <button 
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex-1 sm:flex-none flex items-center justify-center sm:justify-start px-4 sm:px-6 py-3 rounded-full text-sm font-medium transition-all ${
                currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 sm:border-0'
              }`}
            >
              <ChevronLeft className="mr-2" size={18} /> Back
            </button>
            
            {currentStep === steps.length - 1 ? (
               <button 
               className={`flex-1 sm:flex-none bg-green-600 hover:bg-green-500 text-white px-6 sm:px-8 py-3 rounded-full font-bold flex items-center justify-center shadow-lg shadow-green-900/20 transition-all active:scale-95 text-sm md:text-base ${isProcessing ? 'opacity-75 cursor-wait' : ''}`}
               onClick={handleConfirmBooking}
               disabled={isProcessing}
             >
               {isProcessing ? <><Loader className="animate-spin mr-2"/> Processing...</> : 'Confirm Booking'}
             </button>
            ) : (
              <button 
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`flex-1 sm:flex-none flex items-center justify-center px-6 sm:px-8 py-3 rounded-full font-bold transition-all active:scale-95 text-sm md:text-base ${
                  isNextDisabled() ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gold-500 text-black hover:bg-gold-400 shadow-lg shadow-gold-500/20'
                }`}
              >
                Next Step <ChevronRight className="ml-2" size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSystem;