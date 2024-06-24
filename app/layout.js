import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StyleSphere",
  description: "",
  icons: {
    icon: '/icons8-favicon.gif', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      
        
      </body>
    </html>
  );
}
