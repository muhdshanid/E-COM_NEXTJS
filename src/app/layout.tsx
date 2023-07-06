import Navbar from '@/components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
const inter = Inter({ subsets: ['latin'] })
import SessionProvider from '@/components/SessionProvider'
export const metadata = {
  title: 'Flomazon',
  description: 'We make your wallet cry',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <Navbar/>
        <main className='p-4 m-auto '>
        {children}
        </main>
        <Footer/>
        </SessionProvider>
        </body> 
    </html>
  )
}
