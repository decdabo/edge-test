import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthLayout } from './auth-layout'
import { AuthContextProvider } from '@/context/auth-context'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard Test Edge-America',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>
          <AuthLayout>
            {children}
          </AuthLayout>
        </AuthContextProvider>
      </body>
    </html>
  )
}
