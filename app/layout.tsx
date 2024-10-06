import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import AppContextProvider from "@/components/AppContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "RLexicon - Setup your Blog in Minutes",
    template: `%s | ${"RLexicon - Setup your Blog in Minutes"}`,
  },
  description: "Unleash the power of content creation with RLexicon—the ultimate Blog SaaS platform. Manage blogs, collaborate with your team, and grow your audience—all in one place.",
  keywords: [
    "Next.js",
    "React",
    "Javascript",
    "Prisma",
    "Supabase",
    "Rishab Lath",
    "Blog",
    "RLexicon",
    "Blog SaaS",
    "Content Creation",
    "Content Management",
    "Tailwind CSS",
    "Radix UI",
    "Server Components",
    "Shadcnui",
  ],
  authors: [
    {
      name: "Rishab Lath",
      url: "https://github.com/Rishablath14",
    },
  ],
  creator: "Rishab Lath",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rlexicon.vercel.app",
    title: "RLexicon - Setup your Blog in Minutes",
    description: "Unleash the power of content creation with RLexicon—the ultimate Blog SaaS platform. Manage blogs, collaborate with your team, and grow your audience—all in one place.",
    siteName: "RLexicon - Setup your Blog in Minutes",
  },
  twitter: {
    card: "summary_large_image",
    title: "RLexicon - Setup your Blog in Minutes",
    description: "Unleash the power of content creation with RLexicon—the ultimate Blog SaaS platform. Manage blogs, collaborate with your team, and grow your audience—all in one place.",
    images: ["/home.png"],
    creator: "@rishablath14",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <AppContextProvider>
        {children}
        </AppContextProvider>    
        <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
