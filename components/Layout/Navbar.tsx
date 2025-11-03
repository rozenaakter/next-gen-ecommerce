"use client"
import { Badge, Menu, Search, ShoppingCart, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react'
import { Input } from '../ui/input';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '../ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface Category {
  id: string;
  name: string;
  slug: string;
  children?: Category[]; 
}

// Mock categories data - in real app, fetch from API
const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    children: [
      { id: "1-1", name: "Smartphones", slug: "smartphones" },
      { id: "1-2", name: "Laptops", slug: "laptops" },
      { id: "1-3", name: "Tablets", slug: "tablets" },
    ],
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    children: [
      { id: "2-1", name: "Men's Clothing", slug: "mens-clothing" },
      { id: "2-2", name: "Women's Clothing", slug: "womens-clothing" },
      { id: "2-3", name: "Accessories", slug: "accessories" },
    ],
  },
  {
    id: "3",
    name: "Home & Garden",
    slug: "home-garden",
    children: [
      { id: "3-1", name: "Furniture", slug: "furniture" },
      { id: "3-2", name: "Decor", slug: "decor" },
      { id: "3-3", name: "Kitchen", slug: "kitchen" },
    ],
  },
];

// CategoryMenu component
const CategoryMenu = () => (
  <NavigationMenuList className='space-x-1'>
    {categories.map((category) => (
      <NavigationMenuItem key={category.id}>
        {category.children && category.children.length > 0 ? (
          <>
            <NavigationMenuTrigger>
              {category.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent >
              <div className="grid w-[250px] gap-3 p-4 md:w-[300px] md:grid-cols-2 lg:w-[400px]">
                {category.children.map((child) => (
                  <NavigationMenuLink key={child.id} asChild>
                    <Link
                      href={`/category/${child.slug}`}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        {child.name}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                ))}
              </div>
            </NavigationMenuContent>
          </>
        ) : (
          <NavigationMenuLink asChild>
            <Link
              href={`/category/${category.slug}`}
              className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            >
              {category.name}
            </Link>
          </NavigationMenuLink>
        )}
      </NavigationMenuItem>
    ))}
  </NavigationMenuList>
);

const Navbar = () => {
  const [session, setSession] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(6);

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
      isScrolled ? "shadow-sm" : ""
    }`}>
      {/* Top bar */}
      <div className='container mx-auto px-4'>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                N
              </span>
            </div>
            <span className="font-bold text-xl">Next-G Ecommerce</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-6'>
            <NavigationMenu>
              <CategoryMenu />
            </NavigationMenu>
          </div>

          {/* Right side action */}
          <div className='flex items-center space-x-2'>
            {/* Mobile Search */}
            <Sheet>
              <SheetTrigger asChild className='md:hidden'>
                <Button variant="ghost" size="icon">
                  <Search className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent className='h-auto'>
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                  <Input 
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4"
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* User Account */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' size="icon">
                  <User className='h-5 w-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {session ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href='/orders'>Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                    // onClick={() => signout()}
                    >Sign Out</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login">Login</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register">Register</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 ? (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center">
                    {cartItemsCount}
                  </Badge>
                ) : null}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet >
              <SheetTrigger asChild className='lg:hidden'>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-80 bg-amber-100 p-4">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link href="/" className="font-bold text-xl">
                    Next-G Ecommerce
                  </Link>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <Link
                          href={`/category/${category.slug}`}
                          className="block py-2 text-sm font-medium hover:text-primary"
                        >
                          {category.name}
                        </Link>
                        {category.children && (
                          <div className="ml-4 space-y-1">
                            {category.children.map((child) => (
                              <Link
                                key={child.id}
                                href={`/category/${child.slug}`}
                                className="block py-1 text-sm text-muted-foreground hover:text-primary"
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Categories Bar */}
        <div className="lg:hidden border-t">
          <div className="flex overflow-x-auto space-x-4 py-2 px-4 scrollbar-hide">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="whitespace-nowrap text-sm font-medium hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;