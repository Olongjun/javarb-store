"use client";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import PaymentModal from '../../components/PaymentModal';

const products = {
  '1': {
    id: '1',
    title: 'Minecraft Java & Bedrock',
    price: 10.50,
    imageUrl: '/images/minecraft.jpg',
    description: 'គណនី Minecraft ដែលមានទាំង Java និង Bedrock។',
    features: [
      'មានទាំង Java និង Bedrock',
      'គណនី Microsoft ពិតប្រាកដ',
      'អាចប្តូរសំបក និងឈ្មោះ',
      'អាចចូលលេងគ្រប់ Server និង Realms'
    ]
  },
  '2': {
    id: '2',
    title: 'Grand Theft Auto V',
    price: 12.50,
    imageUrl: '/images/gta5.jpg',
    description: 'គណនី GTA V ដែលអាចលេង GTA Online បាន។',
    features: [
      'អាចលេងហ្គេមពេញលេញ',
      'អាចលេង GTA Online',
      'គណនីស្អាតល្អ',
      'ទទួលបានភ្លាមៗ'
    ]
  },
  '3': {
    id: '3',
    title: 'Fortnite Account',
    price: 4.99,
    imageUrl: '/images/fortnite.jpg',
    description: 'គណនី Fortnite ដែលមានសំបកកម្រ និងអាយធឹមពិសេសៗ។',
    features: [
      'មានសំបកកម្រៗ',
      'មាន Battle Pass',
      'មាន V-Bucks ត្រៀមរួចរាល់',
      'កម្រិតគណនីខ្ពស់'
    ]
  },
  '4': {
    id: '4',
    title: 'Call of Duty Account',
    price: 69.99,
    imageUrl: '/images/cod.jpg',
    description: 'គណនី Call of Duty ដែលមានអាវុធ និងសំបកច្រើន។',
    features: [
      'អាចលេងបានច្រើនប្រភេទ',
      'មានអាវុធ និងសំបកច្រើន',
      'អាចលេង Warzone',
      'ត្រៀមខ្លួនរួចរាល់សម្រាប់ការប្រកួត'
    ]
  }
};

export default function ProductPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const productId = typeof params.id === 'string' ? params.id : '';
  const product = products[productId as keyof typeof products];

  const handleBuyNow = () => {
    if (product) {
      setIsPaymentModalOpen(true);
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Product not found
              </h2>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
            {/* Image gallery */}
            <div className="flex flex-col-reverse">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <div className="h-96 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                  {!imageError ? (
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={600}
                      height={600}
                      className="h-full w-full object-cover object-center"
                      onError={() => setImageError(true)}
                      onLoad={() => setIsLoading(false)}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-gray-400">Image not available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.title}
              </h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base text-gray-700 dark:text-gray-300">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="mt-10">
                  <button
                    onClick={handleBuyNow}
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Buy now
                  </button>
                </div>
              </div>

              <section className="mt-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Features</h3>
                <div className="mt-4">
                  <ul className="list-disc space-y-2 pl-4 text-sm">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        closeModal={() => setIsPaymentModalOpen(false)}
        productTitle={product.title}
        price={product.price}
      />
    </div>
  );
}
