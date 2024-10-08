import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from './components/contexts/UserContext'; // Ruta del archivo donde se define el contexto

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "StyleSphere",
  description: "",
  icons: {
    icon: '/icons8-favicon-94.png', 
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
