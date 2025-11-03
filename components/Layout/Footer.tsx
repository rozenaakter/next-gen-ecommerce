import { Facebook, Instagram, Mail, MapPin, Phone, X, Youtube } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-muted/50 border-t'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info start here*/}

          <div className='space-y-4'>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                 <span className="text-primary-foreground font-bold text-sm">
                  N
                </span>
              </div>
              <span className="font-bold text-xl">Next-G Ecommerce</span>

            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your trusted online shopping destination for quality products at
              great prices.
            </p>
            <div className='flex space-x-4'>
              <Link href="#" className='text-muted-foreground hover:text-primary transition-colors'>
                <Facebook className='h-5 w-5' />
              </Link>
              <Link href="#" className='text-muted-foreground hover:text-primary transition-colors'>
                <X className='h-5 w-5' />
              </Link>
              <Link href="#" className='text-muted-foreground hover:text-primary transition-colors'>
                <Instagram className='h-5 w-5' />
              </Link>
              <Link href="#" className='text-muted-foreground hover:text-primary transition-colors'>
                <Youtube className='h-5 w-5' />
              </Link>
            </div>


          </div>
          {/* Company Info end here*/}
          
          {/* Quick Link start here*/}

          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Quick Link</h3>
            <ul className='space-y-2'>
              <li >
                <Link href= "/about" className='text-muted-foreground text-sm hover:text-primary transition-colors'>About Us</Link>
              </li>
               <li >
                <Link href= "/contact" className='text-muted-foreground text-sm hover:text-primary transition-colors'>Contact Us</Link>
              </li>
               <li >
                <Link href= "/faq" className='text-muted-foreground text-sm hover:text-primary transition-colors'>FAQ</Link>
              </li>
               <li >
                <Link href= "/blog" className='text-muted-foreground text-sm hover:text-primary transition-colors'>Blog</Link>
              </li>
               <li >
                <Link href= "/careers" className='text-muted-foreground text-sm hover:text-primary transition-colors'>Careers</Link>
              </li>
            </ul>

          </div>
          {/* Quick Link end here*/}

          {/* Customer Service start here*/}

          <div className='space-y-4'>
            <h3 className='font-semibold text-lg'>Customer Service</h3>
            <ul className='space-y-2'>
              <li>
                <Link href= "/shipping"
                className='text-sm text-muted-foreground hover:text-primary transition-colors'
                >
                Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href= "/returns"
                className='text-sm text-muted-foreground hover:text-primary transition-colors'
                >
               Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href= "/warranty"
                className='text-sm text-muted-foreground hover:text-primary transition-colors'
                >
                Warranty
                </Link>
              </li>
              <li>
                <Link href= "/payment"
                className='text-sm text-muted-foreground hover:text-primary transition-colors'
                >
                Payment Methods
                </Link>
              </li>
              <li>
                <Link href= "/track-order"
                className='text-sm text-muted-foreground hover:text-primary transition-colors'
                >
                Track Order
                </Link>
              </li>

            </ul>

          </div>

          {/* Customer Service end here*/}

          {/* Contact info start here*/}

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  +881760000000
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  support@nextgecommer.com
                </span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  dhaka Bangladesh
                  <br />
                  Mohammadpur
                  <br />
                  1207
                </span>
              </div>
            </div>


          {/* Contact info end here*/}

          {/* Newsletter start here*/}

          <div className="space-y-2">
              <h4 className="font-medium text-sm">
                Subscribe to our newsletter
              </h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          

          {/* Newsletter end here*/}
        </div>
        {/* Bottom bar start here */}

         {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 Next-G Ecommerce. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>


      </div>

    </footer>
  )
}

export default Footer