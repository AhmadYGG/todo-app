import "../styles/globals.css";
import { ReactNode } from 'react'
import Header from '../components/Header'

export const metadata = {
  title: 'Noverra ToDo',
  description: 'Simple task manager for Noverra Roleplay',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto p-4">
          <Header />
          <main className="mt-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
