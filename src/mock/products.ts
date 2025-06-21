/**
 * products.ts
 * Mock product data for development.
 */
import type { Product } from './types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mavi Basic Tişört',
    price: 350.0,
    description: 'Her gardıropta olması gereken, rahat ve şık bir basic tişört.',
    category: 'apparel',
  },
  {
    id: '2',
    name: 'Anker Soundcore Kulaklık',
    price: 1899.99,
    description: 'Yüksek kaliteli ses ve uzun pil ömrü sunan kablosuz kulaklık.',
    category: 'electronics',
  },
  {
    id: '3',
    name: 'Paşabahçe Kahve Kupası',
    price: 150.5,
    description: 'Sabah kahveleriniz için şık ve dayanıklı porselen kupa.',
    category: 'home_goods',
  },
  {
    id: '4',
    name: 'Gıpta Deri Defter',
    price: 250.0,
    description: 'Tüm notlarınız ve fikirleriniz için kaliteli deri kapaklı defter.',
    category: 'stationery',
  },
  {
    id: '5',
    name: 'Delta Yoga Matı',
    price: 550.0,
    description: 'Kaymaz yüzeyi ile yoga pratiğinizde konfor sağlar.',
    category: 'sports',
  },
  {
    id: '6',
    name: 'Xiaomi Mi Band 8',
    price: 899.99,
    description: 'Adımlarınızı sayın, nabzınızı ölçün ve bildirimlerinizi alın.',
    category: 'electronics',
  },
  {
    id: '7',
    name: 'Kurukahveci Mehmet Efendi Kahve',
    price: 120.5,
    description: 'Güne başlamak için zengin ve aromatik Türk kahvesi çekirdekleri.',
    category: 'groceries',
  },
  {
    id: '8',
    name: 'Lescon Koşu Ayakkabısı',
    price: 1250.0,
    description: 'Günlük koşularınız için hafif ve rahat tasarım.',
    category: 'sports',
  },
  {
    id: '9',
    name: 'LC Waikiki Kot Pantolon',
    price: 750.0,
    description: 'Dayanıklı ve modaya uygun, her zaman şık bir görünüm.',
    category: 'apparel',
  },
  {
    id: '10',
    name: 'Avize Aydınlatma Masa Lambası',
    price: 450.0,
    description: 'Çalışma alanınızı modern bir tasarımla aydınlatın.',
    category: 'home_goods',
  },
];
