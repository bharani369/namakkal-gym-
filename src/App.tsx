import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { 
  Bike, Footprints, Zap, Flower2, Activity, Trophy, 
  CheckCircle2, MapPin, Phone, Mail, Clock, Menu, X, 
  ChevronRight, Instagram, Facebook, Star 
} from 'lucide-react';

// --- Preloader ---
const Preloader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-oxy-dark flex items-center justify-center"
        >
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="text-oxy-orange font-bebas text-6xl tracking-widest"
          >
            O<span className="text-oxy-teal">2</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Custom Cursor ---
const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const checkPointer = () => {
      const target = document.elementFromPoint(pos.x, pos.y);
      if (target) {
        setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
      } else {
        setIsPointer(false);
      }
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', checkPointer);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', checkPointer);
    };
  }, [pos.x, pos.y]);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-4 h-4 bg-oxy-orange rounded-full pointer-events-none z-[10000] mix-blend-screen shadow-[0_0_15px_#F39C12]"
      animate={{ 
        x: pos.x - 8, 
        y: pos.y - 8,
        scale: isPointer ? 1.5 : 1
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

// --- Canvas Particles ---
const CanvasParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: any[] = [];
    const colors = ['#F39C12', '#1ABC9C'];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 mix-blend-screen" />;
};

// --- Navbar ---
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = ['Home', 'Classes', 'About', 'Plans', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-oxy-dark/80 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="https://gwttspeed.blogspot.com/2026/04/blog-post.html" target="_blank" rel="noopener noreferrer" className="flex items-baseline gap-1 cursor-pointer group">
          <span className="font-bebas text-3xl text-oxy-orange tracking-wider group-hover:text-white transition-colors">OXYGEN</span>
          <span className="font-montserrat text-xs text-white tracking-widest uppercase group-hover:text-oxy-orange transition-colors">Fitness Studio</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-montserrat text-sm font-semibold text-oxy-light hover:text-oxy-orange transition-colors uppercase tracking-wider">
              {link}
            </a>
          ))}
        </div>

        <a href="https://wa.me/919047913226?text=Hi!%20I'd%20like%20to%20book%20a%20class." target="_blank" rel="noopener noreferrer" className="hidden md:block bg-oxy-orange text-white font-montserrat font-bold text-sm px-6 py-2.5 rounded-full hover:bg-oxy-orange/90 hover:shadow-[0_0_15px_#F39C12] transition-all uppercase tracking-wider">
          Book a Class
        </a>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-oxy-dark border-t border-oxy-charcoal overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {links.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="font-montserrat text-lg font-semibold text-oxy-light hover:text-oxy-orange uppercase tracking-wider">
                  {link}
                </a>
              ))}
              <a href="https://wa.me/919047913226?text=Hi!%20I'd%20like%20to%20book%20a%20class." target="_blank" rel="noopener noreferrer" className="text-center bg-oxy-orange text-white font-montserrat font-bold text-sm px-6 py-3 rounded-full hover:bg-oxy-orange/90 mt-4 uppercase tracking-wider">
                Book a Class
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-oxy-dark">
      <img 
        src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiwnl6s9rHWRD0VaKSV2zB9AkhoBlL-3k2-fiEpqolnaFlvlXXbBBS4ix_aBBLyYi0SbwtQI_wtSifPBvtiz3xMN6Q49_XW785GT1-27SeLmjvSuGoBR7LeFU-BRq-PAHHU5IxSPS687ys1FrQwiTmOi18Bb9KUk_ZzC_1CE_g4QIAVZk1RuiyXXlwpxPVy/s0/lv_0_20260415122500.gif" 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
        referrerPolicy="no-referrer"
      />
      <CanvasParticles />
      <div className="absolute inset-0 bg-gradient-to-b from-oxy-dark/60 via-oxy-dark/40 to-oxy-dark z-0" />
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.h1 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-bebas text-6xl md:text-8xl lg:text-9xl text-white tracking-wide mb-4 text-3d"
        >
          BREATHE STRENGTH.<br/>
          <span className="text-oxy-orange">FEEL ENERGY.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-montserrat text-lg md:text-xl text-oxy-light mb-10 max-w-2xl"
        >
          Looking for the best gym in Namakkal? Newly launched on Salem Road. Join our exclusive 100 Days Body Transformation!
        </motion.p>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a href="https://wa.me/919047913226?text=Hi!%20I'd%20like%20to%20book%20my%20first%20class." target="_blank" rel="noopener noreferrer" className="bg-oxy-orange text-white font-montserrat font-bold px-8 py-4 rounded-full hover:bg-oxy-orange/90 hover:shadow-[0_0_20px_#F39C12] transition-all uppercase tracking-wider text-center">
            Book Your First Class
          </a>
          <button className="border-2 border-white text-white font-montserrat font-bold px-8 py-4 rounded-full hover:bg-white hover:text-oxy-dark transition-all uppercase tracking-wider">
            Explore Classes
          </button>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-oxy-orange"
      >
        <ChevronRight className="rotate-90 w-10 h-10" />
      </motion.div>
    </section>
  );
};

// --- Marquee ---
const Marquee = () => {
  const text = "SPIN · BARRE · YOGA · PILATES · HIIT · PERSONAL TRAINING · TEACHER TRAINING · ";
  return (
    <div className="bg-oxy-orange py-4 overflow-hidden flex whitespace-nowrap">
      <div className="animate-marquee font-bebas text-3xl tracking-widest text-oxy-dark">
        <span>{text.repeat(5)}</span>
        <span>{text.repeat(5)}</span>
      </div>
    </div>
  );
};

// --- About Section ---
const About = () => {
  return (
    <section id="about" className="py-24 bg-oxy-dark text-oxy-light">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 bg-oxy-teal transform -translate-x-4 translate-y-4 rounded-2xl z-0 opacity-50"></div>
            <div className="absolute inset-0 bg-oxy-orange transform translate-x-4 -translate-y-4 rounded-2xl z-0 opacity-50"></div>
            <img src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop" alt="Gym Facility" className="relative z-10 rounded-2xl shadow-2xl object-cover h-[400px] md:h-[500px] w-full" referrerPolicy="no-referrer" />
          </div>
          <div className="order-1 md:order-2">
            <div className="border-l-4 border-oxy-teal pl-4 sm:pl-8 mb-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4">
                <a href="https://instagram.com/oxygen.fitness.studio" target="_blank" rel="noopener noreferrer" className="text-oxy-orange hover:text-white transition-colors shrink-0">
                  <Instagram className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" />
                </a>
                <h2 className="font-bebas text-2xl sm:text-4xl md:text-5xl text-white leading-none break-all sm:break-normal">
                  <a href="https://instagram.com/oxygen.fitness.studio" target="_blank" rel="noopener noreferrer" className="hover:text-oxy-orange transition-colors">
                    oxygen.fitness.studio <br/><span className="text-oxy-teal text-lg sm:text-2xl md:text-3xl">follow for more update</span>
                  </a>
                </h2>
              </div>
            </div>
            <div className="space-y-6 font-roboto text-lg text-gray-400">
              <p>
                Looking for the best gym in Namakkal? Oxygen Fitness Studio, newly launched on Salem Road, is your ultimate fitness destination. We believe in workouts that challenge your body and uplift your spirit.
              </p>
              <p>
                We are now offering an exclusive <strong>100 Days Body Transformation</strong> program with professional and experienced trainers at an affordable budget. Featuring a premium gym setup, imported top-quality machines, and a post-workout refresh bathing space.
              </p>
              <a href="#" className="inline-flex items-center text-oxy-orange font-montserrat font-bold uppercase tracking-wider hover:text-white transition-colors">
                Learn More <ChevronRight className="ml-1 w-5 h-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Classes Section (3D Flip Cards) ---
const Classes = () => {
  const classes = [
    { name: "Spin Cycling", icon: Bike, tags: "Spin30, Spin45", desc: "High-intensity rhythm riding. Clip in, zone out, and ride to the beat of our state-of-the-art sound system.", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop" },
    { name: "Barre Fitness", icon: Footprints, tags: "Barre, Barre Express", desc: "Ballet-inspired micro-movements designed to sculpt, tone, and lengthen your entire body.", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=600&auto=format&fit=crop" },
    { name: "HIIT / OxyBlast", icon: Zap, tags: "OxyBlast, OxyPower", desc: "Explosive interval training combining weights and cardio to maximize calorie burn and build power.", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop" },
    { name: "Yoga", icon: Flower2, tags: "Hot Yoga, Flow & Chill", desc: "Find your flow. From sweaty Vinyasa to restorative deep stretching in our infrared-heated studio.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop" },
    { name: "Pilates", icon: Activity, tags: "Reformer, Hot Mat", desc: "Core-focused strength training that improves flexibility, posture, and deep muscle endurance.", image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop" },
    { name: "Personal Training", icon: Trophy, tags: "1-on-1, Duet", desc: "Customized programming with our elite trainers to help you crush your specific fitness goals.", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <section id="classes" className="py-24 bg-oxy-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-4">OUR <span className="text-oxy-orange">CLASSES</span></h2>
          <p className="font-montserrat text-oxy-light uppercase tracking-widest">Find your perfect workout</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((cls, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group perspective-1000 h-80"
            >
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-oxy-dark rounded-2xl overflow-hidden border border-gray-800 shadow-xl">
                  <img src={cls.image} alt={cls.name} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-oxy-dark via-oxy-dark/80 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center z-10">
                    <cls.icon className="w-16 h-16 text-oxy-orange mb-6 drop-shadow-lg" />
                    <h3 className="font-bebas text-3xl text-white tracking-wide mb-2">{cls.name}</h3>
                    <p className="font-montserrat text-sm text-gray-300 uppercase">{cls.tags}</p>
                  </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-oxy-teal rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
                  <h3 className="font-bebas text-3xl text-oxy-dark tracking-wide mb-4">{cls.name}</h3>
                  <p className="font-roboto text-oxy-dark/90 mb-8">{cls.desc}</p>
                  <button className="bg-oxy-dark text-white font-montserrat font-bold px-6 py-2 rounded-full hover:bg-black transition-colors uppercase text-sm tracking-wider">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Stats Counter ---
const Counter = ({ end, suffix = "" }: { end: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Stats = () => {
  return (
    <section className="py-20 bg-oxy-dark border-y border-oxy-charcoal">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {[
          { num: 500, suf: "+", label: "Members" },
          { num: 20, suf: "+", label: "Classes/Week" },
          { num: 12, suf: "+", label: "Years Strong" },
          { num: 4.9, suf: "★", label: "Star Rating" },
        ].map((stat, i) => (
          <div key={i}>
            <div className="font-bebas text-5xl md:text-7xl text-oxy-orange drop-shadow-[0_0_15px_rgba(243,156,18,0.5)] mb-2">
              <Counter end={stat.num} suffix={stat.suf} />
            </div>
            <div className="font-montserrat text-sm text-white uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- Pricing Section (3D Tilt Cards) ---
const TiltCard = ({ plan }: { plan: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0deg) rotateY(0deg)");

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: "transform 0.1s ease-out" }}
      className={`relative bg-oxy-charcoal rounded-2xl p-8 flex flex-col h-full border ${plan.popular ? 'border-oxy-orange shadow-[0_0_30px_rgba(243,156,18,0.3)]' : 'border-gray-800'}`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-oxy-orange text-white font-montserrat text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider animate-pulse">
          Most Popular
        </div>
      )}
      {plan.bestValue && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-oxy-teal text-white font-montserrat text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
          Best Value
        </div>
      )}
      <h3 className="font-bebas text-3xl text-white tracking-wide mb-2">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="font-bebas text-5xl text-oxy-orange">₹{plan.price}</span>
        <span className="font-roboto text-gray-400">/{plan.duration}</span>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        {plan.features.map((feat: string, i: number) => (
          <li key={i} className="flex items-start gap-3 font-roboto text-gray-300">
            <CheckCircle2 className="w-5 h-5 text-oxy-teal shrink-0 mt-0.5" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>
      <a 
        href={`https://wa.me/919047913226?text=${encodeURIComponent(`Hi! I'm interested in the ${plan.name} at Oxygen Fitness Studio.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center w-full py-4 rounded-full font-montserrat font-bold uppercase tracking-wider transition-all ${plan.popular ? 'bg-oxy-orange text-white hover:bg-oxy-orange/90' : 'bg-oxy-dark text-white hover:bg-black'}`}
      >
        Select Plan
      </a>
    </motion.div>
  );
};

const Pricing = () => {
  const plans = [
    { name: "Intro Pass", price: "2,000", duration: "30 Days", features: ["10 Classes", "Access to all equipment", "Valid for 30 days", "Post-workout refresh bathing space"] },
    { name: "Unlimited Monthly", price: "4,000", duration: "90 Days", popular: true, features: ["Unlimited Classes", "Personalized diet plans", "Premium gym setup", "Valid for 3 months"] },
    { name: "Half Year", price: "6,000", duration: "6 Months", bestValue: true, features: ["Unlimited Classes", "Personalized diet plans", "Saves ₹2,000", "Valid for 6 months"] },
    { name: "9 Months", price: "8,000", duration: "9 Months", features: ["Unlimited Classes", "Personalized diet plans", "Saves ₹4,000", "Valid for 9 months"] },
    { name: "Annual All-Access", price: "10,000", duration: "12 Months", features: ["Unlimited Classes", "Personalized diet plans", "Saves ₹6,000", "Valid for 12 months"] },
  ];

  return (
    <section id="plans" className="py-24 bg-oxy-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-4">EXCLUSIVE <span className="text-oxy-orange">OFFERS</span></h2>
          <p className="font-montserrat text-oxy-light uppercase tracking-widest">Transform your body today.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TiltCard plan={plan} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Parallax CTA ---
const ParallaxCTA = () => {
  return (
    <section className="relative py-32 bg-fixed bg-center bg-cover flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(rgba(13, 13, 13, 0.8), rgba(13, 13, 13, 0.8)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")' }}>
      <div className="relative z-10 text-center px-6">
        <h2 className="font-bebas text-5xl md:text-7xl text-white tracking-wide mb-4">JOIN THE <span className="text-oxy-orange">OXYGEN COMMUNITY</span></h2>
        <p className="font-montserrat text-xl text-oxy-light mb-8">First class free. No commitment required.</p>
        <a href="https://wa.me/919047913226?text=Hi!%20I'm%20ready%20to%20start%20today." target="_blank" rel="noopener noreferrer" className="inline-block bg-oxy-orange text-white font-montserrat font-bold px-10 py-4 rounded-full hover:bg-oxy-orange/90 hover:shadow-[0_0_20px_#F39C12] transition-all uppercase tracking-wider text-lg">
          Start Today
        </a>
      </div>
    </section>
  );
};

// --- Testimonials ---
const Testimonials = () => {
  const quotes = [
    { text: "Oxygen completely changed my fitness routine. The community here is unlike any other gym!", author: "Sarah M." },
    { text: "The instructors are world-class. I look forward to every single class.", author: "James T." },
    { text: "Best boutique studio in Namakkal. Spin and Barre classes are absolutely incredible!", author: "Lisa K." },
  ];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % quotes.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-oxy-dark">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center gap-1 mb-8">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-oxy-orange fill-oxy-orange" />)}
        </div>
        <div className="relative h-40">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <p className="font-roboto text-2xl md:text-3xl text-white italic mb-6">"{quotes[current].text}"</p>
              <p className="font-montserrat font-bold text-oxy-teal uppercase tracking-wider">— {quotes[current].author}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {quotes.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-oxy-orange' : 'bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Schedule ---
const Schedule = () => {
  return (
    <section className="py-24 bg-oxy-charcoal">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-4">WEEKLY <span className="text-oxy-orange">SCHEDULE</span></h2>
          <p className="font-montserrat text-oxy-light uppercase tracking-widest">Sample classes. Book via MindBody.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-oxy-orange">
                {['Time', 'Monday', 'Wednesday', 'Friday'].map(h => (
                  <th key={h} className="p-4 font-montserrat font-bold text-white uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-roboto text-gray-300">
              <tr className="border-b border-gray-700 hover:bg-oxy-dark/50 transition-colors">
                <td className="p-4 font-bold text-oxy-teal">6:00 AM</td>
                <td className="p-4">Spin30</td>
                <td className="p-4">HIIT OxyBlast</td>
                <td className="p-4">Spin45</td>
              </tr>
              <tr className="border-b border-gray-700 hover:bg-oxy-dark/50 transition-colors">
                <td className="p-4 font-bold text-oxy-teal">9:00 AM</td>
                <td className="p-4">Barre</td>
                <td className="p-4">Hot Yoga</td>
                <td className="p-4">Pilates Reformer</td>
              </tr>
              <tr className="border-b border-gray-700 hover:bg-oxy-dark/50 transition-colors">
                <td className="p-4 font-bold text-oxy-teal">6:00 PM</td>
                <td className="p-4">Hot Yoga</td>
                <td className="p-4">Spin45</td>
                <td className="p-4">Barre Express</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="text-center mt-12">
          <button className="border-2 border-oxy-orange text-oxy-orange font-montserrat font-bold px-8 py-3 rounded-full hover:bg-oxy-orange hover:text-white transition-all uppercase tracking-wider">
            View Full Schedule
          </button>
        </div>
      </div>
    </section>
  );
};

// --- Instagram Feed (GIFs/Videos) ---
const InstagramFeed = () => {
  // Placeholders for the GIFs. You can replace these URLs with your actual .gif files or video links.
  const feed = [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=600&auto=format&fit=crop"
  ];

  return (
    <section className="py-24 bg-oxy-dark border-t border-oxy-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-2">STUDIO <span className="text-oxy-orange">ACTION</span></h2>
            <p className="font-montserrat text-oxy-light uppercase tracking-widest">Follow our Instagram for daily motivation</p>
          </div>
          <a href="https://www.instagram.com/popular/oxygen-fitness-studio-namakkal/" target="_blank" rel="noopener noreferrer" className="font-montserrat font-bold text-oxy-orange uppercase tracking-wider hover:text-white transition-colors flex items-center">
            @oxygenfitstudio <Instagram className="ml-2 w-5 h-5" />
          </a>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {feed.map((src, i) => (
            <motion.a 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              href="https://www.instagram.com/popular/oxygen-fitness-studio-namakkal/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative group aspect-square overflow-hidden rounded-xl bg-oxy-charcoal block"
            >
              <img src={src} alt="Instagram workout gif" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-oxy-orange/0 group-hover:bg-oxy-orange/20 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100 duration-300">
                  <Instagram className="text-white w-6 h-6" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact ---
const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-oxy-dark">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-bebas text-5xl md:text-6xl text-white tracking-wide mb-8">VISIT <span className="text-oxy-orange">US</span></h2>
          
          <div className="space-y-6 font-roboto text-gray-300 mb-10">
            <div className="flex items-start gap-4">
              <MapPin className="text-oxy-teal w-6 h-6 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white mb-1">Location</p>
                <p>Kotak Mahindra Bank Backside<br/>Aarthi Complex, 405, Salem Rd<br/>R.P Pudur, Namakkal, Tamil Nadu 637001</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-oxy-teal w-6 h-6 shrink-0" />
              <div>
                <p className="font-bold text-white mb-1">Phone</p>
                <p>+91 90479 13226</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-oxy-teal w-6 h-6 shrink-0" />
              <div>
                <p className="font-bold text-white mb-1">Email</p>
                <p>info@oxygenfitstudio.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-oxy-teal w-6 h-6 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white mb-1">Hours</p>
                <p>Morning: 5:00 AM – 12:00 PM<br/>Evening: 4:00 PM – 10:00 PM<br/>Sun: Closed</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 rounded-full bg-oxy-charcoal flex items-center justify-center text-white hover:bg-oxy-orange transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-oxy-charcoal flex items-center justify-center text-white hover:bg-oxy-orange transition-colors">
              <Facebook size={20} />
            </a>
          </div>
        </div>
        
        <div className="h-[400px] md:h-auto rounded-2xl overflow-hidden border border-gray-800">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.380709009479!2d78.16203907402345!3d11.233379450600989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babcf00271ed697%3A0xf2a1aa49d5c0810b!2sOXYGEN%20FITNESS%20STUDIO!5e0!3m2!1sen!2sin!4v1776233723291!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Oxygen Fitness Studio Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-16 pb-8 border-t-4 border-oxy-orange">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 mb-12">
        <div>
          <a href="https://gwttspeed.blogspot.com/2026/04/blog-post.html" target="_blank" rel="noopener noreferrer" className="flex items-baseline gap-1 mb-6 group">
            <span className="font-bebas text-3xl text-oxy-orange tracking-wider group-hover:text-white transition-colors">OXYGEN</span>
            <span className="font-montserrat text-xs text-white tracking-widest uppercase group-hover:text-oxy-orange transition-colors">Fitness Studio</span>
          </a>
          <p className="font-roboto text-gray-500 text-sm">
            Breathe Strength. Feel Energy. Namakkal's premier boutique fitness destination for Spin, Barre, Yoga, Pilates, and HIIT.
          </p>
        </div>
        <div>
          <h4 className="font-bebas text-2xl text-white tracking-wide mb-6">Quick Links</h4>
          <ul className="space-y-3 font-montserrat text-sm text-gray-400 uppercase tracking-wider">
            <li><a href="#home" className="hover:text-oxy-orange transition-colors">Home</a></li>
            <li><a href="#about" className="hover:text-oxy-orange transition-colors">About Us</a></li>
            <li><a href="#plans" className="hover:text-oxy-orange transition-colors">Memberships</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bebas text-2xl text-white tracking-wide mb-6">Classes</h4>
          <ul className="space-y-3 font-montserrat text-sm text-gray-400 uppercase tracking-wider">
            <li><a href="#classes" className="hover:text-oxy-teal transition-colors">Spin Cycling</a></li>
            <li><a href="#classes" className="hover:text-oxy-teal transition-colors">Barre Fitness</a></li>
            <li><a href="#classes" className="hover:text-oxy-teal transition-colors">Yoga & Pilates</a></li>
            <li><a href="#classes" className="hover:text-oxy-teal transition-colors">HIIT / OxyBlast</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 pt-8 text-center font-roboto text-gray-600 text-sm">
        <p>© 2025 Oxygen Fitness Studio. Namakkal, TN. All rights reserved.</p>
      </div>
    </footer>
  );
};

// --- Floating CTA ---
const FloatingCTA = () => {
  return (
    <motion.a 
      href="https://wa.me/919047913226?text=Hi!%20I'm%20interested%20in%20joining%20Oxygen%20Fitness%20Studio."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      className="fixed bottom-8 right-8 z-50 bg-oxy-orange text-white font-montserrat font-bold px-6 py-4 rounded-full shadow-[0_0_20px_rgba(243,156,18,0.6)] hover:bg-oxy-orange/90 hover:scale-105 transition-all uppercase tracking-wider flex items-center gap-2 animate-pulse"
    >
      Book Now
    </motion.a>
  );
};

// --- Main App ---
export default function App() {
  return (
    <div className="relative selection:bg-oxy-orange selection:text-white">
      <Preloader />
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Classes />
      <Stats />
      <Pricing />
      <ParallaxCTA />
      <Testimonials />
      <Schedule />
      <InstagramFeed />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
}
