import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { createClient } from "@/utils/supabase/server";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const baseUrl = process.env.BASE_URL
  ? `https://${process.env.BASE_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "ChineseName.club - AI Chinese Name Generator",
  description: "Discover your perfect Chinese name with our AI-powered generator. Get personalized names based on your personality, with cultural significance and detailed meanings.",
  keywords: "Chinese name generator, AI name generator, Chinese names, cultural names, personalized names, Chinese identity",
  openGraph: {
    title: "ChineseName.club - AI Chinese Name Generator",
    description: "Discover your perfect Chinese name with our AI-powered generator. Get personalized names based on your personality, with cultural significance and detailed meanings.",
    type: "website",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ChineseName.club - AI Chinese Name Generator",
    description: "Discover your perfect Chinese name with our AI-powered generator.",
  },
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Header user={user} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
