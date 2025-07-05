import { Poppins } from "next/font/google";
import "./globals.css";
import ErrorBoundary from '@/components/ErrorBoundary';
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: "FinanceFlow - Personal Finance Manager",
  description: "A modern, comprehensive personal finance management application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        <ErrorBoundary>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'white',
                color: '#374151',
                fontSize: '14px',
                fontWeight: '500',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              },
              success: {
                style: {
                  border: '1px solid #10B981',
                  background: '#F0FDF4',
                  color: '#065F46',
                },
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#F0FDF4',
                },
              },
              error: {
                style: {
                  border: '1px solid #EF4444',
                  background: '#FEF2F2',
                  color: '#991B1B',
                },
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#FEF2F2',
                },
              },
            }}
          />
        </ErrorBoundary>
      </body>
    </html>
  );
}
