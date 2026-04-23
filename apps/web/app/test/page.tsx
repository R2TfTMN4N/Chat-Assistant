"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  ChevronRight,
  Plus,
  X,
  Menu,
  Layers,
  Eye,
  Monitor,
  Smartphone,
  Cpu,
  Music,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Loader,
  Volume2,
} from "lucide-react";

// --- API Helpers ---
// const apiKey = ""; // API Key provided by environment

// // Defined explicitly at the top to avoid reference errors
// const callGeminiAPI = async (prompt, history = []) => {
//   try {
//     const systemPrompt = `You are the knowledgeable, friendly, and sophisticated AI concierge for the "Visionary Pro" spatial computer.
//     Key Specs:
//     - Dual-chip performance: M2 for computing, R1 for sensor processing.
//     - Display: Micro-OLED, 23 million pixels (more than 4K per eye).
//     - Audio: Personalized Spatial Audio with dynamic head tracking.
//     - Features: Infinite Canvas, Eyesight (reveals your eyes), 3D Photos.
//     - Price: Starts at $3,499.

//     Tone: Elegant, futuristic, helpful, concise. Use emojis sparingly but effectively (✨).
//     Goal: Answer user questions about the product and encourage them to book a demo.`;

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [
//             ...history.map((msg) => ({
//               role: msg.role,
//               parts: [{ text: msg.text }],
//             })),
//             { role: "user", parts: [{ text: prompt }] },
//           ],
//           systemInstruction: { parts: [{ text: systemPrompt }] },
//         }),
//       }
//     );

//     if (!response.ok) throw new Error(`API Error: ${response.status}`);
//     const data = await response.json();
//     return (
//       data.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "I'm having trouble connecting to the neural network right now."
//     );
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     return "Connection interrupted. Please try again later.";
//   }
// };

// const callGeminiTTS = async (text) => {
//   try {
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: text }] }],
//           generationConfig: {
//             responseModalities: ["AUDIO"],
//             speechConfig: {
//               voiceConfig: {
//                 prebuiltVoiceConfig: { voiceName: "Fenrir" },
//               },
//             },
//           },
//         }),
//       }
//     );

//     if (!response.ok) throw new Error(`TTS API Error: ${response.status}`);
//     const data = await response.json();
//     const base64Audio =
//       data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

//     if (base64Audio) {
//       const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
//       return audio;
//     }
//   } catch (error) {
//     console.error("TTS Error:", error);
//     return null;
//   }
// };

// --- Utility Hooks ---
const useScrollAnimation = (
  threshold = 0.1
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
      { threshold }
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
const HeadsetGraphic = ({ view = "front" }) => {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center ${view === "side" ? "scale-90" : "scale-100"}`}
    >
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
          <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000" />
            <stop offset="50%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
          <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="50%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {view === "front" ? (
          <g className="animate-float">
            <ellipse
              cx="400"
              cy="450"
              rx="200"
              ry="20"
              fill="black"
              opacity="0.5"
              filter="url(#softGlow)"
            />
            <path
              d="M 150 250 Q 400 160 650 250 L 650 320 Q 400 230 150 320 Z"
              fill="#1a1a1a"
            />
            <path
              d="M 150 250 Q 400 160 650 250"
              fill="none"
              stroke="#333"
              strokeWidth="2"
            />
            <path
              d="M 200 200 C 200 200, 300 170, 400 170 C 500 170, 600 200, 600 200 L 600 340 C 600 340, 500 390, 400 390 C 300 390, 200 340, 200 340 Z"
              fill="url(#metalGrad)"
            />
            <path
              d="M 205 205 C 205 205, 302 175, 400 175 C 498 175, 595 205, 595 205 L 595 335 C 595 335, 498 385, 400 385 C 302 385, 205 335, 205 335 Z"
              fill="url(#glassGrad)"
            />
            <path
              d="M 205 205 C 205 205, 302 175, 400 175 C 498 175, 595 205, 595 205 L 595 335 C 595 335, 498 385, 400 385 C 302 385, 205 335, 205 335 Z"
              fill="url(#movingReflection)"
              style={{ mixBlendMode: "overlay" }}
            />
            <circle
              cx="250"
              cy="350"
              r="5"
              fill="#111"
              stroke="#333"
              strokeWidth="1"
            />
            <circle
              cx="550"
              cy="350"
              r="5"
              fill="#111"
              stroke="#333"
              strokeWidth="1"
            />
          </g>
        ) : (
          <g className="animate-float-delayed">
            <path
              d="M 550 250 L 750 250"
              stroke="#333"
              strokeWidth="60"
              strokeLinecap="round"
            />
            <path
              d="M 200 200 Q 350 160 450 220 L 450 340 Q 350 400 200 360 Z"
              fill="url(#glassGrad)"
            />
            <path
              d="M 200 200 Q 180 280 200 360"
              fill="none"
              stroke="url(#metalGrad)"
              strokeWidth="16"
            />
            <path
              d="M 220 210 Q 320 190 400 230 L 400 320"
              fill="url(#movingReflection)"
              opacity="0.3"
            />
            <rect
              x="450"
              y="240"
              width="100"
              height="80"
              rx="15"
              fill="#1a1a1a"
              stroke="#333"
            />
          </g>
        )}
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
  // You might have other properties like color, radius, etc.
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
    []
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
      return; // Exit the effect if ctx is null
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
              Math.random() * canvas.height
            )
          );
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(135, 206, 250, ${p.opacity})`;
          ctx.fill();
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    for (let i = 0; i < 50; i++)
      particles.current.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        )
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

// --- Visionary Assistant ---
const VisionaryAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hello. I am your Visionary Assistant. Ask me anything about the new spatial computer. ✨",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    // const aiResponseText = await callGeminiAPI(input, messages);
    // setMessages((prev) => [...prev, { role: "model", text: aiResponseText }]);
    setLoading(false);
  };

  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 group ${isOpen ? "bg-zinc-800 rotate-45" : "bg-white/10 backdrop-blur-xl border border-white/20"}`}
      >
        {isOpen ? (
          <Plus className="text-white" />
        ) : (
          <Sparkles className="text-blue-400 animate-pulse" />
        )}
      </button>
      <div
        className={`fixed bottom-24 right-6 z-50 w-[350px] h-[500px] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none"}`}
      >
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-white">
            Visionary Intelligence
          </span>
        </div>
        <div
          ref={chatRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-white/10 text-gray-200 rounded-tl-none border border-white/5"}`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                <Loader className="w-4 h-4 animate-spin text-blue-400" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about specs, price..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-10 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
            >
              <ArrowRight className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/5 py-2" : "bg-transparent py-4"}`}
      >
        <div className="max-w-[980px] mx-auto px-6 h-10 flex justify-between items-center text-[12px] font-normal tracking-wide text-gray-200">
          <div className="flex items-center gap-4">
            <span className="font-semibold text-white text-[13px] cursor-pointer opacity-90 hover:opacity-100 transition-opacity">
              Visionary Pro
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Overview", "Guided Tour", "Tech Specs", "Enterprise"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-white hover:opacity-100 opacity-80 transition-all duration-200"
                >
                  {item}
                </a>
              )
            )}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button className="bg-white text-black px-3 py-1 rounded-full text-[11px] font-medium hover:bg-gray-100 transition-transform active:scale-95">
              Book a demo
            </button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-[11px] font-medium hover:bg-blue-500 transition-transform active:scale-95">
              Buy
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
            <a href="#">Overview</a>
            <a href="#">Guided Tour</a>
            <a href="#">Tech Specs</a>
            <div className="h-[1px] bg-gray-800 w-full my-2"></div>
            <button className="bg-blue-600 text-white w-full py-3 rounded-full text-sm">
              Buy Visionary Pro
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Hero = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <section className="relative min-h-[100vh] w-full flex flex-col items-center justify-start pt-32 md:pt-48 bg-black overflow-hidden">
      <ParticleBackground />
      <div className="absolute top-[-20%] left-0 right-0 h-[100vh] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none animate-pulse-slow"></div>
      <div className="z-20 text-center px-4">
        <div
          className={`transition-all duration-1000 ease-out transform ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="mb-6 flex justify-center items-center gap-2 opacity-90">
            <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)] animate-pulse"></div>
            <span className="text-xl font-semibold tracking-tight">
              Visionary Pro
            </span>
          </div>
        </div>
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.05] mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600 drop-shadow-2xl transition-all duration-1000 delay-200 ease-out transform pb-2 ${loaded ? "animate-hero-text-in opacity-100" : "opacity-0 translate-y-12"}`}
        >
          Welcome to the era <br /> of spatial computing.
        </h1>
        <div
          className={`flex items-center justify-center gap-5 transition-all duration-1000 delay-500 ease-out transform ${loaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-100 transition-all active:scale-95 animate-button-pop">
            Book a demo
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white/30 text-white font-medium hover:bg-white/10 backdrop-blur-sm transition-all group">
            Watch the film{" "}
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
          <HeadsetGraphic view="front" />
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
      className="relative bg-zinc-950 h-[150vh] flex flex-col items-center justify-start pt-20"
    >
      <div className="sticky top-1/2 -translate-y-1/2 w-full max-w-4xl px-6 text-center z-20">
        <p
          className={`text-3xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-gray-500 transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
        >
          Visionary Pro blends{" "}
          <span className="text-white relative inline-block overflow-hidden pb-2">
            digital content
            <span
              className={`absolute inset-0 bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-sm animate-gradient-reveal ${isVisible ? "" : "opacity-0"}`}
            ></span>
          </span>{" "}
          with your physical space. <br />
          <br />
          <span
            className={`block transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            So you can do the things you love in ways{" "}
            <span className="text-white relative inline-block overflow-hidden pb-2">
              never before possible.
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
            Precision. <br /> Craftsmanship.
          </h2>
          <p className="text-2xl font-medium text-gray-400 max-w-md leading-relaxed">
            A singular piece of three-dimensionally formed laminated glass flows
            into an aluminum alloy frame that curves to wrap around your face.
          </p>
          <button className="text-blue-400 hover:text-blue-300 text-lg font-medium flex items-center gap-2 group mt-4">
            Learn more about design{" "}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div
          className={`order-1 md:order-2 relative h-[500px] w-full flex items-center justify-center group transition-all duration-1000 delay-300 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          <div className="w-full h-full transform transition-transform duration-1000 hover:scale-105 hover:rotate-1 cursor-pointer drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]">
            <HeadsetGraphic view="side" />
          </div>
        </div>
      </div>
    </section>
  );
};

// --- VisionOS Horizontal Scroll Section (REVISED) ---
const VisionOSSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalHeight = rect.height - viewportHeight;

      // Calculate progress: 0 at top of viewport, 1 at bottom
      let progress = 0;
      if (rect.top <= 0) {
        progress = Math.abs(rect.top) / totalHeight;
      }
      // Clamp values
      if (rect.top > 0) progress = 0;
      if (Math.abs(rect.top) >= totalHeight) progress = 1;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const apps = [
    {
      name: "Safari",
      img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Photos",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Messages",
      img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Music",
      img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Mindfulness",
      img: "https://images.unsplash.com/photo-1518005052357-e93055054683?q=80&w=2073&auto=format&fit=crop",
    },
  ];

  return (
    // Height reduced to 300vh to prevent "gap" feeling
    <section ref={sectionRef} className="relative h-[300vh] bg-[#020204]">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center bg-[#020204]">
        {/* Background Elements */}
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 blur-3xl transform scale-110 transition-transform duration-1000"
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
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              visionOS
            </h3>
            <h2 className="text-5xl md:text-8xl font-semibold text-white tracking-tighter">
              An operating system <br /> designed for spatial.
            </h2>
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          className="flex gap-12 pl-[40vw] items-center will-change-transform relative z-20"
          style={{ transform: `translateX(${-scrollProgress * 2500}px)` }}
        >
          {apps.map((app, i) => (
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
                src={app.img}
                alt={app.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute bottom-6 left-6">
                <span className="text-2xl font-medium text-white drop-shadow-md">
                  {app.name}
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
      title: "Persona",
      desc: "With striking realism and expressiveness, your Persona lets others see a dynamic, natural representation of you.",
      image:
        "https://images.unsplash.com/photo-1516575334481-f85287c2c81d?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "FaceTime",
      desc: "In FaceTime, each participant appears in your space within a tile that you can adjust in scale. Spatial Audio makes it feel real.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop",
    },
    {
      title: "SharePlay",
      desc: "Stream TV shows, movies, and games with friends and family, and see everyone's reactions in real time.",
      image:
        "https://images.unsplash.com/photo-1495615080073-6b09c2594845?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Photos",
      desc: "Step into your memories with immersive spatial photos and videos that transport you back to a moment in time.",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop",
    },
  ];

  return (
    <section className="bg-[#080808] py-32 relative">
      <div className="max-w-[980px] mx-auto px-6 mb-12 flex justify-between items-end">
        <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
          Connect.
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
            className="snap-center shrink-0 w-[85vw] md:w-[420px] flex flex-col gap-6 group"
          >
            <div className="relative aspect-video md:aspect-square rounded-[2rem] overflow-hidden cursor-pointer">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60"></div>
              <div className="absolute inset-0 ring-1 ring-white/10 rounded-[2rem] group-hover:ring-white/30 transition-all duration-500"></div>
            </div>
            <div className="transform transition-all duration-300 group-hover:translate-x-2">
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {item.desc}
              </p>
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
      title: "Infinite Canvas",
      subtitle: "Apps",
      desc: "Arrange apps anywhere and scale them to the perfect size.",
      col: "md:col-span-2",
      icon: <Layers className="w-8 h-8 text-blue-400" />,
      bg: "from-gray-900 to-black",
    },
    {
      title: "Entertainment",
      subtitle: "Theater",
      desc: "Expand your movies, shows, and games to the perfect size.",
      col: "md:col-span-1",
      icon: <Monitor className="w-8 h-8 text-purple-400" />,
      bg: "from-gray-950 to-black",
    },
    {
      title: "Photos & Videos",
      subtitle: "Memories",
      desc: "Experience your memories in 3D spatial audio.",
      col: "md:col-span-1",
      icon: <Eye className="w-8 h-8 text-orange-400" />,
      bg: "from-gray-950 to-black",
    },
    {
      title: "Connection",
      subtitle: "Collaboration",
      desc: "Make meetings meaningful with life-size video tiles and spatial audio.",
      col: "md:col-span-2",
      icon: <Smartphone className="w-8 h-8 text-green-400" />,
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
            Experiences.
          </h2>
          <button className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors mt-6 md:mt-0">
            Experience Visionary Pro
          </button>
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

const Technology = () => {
  const [isVisible, domRef] = useScrollAnimation(0.2);
  const [audioPlaying, setAudioPlaying] = useState(false);
  // const playAudioDemo = async () => {
  //   if (audioPlaying) return;
  //   setAudioPlaying(true);
  //   const audio = await callGeminiTTS(
  //     "Say in a deep, cinematic, whispery voice: 'This is the sound of Visionary Pro. With dual-driver audio pods, sound is positioned precisely in the space around you, making it feel like it's coming from everywhere. It is not just sound. It is a feeling.'"
  //   );
  //   if (audio) {
  //     audio.onended = () => setAudioPlaying(false);
  //     audio.play();
  //   } else {
  //     setAudioPlaying(false);
  //   }
  // };

  return (
    <section className="bg-[#050505] py-32 px-6">
      <div
        ref={domRef as React.RefObject<HTMLDivElement>}
        className="max-w-7xl mx-auto"
      >
        <h2
          className={`text-5xl md:text-7xl font-semibold text-white tracking-tighter mb-16 text-center transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
        >
          Technology.
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div
            className={`bg-[#111] rounded-[2.5rem] p-12 flex flex-col items-center text-center border border-white/5 overflow-hidden relative group transition-all duration-1000 delay-100 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            <div className="relative z-10">
              <div className="flex gap-4 justify-center mb-8">
                <div className="w-24 h-24 bg-black border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-500">
                  <span className="text-3xl font-bold text-gray-300">M2</span>
                </div>
                <div className="w-24 h-24 bg-black border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:border-purple-500/30 transition-all duration-500 delay-75">
                  <span className="text-3xl font-bold text-gray-300">R1</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Dual-chip performance.
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">
                A powerful M2 chip runs visionOS, while the brand-new R1 chip is
                dedicated to processing input from cameras, sensors, and
                microphones.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          <div
            className={`bg-[#111] rounded-[2.5rem] p-12 flex flex-col items-center text-center border border-white/5 overflow-hidden relative group transition-all duration-1000 delay-300 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}
          >
            <div className="relative z-10">
              <div className="mb-8 w-full flex justify-center">
                <button
                  // onClick={playAudioDemo}
                  disabled={audioPlaying}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${audioPlaying ? "bg-blue-600 scale-110 shadow-[0_0_60px_rgba(37,99,235,0.6)]" : "bg-white/10 hover:bg-white/20 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"}`}
                >
                  {audioPlaying ? (
                    <div className="flex gap-1 h-6 items-center">
                      <div className="w-1 bg-white animate-[bounce_1s_infinite] h-3"></div>
                      <div className="w-1 bg-white animate-[bounce_1.2s_infinite] h-6"></div>
                      <div className="w-1 bg-white animate-[bounce_0.8s_infinite] h-4"></div>
                    </div>
                  ) : (
                    <Volume2 className="w-10 h-10 text-white" />
                  )}
                </button>
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                Spatial Audio ✨
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">
                Dual-driver audio pods deliver Personalized Spatial Audio
                positioned right next to each ear. Tap the icon to hear the
                difference.
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-gray-500 text-xs py-10 px-6 border-t border-gray-900">
      <div className="max-w-[980px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {[1, 2, 3, 4, 5].map((col) => (
            <div key={col} className="flex flex-col gap-2">
              <span className="font-semibold text-white mb-1">
                Section {col}
              </span>
              <a href="#" className="hover:underline">
                Link One
              </a>
              <a href="#" className="hover:underline">
                Link Two
              </a>
              <a href="#" className="hover:underline">
                Link Three
              </a>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>Copyright © 2024 Visionary Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <a href="#" className="hover:underline">
              Sales
            </a>
            <a href="#" className="hover:underline">
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Test() {
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
      <VisionaryAssistant />
      <main>
        <Hero />
        <StickyScrollText />
        <ProductDetails />
        <VisionOSSection />
        <CarouselSection />
        <BentoGrid />
        <Technology />
      </main>
      <Footer />
    </div>
  );
}
