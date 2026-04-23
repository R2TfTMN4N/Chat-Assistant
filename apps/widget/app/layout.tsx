import { Inter } from "next/font/google";

import { Providers } from "@/components/providers";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Inter({
  subsets: ["latin"],
  variable: "--font-mono",
});
export const metadata = {
  title: "Chat-Assistants",
  description: "Chat-Assistants",
};

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
          <Providers>
            <div className="w-screen h-screen">{children}</div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
