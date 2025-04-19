import { NextResponse } from 'next/server';
import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = '5505582252';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const receipt = formData.get('receipt') as File;
    const buyerName = formData.get('buyerName') as string;
    const productTitle = formData.get('productTitle') as string;
    const price = formData.get('price') as string;
    const paymentMethod = formData.get('paymentMethod') as string;

    // Upload receipt to a storage service (e.g. Cloudinary, S3)
    // For now, we'll just simulate it
    const receiptUrl = 'https://example.com/receipt.jpg';

    // Send Telegram message
    const message = `🛍️ New Order!\n\n` +
      `👤 Buyer: ${buyerName}\n` +
      `🎮 Product: ${productTitle}\n` +
      `💰 Price: $${price}\n` +
      `💳 Payment: ${paymentMethod.toUpperCase()}\n` +
      `🧾 Receipt: ${receiptUrl}`;

    const inlineKeyboard = {
      inline_keyboard: [
        [
          { text: '✅ Confirm', callback_data: 'confirm' },
          { text: '❌ Fake', callback_data: 'fake' },
          { text: '🕐 More Info', callback_data: 'more_info' }
        ]
      ]
    };

    await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
      reply_markup: inlineKeyboard
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}
