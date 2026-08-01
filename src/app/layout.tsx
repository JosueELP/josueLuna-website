import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from 'next/script'
import "./globals.css";
import { ThemeProvider } from "./theme-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Josue Luna",
  description: "Josue Luna personal website",
};

// Applies the persisted (or system) theme to <html> before first paint, so
// there is no light-theme flash for returning dark-theme visitors.
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
      <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      <ThemeProvider>{children}</ThemeProvider>
      <Script src="/js/scripts.js"/>
      </body>
    </html>
  );
}
