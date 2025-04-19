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
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        ស្វាគមន៍​មកកាន់ JAvarb Store
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        ទិញម្នាក់មួយទៅ
      </p>
    </main>
  );
}
