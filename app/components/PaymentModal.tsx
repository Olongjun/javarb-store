'use client';

import { useState } from 'react';
import Image from 'next/image';

interface PaymentModalProps {
  isOpen: boolean;
  closeModal: () => void;
  productTitle: string;
  price: number;
}

export default function PaymentModal({ isOpen, closeModal, productTitle, price }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'aba' | 'acleda'>('aba');
  const [buyerName, setBuyerName] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receipt || !buyerName) {
      setMessage('សូមបំពេញព័ត៌មានទាំងអស់');
      return;
    }

    setIsSubmitting(true);
    setMessage('កំពុងផ្ញើរ...');

    const formData = new FormData();
    formData.append('receipt', receipt);
    formData.append('buyerName', buyerName);
    formData.append('productTitle', productTitle);
    formData.append('price', price.toString());
    formData.append('paymentMethod', paymentMethod);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('✅ បងសូមរងចាំ ៥ នាទី បងអានឹងផ្ញើរផលិតផលទៅ!');
        setTimeout(() => {
          closeModal();
          setMessage('');
          setBuyerName('');
          setReceipt(null);
        }, 5000);
      } else {
        setMessage('❌ មានបញ្ហា សូមព្យាយាមម្តងទៀត');
      }
    } catch (error) {
      setMessage('❌ មានបញ្ហា សូមព្យាយាមម្តងទៀត');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">ការទូទាត់ប្រាក់</h2>
        
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300">ផលិតផល: {productTitle}</p>
          <p className="text-gray-600 dark:text-gray-300">តម្លៃ: ${price}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ជ្រើសរើសវិធីទូទាត់
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('aba')}
              className={`p-4 border rounded-lg ${
                paymentMethod === 'aba' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Image
                src="/images/aba-qr.png"
                alt="ABA QR Code"
                width={150}
                height={150}
                className="mx-auto"
              />
              <p className="text-center mt-2">ABA</p>
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('acleda')}
              className={`p-4 border rounded-lg ${
                paymentMethod === 'acleda' 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' 
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              <Image
                src="/images/acleda-qr.png"
                alt="ACLEDA QR Code"
                width={150}
                height={150}
                className="mx-auto"
              />
              <p className="text-center mt-2">ACLEDA</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="buyerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ឈ្មោះអ្នកទិញ
            </label>
            <input
              type="text"
              id="buyerName"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="receipt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              រូបថតបង្កាន់ដៃ
            </label>
            <input
              type="file"
              id="receipt"
              accept="image/*"
              onChange={(e) => setReceipt(e.target.files?.[0] || null)}
              className="w-full"
              required
            />
          </div>

          {message && (
            <div className={`mb-4 p-3 rounded ${
              message.startsWith('❌') 
                ? 'bg-red-100 text-red-700' 
                : message.startsWith('✅') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-100 text-blue-700'
            }`}>
              {message}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              disabled={isSubmitting}
            >
              បោះបង់
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'កំពុងផ្ញើរ...' : 'ផ្ញើរ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
