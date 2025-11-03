import HeroBanner from '@/components/home/HeroBanner'
import ProductGrid from '@/components/home/ProductGrid'
import SponsoredProducts from '@/components/home/SponsoredProducts'
import Footer from '@/components/Layout/Footer'
import Navbar from '@/components/Layout/Navbar'

const Home = () => {
  return (
    <div className='min-h-screen bg-background'>
      {/* navbar/header here */}
      <Navbar/>
      {/* main content */}
      <main className='container mx-auto px-4 py-8 space-y-12'>

        {/* Hero banner */}
         <HeroBanner/>

        {/* Sponsored Products */}

        <SponsoredProducts/>

        {/* Feature Products */}
        <ProductGrid title='Featured Products'
        viewAllLink='/products/featured'
        />
        {/* New Arrival */}
        <ProductGrid title = "New Arrivals" viewAllLink='/products/new' />

        {/* Most Popular */}

        <ProductGrid title='Most Popular'
        viewAllLink='/products/popular'
        />

        



      </main>
     
      {/* footer here */}
      <Footer/>
    </div>
  )
}

export default Home;