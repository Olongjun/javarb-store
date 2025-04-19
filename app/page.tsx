import Image from "next/image";
import Header from './components/Header';
import ProductCard from './components/ProductCard';

const featuredProducts = [
  {
    id: '1',
    title: 'Minecraft Java & Bedrock',
    price: 10.50,
    imageUrl: '/images/minecraft.jpg'
  },
  {
    id: '2',
    title: 'Grand Theft Auto V',
    price: 12.50,
    imageUrl: '/images/gta5.jpg'
  },
  {
    id: '3',
    title: 'Fortnite Account',
    price: 4.99,
    imageUrl: '/images/fortnite.jpg'
  },
  {
    id: '4',
    title: 'Call of Duty Account',
    price: 69.99,
    imageUrl: '/images/cod.jpg'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ស្វាគមន៍​មកកាន់ JAvarb Store
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              ទិញម្នាក់មួយទៅ
            </p>
          </div>

          {/* Featured Products */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              ផលិតផលពេញនិយម
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
