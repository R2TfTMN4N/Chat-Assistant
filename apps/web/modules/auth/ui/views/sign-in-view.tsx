"use client";
import { SignIn } from "@clerk/nextjs";

export const SignInView = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        <SignIn
          routing="hash"
          appearance={{
            layout: {
              socialButtonsVariant: "blockButton",
            },
            elements: {
              rootBox: "w-full",
              card: "bg-background/80 backdrop-blur-xl shadow-2xl border border-border/50 rounded-2xl",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton:
                "bg-background hover:bg-muted border border-border/50 transition-all hover:scale-[1.02] active:scale-[0.98]",
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]",
              formFieldInput:
                "bg-background/50 border-border/50 focus:border-primary focus:ring-primary/20",
              footerAction: "text-muted-foreground",
              footer: { display: "none" },
            },
          }}
        />
      </div>
    </div>
  );
};
