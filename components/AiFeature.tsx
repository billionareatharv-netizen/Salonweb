import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Upload, ScanFace } from 'lucide-react';

const AiFeature: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    setSliderPosition(percentage);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <section id="ai-preview" className="py-24 bg-black relative">
       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Text Content */}
        <div>
          <div className="flex items-center space-x-2 text-gold-500 mb-4">
            <Sparkles size={20} />
            <span className="uppercase tracking-widest text-sm font-bold">AI Powered</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
            Try your look <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">before you book.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Unsure about that new color? Our proprietary AI mirrors analyze your face shape and skin tone to generate hyper-realistic previews of haircuts, colors, and styles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all">
              <Upload size={20} /> Upload Photo
            </button>
            <button className="flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all">
              <ScanFace size={20} /> Live Camera
            </button>
          </div>
          
          <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
            <span className="flex -space-x-2">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black"></div>
               ))}
            </span>
            <p>Used by 12,000+ clients this month</p>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="relative">
          <div className="relative w-full aspect-[4/5] md:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-white/10 select-none group">
            <div 
                ref={containerRef}
                className="relative w-full h-full cursor-ew-resize"
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                {/* After Image (Background) */}
                <img 
                    src="https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop" 
                    alt="After Look" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                    AI GENERATED
                </div>

                {/* Before Image (Foreground, clipped) */}
                <div 
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                >
                    <img 
                        src="https://images.unsplash.com/photo-1560869713-7d0a29430803?q=80&w=2060&auto=format&fit=crop" 
                        alt="Before Look" 
                        className="absolute w-full h-full max-w-none object-cover h-full"
                        style={{ width: containerRef.current ? containerRef.current.clientWidth : '100%' }} // Keep aspect ratio
                    />
                     <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                        ORIGINAL
                    </div>
                </div>

                {/* Slider Handle */}
                <div 
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8L22 12L18 16"></path>
                            <path d="M6 8L2 12L6 16"></path>
                        </svg>
                    </div>
                </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-stripes opacity-10"></div>
        </div>

      </div>
    </section>
  );
};

export default AiFeature;