import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oscar Bonelli | AI Agent Lab",
  description:
    "Demos interactivas de agentes de IA para ventas, documentos y operaciones empresariales.",
};

const themeScript = `
  try {
    const saved = localStorage.getItem('ob-agent-theme');
    const dark = saved ? saved === 'dark' : true;
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (_) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-[#f7f9fc] text-slate-950 transition-colors duration-300 dark:bg-[#050914] dark:text-white">
        {children}
      </body>
    </html>
  );
}
