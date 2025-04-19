"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({ id, title, price, imageUrl }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl dark:shadow-gray-900/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        {!imageError ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={`object-cover transition-all duration-500 ${
              isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            onError={() => setImageError(true)}
            onLoad={() => setIsLoading(false)}
            priority={id === '1'}
            quality={90}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {isLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
            <div className="w-8 h-8 border-4 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-orange-500 dark:text-orange-400 font-medium">{formatPrice(price)}</p>
        <Link
          href={`/products/${id}`}
          className={`block w-full text-center py-2 rounded-md transition-all duration-300 ${
            isHovered 
              ? 'bg-orange-600 text-white transform -translate-y-1' 
              : 'bg-orange-500 text-white'
          }`}
        >
          ទិញឥឡូវនេះ
        </Link>
      </div>
    </div>
  );
}
