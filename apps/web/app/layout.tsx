import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@workspace/ui/components/sonner";
const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <ClerkProvider
            appearance={{
              baseTheme: undefined,
              variables: {
                colorPrimary: "#3c82f6",
                colorBackground: "hsl(var(--background))",
                colorInputBackground: "hsl(var(--background))",
                colorInputText: "hsl(var(--foreground))",
                colorText: "hsl(var(--foreground))",
                colorTextSecondary: "hsl(var(--muted-foreground))",
              },
              elements: {
                rootBox: "text-foreground",
                card: "bg-card text-card-foreground border-border",
                headerTitle: "text-foreground",
                headerSubtitle: "text-muted-foreground",
                socialButtonsBlockButton:
                  "bg-background text-foreground border-border hover:bg-accent",
                formButtonPrimary:
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                footerActionLink: "text-primary hover:text-primary/90",
                formFieldLabel: "text-foreground",
                formFieldInput: "bg-background text-foreground border-border",
                identityPreview: "bg-background text-foreground border-border",
                identityPreviewText: "text-foreground",
                identityPreviewEditButton: "text-foreground",
                userButtonPopoverCard:
                  "bg-popover text-popover-foreground border-border",
                userButtonPopoverActionButton:
                  "text-foreground hover:bg-accent",
                userButtonPopoverActionButtonText: "text-foreground",
                userButtonPopoverFooter: "bg-popover border-border",
                organizationSwitcherTrigger:
                  "bg-background text-foreground border-border hover:bg-accent",
                organizationSwitcherPopoverCard:
                  "bg-popover text-popover-foreground border-border",
                organizationSwitcherPopoverActionButton:
                  "text-foreground hover:bg-accent",
                organizationSwitcherPopoverActionButtonText: "text-foreground",
                organizationPreview: "text-foreground",
                organizationPreviewTextContainer: "text-foreground",
                organizationPreviewMainIdentifier: "text-foreground",
                organizationPreviewSecondaryIdentifier: "text-muted-foreground",
                badge: "bg-primary/10 text-primary border-primary/20",
              },
            }}
          >
            <Providers>
              <Toaster />
              {children}
            </Providers>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
