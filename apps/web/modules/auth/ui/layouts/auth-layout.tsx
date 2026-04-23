import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-muted/30">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Logo */}
      <div className="relative z-10 mb-8 flex flex-col items-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary shadow-xl shadow-primary/25 mb-4">
          <Image
            alt="Logo"
            src="/ai-chatbot-assistant-software-logo-cute-style-no-title-loook-str.svg"
            width={40}
            height={40}
            className="drop-shadow-lg dark:invert"
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Chat Assistants</h1>
        <p className="text-sm text-muted-foreground">
          AI-powered customer support
        </p>
      </div>

      {/* Auth content */}
      <div className="relative z-10">{children}</div>

      {/* Footer */}
      <div className="relative z-10 mt-8 text-center text-xs text-muted-foreground">
        <p>© 2026 Chat Assistants. All rights reserved.</p>
      </div>
    </div>
  );
};
export default AuthLayout;
