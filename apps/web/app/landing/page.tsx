"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  ChevronRight,
  Plus,
  X,
  Menu,
  MessageSquare,
  Bot,
  Users,
  FileText,
  Zap,
  Shield,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Headphones,
  BarChart3,
  Clock,
  Globe,
  CheckCircle,
  Brain,
} from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

// --- Utility Hooks ---
const useScrollAnimation = (
  threshold = 0.1,
): [boolean, React.MutableRefObject<HTMLElement | null>] => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold },
    );

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [isVisible, domRef];
};

// --- Custom Graphics ---
const ChatBotGraphic = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full drop-shadow-2xl overflow-visible"
      >
        <defs>
          <linearGradient
            id="movingReflection"
            x1="0%"
            y1="0%"
            x2="200%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            <animate
              attributeName="x1"
              from="-100%"
              to="100%"
              dur="8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x2"
              from="100%"
              to="300%"
              dur="8s"
              repeatCount="indefinite"
            />
          </linearGradient>
          <linearGradient id="chatGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g className="animate-float">
          {/* Shadow */}
          <ellipse
            cx="400"
            cy="450"
            rx="180"
            ry="20"
            fill="black"
            opacity="0.3"
            filter="url(#softGlow)"
          />

          {/* Main chat window */}
          <rect
            x="200"
            y="100"
            width="400"
            height="300"
            rx="24"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Header bar */}
          <rect
            x="200"
            y="100"
            width="400"
            height="50"
            rx="24"
            fill="#0f172a"
          />
          <rect x="200" y="126" width="400" height="24" fill="#0f172a" />

          {/* Window controls */}
          <circle cx="230" cy="125" r="6" fill="#ef4444" />
          <circle cx="255" cy="125" r="6" fill="#eab308" />
          <circle cx="280" cy="125" r="6" fill="#22c55e" />

          {/* Title */}
          <text
            x="400"
            y="130"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="14"
            fontWeight="500"
          >
            AI Support Chat
          </text>

          {/* Chat bubbles - User message */}
          <rect
            x="380"
            y="170"
            width="200"
            height="40"
            rx="16"
            fill="url(#chatGrad)"
          />
          <text x="480" y="195" textAnchor="middle" fill="white" fontSize="12">
            How can I reset my password?
          </text>

          {/* Chat bubbles - AI response */}
          <rect
            x="220"
            y="225"
            width="280"
            height="60"
            rx="16"
            fill="url(#bubbleGrad)"
          />
          <text
            x="360"
            y="250"
            textAnchor="middle"
            fill="#1e293b"
            fontSize="11"
          >
            I can help you with that! Go to Settings
          </text>
          <text
            x="360"
            y="268"
            textAnchor="middle"
            fill="#1e293b"
            fontSize="11"
          >
            → Security → Reset Password ✨
          </text>

          {/* AI indicator */}
          <circle cx="240" cy="255" r="16" fill="#3b82f6" />
          <text
            x="240"
            y="260"
            textAnchor="middle"
            fill="white"
            fontSize="12"
            fontWeight="bold"
          >
            AI
          </text>

          {/* Typing indicator */}
          <g className="animate-pulse">
            <circle cx="235" cy="320" r="4" fill="#64748b" />
            <circle cx="250" cy="320" r="4" fill="#64748b" />
            <circle cx="265" cy="320" r="4" fill="#64748b" />
          </g>

          {/* Input field */}
          <rect
            x="220"
            y="345"
            width="340"
            height="40"
            rx="20"
            fill="#334155"
            stroke="#475569"
            strokeWidth="1"
          />
          <text x="250" y="370" fill="#64748b" fontSize="12">
            Type your message...
          </text>

          {/* Send button */}
          <circle cx="545" cy="365" r="15" fill="url(#chatGrad)" />
          <path
            d="M540 365 L550 365 M545 360 L550 365 L545 370"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* Floating elements */}
        <g className="animate-float-delayed">
          <circle cx="150" cy="200" r="30" fill="#3b82f6" opacity="0.2" />
          <circle cx="650" cy="180" r="25" fill="#8b5cf6" opacity="0.2" />
          <circle cx="680" cy="350" r="35" fill="#22c55e" opacity="0.15" />
          <circle cx="120" cy="380" r="20" fill="#f59e0b" opacity="0.2" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen animate-pulse-slow"></div>
    </div>
  );
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  opacity: number;
}

// --- Particle Background ---
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const createParticle = useCallback(
    (x: number, y: number) => ({
      x,
      y,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1 - 0.5,
      opacity: 0.8,
      life: 100 + Math.random() * 100,
    }),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    let animationFrameId: number;
    if (!ctx) {
      console.error("Could not get 2D context.");
      return;
    }
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;
        p.opacity = p.life / 200;
        if (
          p.life < 0 ||
          p.x < 0 ||
          p.x > canvas.width ||
          p.y < 0 ||
          p.y > canvas.height
        ) {
          particles.current.splice(i, 1);
          particles.current.push(
            createParticle(
              Math.random() * canvas.width,
              Math.random() * canvas.height,
            ),
          );
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
          ctx.fill();
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    for (let i = 0; i < 50; i++)
      particles.current.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
        ),
      );
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-20 pointer-events-none"
    ></canvas>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (section: string) => {
    if (section === "Dashboard" || section === "Get Started") {
      if (isSignedIn) {
        router.push("/");
      } else {
        router.push("/sign-in");
      }
    } else {
      // Scroll to section
      const element = document.getElementById(
        section.toLowerCase().replace(" ", "-"),
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/5 py-2" : "bg-transparent py-4"}`}
      >
        <div className="max-w-[980px] mx-auto px-6 h-10 flex justify-between items-center text-[12px] font-normal tracking-wide text-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white text-[13px] cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
                Chat Assistants
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Pricing", "Dashboard"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-200"
                >
                  {item}
                </button>
              ),
            )}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => handleNavClick("Get Started")}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[11px] font-medium hover:bg-blue-500 transition-transform active:scale-95"
            >
              {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
            </button>
          </div>
          <button
            className="md:hidden text-white opacity-80"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black text-white pt-20 px-6 animate-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col gap-6 text-xl font-medium">
            <button onClick={() => handleNavClick("Features")}>Features</button>
            <button onClick={() => handleNavClick("How It Works")}>
              How It Works
            </button>
            <button onClick={() => handleNavClick("Pricing")}>Pricing</button>
            <div className="h-[1px] bg-gray-800 w-full my-2"></div>
            <button
              onClick={() => handleNavClick("Get Started")}
              className="bg-blue-600 text-white w-full py-3 rounded-full text-sm"
            >
              {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col items-center justify-start pt-32 md:pt-48 bg-black overflow-hidden">
      <ParticleBackground />
      <div className="absolute top-[-20%] left-0 right-0 h-[100vh] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none animate-pulse-slow"></div>
      <div className="z-20 text-center px-4">
        <div
          className={`transition-all duration-1000 ease-out transform ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mb-6 flex justify-center items-center gap-2 opacity-90">
            <div className="w-6 h-6 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              AI-Powered Support
            </span>
          </div>
        </div>
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.05] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600 drop-shadow-2xl transition-all duration-1000 delay-200 ease-out transform pb-2 ${loaded ? "animate-hero-text-in opacity-100" : "opacity-0 translate-y-12"}`}
        >
          Customer support <br /> that never sleeps.
        </h1>
        <p
          className={`text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Empower your business with AI-driven chat assistants. Instant
          responses, seamless escalation, and complete conversation insights.
        </p>
        <div
          className={`flex items-center justify-center gap-5 transition-all duration-1000 delay-500 ease-out transform ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all active:scale-95 animate-button-pop"
          >
            {isSignedIn ? "Go to Dashboard" : "Start Free Trial"}
            <ArrowRight size={16} />
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white/30 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-all group">
            Watch Demo
            <Play
              size={14}
              className="fill-current ml-1 group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </div>
      <div
        className={`relative w-full max-w-[1100px] mt-10 md:mt-0 transition-all duration-[1500ms] delay-700 ease-out transform ${loaded ? "scale-100 opacity-100" : "scale-95 opacity-0 translate-y-20"}`}
      >
        <div className="relative aspect-[16/9] w-full">
          <ChatBotGraphic />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

const StickyScrollText = () => {
  const [isVisible, domRef] = useScrollAnimation(0.2);
  return (
    <section
      ref={domRef}
      className="relative bg-zinc-950 h-[150vh] flex flex-col items-center justify-start pt-50"
      id="how-it-works"
    >
      <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-4xl px-6 text-center z-20">
        <p
          className={`text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-gray-500 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          Chat Assistants combines{" "}
          <span className="text-white relative inline-block overflow-hidden pb-2">
            AI intelligence
            <span
              className={`absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-sm animate-gradient-reveal ${isVisible ? "" : "opacity-0"}`}
            ></span>
          </span>{" "}
          with your knowledge base. <br />
          <br />
          <span
            className={`block transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            Delivering instant, accurate answers while you{" "}
            <span className="text-white relative inline-block overflow-hidden pb-2">
              focus on what matters.
              <span
                className={`absolute inset-0 bg-gradient-to-r from-green-400/30 to-cyan-400/30 blur-sm animate-gradient-reveal delay-300 ${isVisible ? "" : "opacity-0"}`}
              ></span>
            </span>
          </span>
        </p>
      </div>
    </section>
  );
};

const ProductDetails = () => {
  const [isVisible, domRef] = useScrollAnimation(0.3);
  return (
    <section className="bg-[#05050a] py-24 relative overflow-hidden px-6">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow delay-1000"></div>
      </div>

      <div
        ref={domRef as React.RefObject<HTMLDivElement>}
        className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10"
      >
        <div
          className={`order-2 md:order-1 space-y-8 relative z-10 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
        >
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter">
            Smart. <br /> Instant. <br /> Always On.
          </h2>
          <p className="text-2xl font-medium text-gray-400 max-w-md leading-relaxed">
            Your AI assistant learns from your knowledge base, responds to
            customers 24/7, and seamlessly escalates complex issues to your
            team.
          </p>
          <button className="text-blue-400 hover:text-blue-300 text-lg font-medium flex items-center gap-2 group mt-4">
            Learn more about AI responses{" "}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div
          className={`order-1 md:order-2 relative h-[500px] w-full flex items-center justify-center group transition-all duration-1000 delay-300 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <div className="grid grid-cols-2 gap-6 w-full max-w-md">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-3xl p-6 border border-blue-500/20 backdrop-blur-sm">
              <Clock className="w-10 h-10 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
              <p className="text-gray-400 text-sm">Always available support</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-3xl p-6 border border-green-500/20 backdrop-blur-sm">
              <Zap className="w-10 h-10 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">&lt;1s</h3>
              <p className="text-gray-400 text-sm">Average response time</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-3xl p-6 border border-purple-500/20 backdrop-blur-sm">
              <Brain className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">RAG</h3>
              <p className="text-gray-400 text-sm">Knowledge-powered AI</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 rounded-3xl p-6 border border-orange-500/20 backdrop-blur-sm">
              <Users className="w-10 h-10 text-orange-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">∞</h3>
              <p className="text-gray-400 text-sm">Unlimited conversations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Platform Showcase Horizontal Scroll Section ---
const PlatformShowcase = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalHeight = rect.height - viewportHeight;

      let progress = 0;
      if (rect.top <= 0) {
        progress = Math.abs(rect.top) / totalHeight;
      }
      if (rect.top > 0) progress = 0;
      if (Math.abs(rect.top) >= totalHeight) progress = 1;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      name: "Dashboard",
      desc: "Complete overview of all conversations and metrics",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Conversations",
      desc: "Manage and respond to customer chats in real-time",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Knowledge Base",
      desc: "Upload docs and train your AI with custom content",
      img: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Widget Builder",
      desc: "Customize and embed your chat widget anywhere",
      img: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Analytics",
      desc: "Track performance with detailed insights and reports",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Team Management",
      desc: "Invite members and assign roles for collaboration",
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-[#020204]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#020204]">
        {/* Background Elements */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black opacity-50 blur-3xl transform scale-110 transition-transform duration-1000"
          style={{ transform: `scale(${1 + scrollProgress * 0.2})` }}
        ></div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto pl-10 md:pl-20">
          <div
            className="mb-12 transition-all duration-500"
            style={{
              opacity: 1 - scrollProgress * 2,
              transform: `translateY(${-scrollProgress * 50}px)`,
            }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-2">
              Platform
            </h3>
            <h2 className="text-5xl md:text-8xl font-semibold text-white tracking-tighter">
              Everything you need <br /> to delight customers.
            </h2>
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          className="flex gap-12 pl-[40vw] items-center will-change-transform relative z-20"
          style={{ transform: `translateX(${-scrollProgress * 3000}px)` }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[600px] h-[400px] bg-black/50 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl hover:scale-105 transition-transform duration-500 group"
            >
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <img
                src={feature.img}
                alt={feature.name}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-2xl font-semibold text-white drop-shadow-md block mb-2">
                  {feature.name}
                </span>
                <span className="text-sm text-gray-300 drop-shadow-md">
                  {feature.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CarouselSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const items = [
    {
      title: "Widget Integration",
      desc: "Embed a customizable chat widget on your website in minutes. Configure greeting messages and suggested questions.",
      icon: <Globe className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "Knowledge Base",
      desc: "Upload your documentation, FAQs, and guides. Our AI learns from your content to provide accurate responses.",
      icon: <FileText className="w-8 h-8 text-green-400" />,
    },
    {
      title: "Team Collaboration",
      desc: "Manage team members, assign roles, and handle escalated conversations together with full conversation history.",
      icon: <Users className="w-8 h-8 text-purple-400" />,
    },
    {
      title: "Voice Support",
      desc: "Enable VAPI voice assistant for customers who prefer speaking. Seamless integration with your chat workflow.",
      icon: <Headphones className="w-8 h-8 text-orange-400" />,
    },
    {
      title: "Analytics Dashboard",
      desc: "Track conversation trends, resolution rates, response times, and team performance in real-time.",
      icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
    },
  ];

  return (
    <section className="bg-[#080808] py-32 relative" id="features">
      <div className="max-w-[980px] mx-auto px-6 mb-12 flex justify-between items-end">
        <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
          Features.
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-8 px-6 md:px-[max(24px,calc(50vw-490px))] pb-12 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="snap-center shrink-0 w-[85vw] md:w-[380px] flex flex-col gap-6 group"
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden cursor-pointer bg-gradient-to-br from-gray-900 to-gray-950 border border-white/10 p-8 flex flex-col justify-between hover:border-white/20 transition-all">
              <div className="transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 origin-top-left">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-[2rem] group-hover:ring-white/30 transition-all duration-500"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const [isVisible, domRef] = useScrollAnimation(0.1);
  const cards = [
    {
      title: "AI-Powered Responses",
      subtitle: "Intelligence",
      desc: "Our AI uses RAG to deliver accurate, context-aware answers from your knowledge base.",
      col: "md:col-span-2",
      icon: <Bot className="w-8 h-8 text-blue-400" />,
      bg: "from-gray-900 to-black",
    },
    {
      title: "Conversation Management",
      subtitle: "Dashboard",
      desc: "View, manage, and respond to all conversations in one place.",
      col: "md:col-span-1",
      icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
      bg: "from-gray-950 to-black",
    },
    {
      title: "Smart Escalation",
      subtitle: "Workflow",
      desc: "AI knows when to hand off to humans. Never miss critical issues.",
      col: "md:col-span-1",
      icon: <Users className="w-8 h-8 text-orange-400" />,
      bg: "from-gray-950 to-black",
    },
    {
      title: "Enterprise Security",
      subtitle: "Trust",
      desc: "Your data is encrypted and secure. Role-based access control for your team.",
      col: "md:col-span-2",
      icon: <Shield className="w-8 h-8 text-green-400" />,
      bg: "from-gray-900 to-black",
    },
  ];

  return (
    <section className="bg-[#0a0a0c] py-32 px-6">
      <div
        ref={domRef as React.RefObject<HTMLDivElement>}
        className="max-w-7xl mx-auto"
      >
        <div
          className={`flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter">
            Why Choose Us.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`${card.col} bg-gradient-to-b ${card.bg} relative rounded-[2.5rem] p-10 overflow-hidden border border-white/10 group hover:border-white/30 transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative z-20 h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-500 mb-2 block">
                    {card.subtitle}
                  </span>
                  <h3 className="text-3xl font-medium text-white mb-4">
                    {card.title}
                  </h3>
                </div>
                <div>
                  <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 origin-left mb-4">
                    {card.icon}
                  </div>
                  <p className="text-gray-400 text-lg font-medium leading-snug">
                    {card.desc}
                  </p>
                  <div className="mt-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 cursor-pointer">
                    <Plus size={20} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [isVisible, domRef] = useScrollAnimation(0.2);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/billing");
    } else {
      router.push("/sign-in");
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Perfect for trying out Chat Assistants",
      features: [
        "100 conversations/month",
        "1 team member",
        "Basic widget customization",
        "Email support",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/month",
      desc: "For growing businesses",
      features: [
        "Unlimited conversations",
        "5 team members",
        "Full widget customization",
        "Knowledge base uploads",
        "Priority support",
        "Analytics dashboard",
      ],
      cta: "Get Pro",
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For large organizations",
      features: [
        "Everything in Pro",
        "Unlimited team members",
        "VAPI voice integration",
        "Custom integrations",
        "Dedicated support",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      highlighted: false,
    },
  ];

  return (
    <section className="bg-[#050505] py-32 px-6" id="pricing">
      <div
        ref={domRef as React.RefObject<HTMLDivElement>}
        className="max-w-7xl mx-auto"
      >
        <h2
          className={`text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-6 text-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Pricing.
        </h2>
        <p
          className={`text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto transition-all duration-1000 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Simple, transparent pricing that grows with your business.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-[2.5rem] p-8 flex flex-col border transition-all duration-1000 transform ${
                plan.highlighted
                  ? "bg-gradient-to-b from-blue-900/30 to-black border-blue-500/50 scale-105"
                  : "bg-[#111] border-white/10"
              } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400 mt-2">{plan.desc}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleGetStarted}
                className={`w-full py-3 rounded-full font-medium transition-all ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  const [isVisible, domRef] = useScrollAnimation(0.3);
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <section className="bg-gradient-to-b from-[#050505] to-blue-950/20 py-32 px-6">
      <div
        ref={domRef as React.RefObject<HTMLDivElement>}
        className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm text-blue-400 font-medium">
            Ready to transform your support?
          </span>
        </div>
        <h2 className="text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-6">
          Start building better <br /> customer relationships.
        </h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Join thousands of businesses using Chat Assistants to deliver
          exceptional support experiences.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleGetStarted}
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all active:scale-95 text-lg"
          >
            {isSignedIn ? "Go to Dashboard" : "Get Started Free"}
            <ArrowRight size={20} />
          </button>
          <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border border-white/30 text-white font-medium hover:bg-white/10 transition-all text-lg">
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleNavClick = (path: string) => {
    if (path.startsWith("/")) {
      if (!isSignedIn && (path === "/" || path === "/billing")) {
        router.push("/sign-in");
      } else {
        router.push(path);
      }
    }
  };

  return (
    <footer className="bg-neutral-950 text-gray-500 text-xs py-10 px-6 border-t border-gray-900">
      <div className="max-w-[980px] mx-auto">
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-white">Chat Assistants</span>
          </div>
          <p>© 2026 Chat Assistants. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; overflow-x: hidden; }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @keyframes hero-text-in { 0% { opacity: 0; transform: scale(0.9) translateY(20px); filter: blur(10px); } 100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } }
        @keyframes button-pop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes gradient-reveal { 0% { transform: translateX(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateX(100%); opacity: 0; } }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 9s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-hero-text-in { animation: hero-text-in 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .animate-button-pop { animation: button-pop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-gradient-reveal { animation: gradient-reveal 2s ease-in-out infinite; }
        .glow-text { text-shadow: 0 0 20px rgba(255,255,255,0.3); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
      <Navbar />
      <main>
        <Hero />
        <StickyScrollText />
        <ProductDetails />
        <PlatformShowcase />
        <CarouselSection />
        <BentoGrid />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
