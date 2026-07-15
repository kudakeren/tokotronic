export type GadgetCondition = "Like New" | "Very Good" | "Good" | "Fair";

export type GadgetProduct = {
  slug: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  marketNote: string;
  condition: GadgetCondition;
  location: string;
  warranty: string;
  image: string;
  seller: string;
  soldCount: number;
  specs: string[];
  description: string;
};

export const gadgetProducts: GadgetProduct[] = [
  {
    slug: "iphone-13-128gb-midnight",
    title: "iPhone 13 128GB Midnight",
    category: "iPhone",
    brand: "Apple",
    price: 6850000,
    marketNote: "Estimasi pasar bekas 2026 untuk unit normal ex iBox/inter.",
    condition: "Very Good",
    location: "Jakarta Barat",
    warranty: "Garansi toko 30 hari",
    image: "https://images.unsplash.com/photo-1632633173522-3bb13a5a557f?auto=format&fit=crop&w=900&q=85",
    seller: "TokoTronic Verified",
    soldCount: 42,
    specs: ["Battery health 86-90%", "Face ID normal", "Kamera jernih", "iOS siap update", "Fullset box replacement"],
    description: "Unit second terpilih dengan bodi mulus pemakaian wajar. Cocok untuk daily driver, konten, dan kebutuhan kerja mobile."
  },
  {
    slug: "iphone-12-pro-256gb-pacific-blue",
    title: "iPhone 12 Pro 256GB Pacific Blue",
    category: "iPhone",
    brand: "Apple",
    price: 7350000,
    marketNote: "Harga menyesuaikan kapasitas 256GB dan kondisi bodi.",
    condition: "Good",
    location: "Bandung",
    warranty: "Garansi toko 14 hari",
    image: "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?auto=format&fit=crop&w=900&q=85",
    seller: "Andalan Gadget",
    soldCount: 27,
    specs: ["Storage 256GB", "Triple camera normal", "True Tone aktif", "Bodi ada hairline", "Charger included"],
    description: "Pilihan iPhone Pro dengan storage lega untuk foto, video, dan aplikasi kerja. Sudah dicek fungsi dasar dan jaringan."
  },
  {
    slug: "samsung-galaxy-s23-256gb-cream",
    title: "Samsung Galaxy S23 256GB Cream",
    category: "Android",
    brand: "Samsung",
    price: 7600000,
    marketNote: "Kisaran bekas flagship Android Snapdragon dengan storage 256GB.",
    condition: "Like New",
    location: "Surabaya",
    warranty: "Garansi toko 45 hari",
    image: "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=900&q=85",
    seller: "Galaxy Corner",
    soldCount: 19,
    specs: ["Snapdragon 8 Gen 2", "RAM 8GB", "Storage 256GB", "Layar Dynamic AMOLED", "Kamera 50MP"],
    description: "Flagship compact dengan performa kencang, layar tajam, dan kamera stabil. Kondisi sangat terawat."
  },
  {
    slug: "samsung-galaxy-z-flip5-256gb",
    title: "Samsung Galaxy Z Flip5 256GB",
    category: "Android",
    brand: "Samsung",
    price: 9200000,
    marketNote: "Harga mengikuti kondisi engsel dan layar lipat.",
    condition: "Very Good",
    location: "Jakarta Selatan",
    warranty: "Garansi toko 30 hari",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=85",
    seller: "Foldable Lab",
    soldCount: 12,
    specs: ["Engsel rapat", "Cover screen normal", "Storage 256GB", "Dual camera", "Bodi mulus"],
    description: "HP lipat stylish untuk pengguna yang ingin device compact. Semua fungsi layar dan engsel sudah dicek."
  },
  {
    slug: "macbook-air-m1-2020-8-256",
    title: "MacBook Air M1 2020 8/256",
    category: "Laptop",
    brand: "Apple",
    price: 8250000,
    marketNote: "Kisaran bekas MacBook M1 normal dengan cycle count rendah-menengah.",
    condition: "Very Good",
    location: "Depok",
    warranty: "Garansi toko 30 hari",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=85",
    seller: "Mac Second ID",
    soldCount: 35,
    specs: ["Apple M1", "RAM 8GB", "SSD 256GB", "Battery normal", "Keyboard dan trackpad normal"],
    description: "Laptop ringan untuk kerja, kuliah, desain ringan, dan coding. Performa M1 masih sangat cukup untuk 2026."
  },
  {
    slug: "macbook-pro-m1-2020-8-512",
    title: "MacBook Pro M1 2020 8/512",
    category: "Laptop",
    brand: "Apple",
    price: 10800000,
    marketNote: "Lebih mahal dari Air karena storage 512GB dan cooling aktif.",
    condition: "Good",
    location: "Tangerang",
    warranty: "Garansi toko 21 hari",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85",
    seller: "Tronic Laptop",
    soldCount: 21,
    specs: ["Apple M1", "RAM 8GB", "SSD 512GB", "Touch Bar normal", "Cycle count aman"],
    description: "MacBook Pro M1 untuk kerja lebih intens, editing ringan, dan multitasking. Ada bekas pakai halus di bodi."
  },
  {
    slug: "ipad-air-5-64gb-wifi-blue",
    title: "iPad Air 5 64GB WiFi Blue",
    category: "Tablet",
    brand: "Apple",
    price: 6450000,
    marketNote: "Estimasi iPad M1 bekas WiFi only.",
    condition: "Very Good",
    location: "Yogyakarta",
    warranty: "Garansi toko 14 hari",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=900&q=85",
    seller: "Tablet House",
    soldCount: 17,
    specs: ["Chip M1", "Storage 64GB", "WiFi only", "Touch ID normal", "Support Apple Pencil 2"],
    description: "Tablet powerful untuk catatan, desain, meeting, dan konsumsi media. Layar bersih dan responsif."
  },
  {
    slug: "ipad-pro-11-2021-128gb",
    title: "iPad Pro 11 M1 128GB",
    category: "Tablet",
    brand: "Apple",
    price: 9100000,
    marketNote: "Kisaran iPad Pro M1 11 inci bekas unit normal.",
    condition: "Good",
    location: "Semarang",
    warranty: "Garansi toko 14 hari",
    image: "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=900&q=85",
    seller: "Pro Tablet Store",
    soldCount: 9,
    specs: ["ProMotion 120Hz", "Chip M1", "Storage 128GB", "Face ID normal", "Speaker stereo"],
    description: "iPad Pro second untuk kreator dan produktivitas. Cocok dipasangkan dengan keyboard dan Apple Pencil."
  },
  {
    slug: "apple-watch-series-8-45mm",
    title: "Apple Watch Series 8 45mm",
    category: "Wearable",
    brand: "Apple",
    price: 3550000,
    marketNote: "Kisaran smartwatch Apple bekas GPS 45mm.",
    condition: "Very Good",
    location: "Bekasi",
    warranty: "Garansi toko 14 hari",
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=85",
    seller: "Wearable ID",
    soldCount: 31,
    specs: ["GPS 45mm", "Sensor kesehatan normal", "Baterai normal", "Strap replacement", "Charger included"],
    description: "Smartwatch bekas untuk fitness, notifikasi, dan tracking aktivitas. Kondisi layar bersih."
  },
  {
    slug: "airpods-pro-2-usb-c",
    title: "AirPods Pro 2 USB-C",
    category: "Audio",
    brand: "Apple",
    price: 2750000,
    marketNote: "Harga mengikuti kelengkapan dan kondisi baterai case.",
    condition: "Like New",
    location: "Jakarta Pusat",
    warranty: "Garansi toko 7 hari",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=85",
    seller: "Audio Tronic",
    soldCount: 44,
    specs: ["ANC normal", "Transparency mode normal", "Case USB-C", "Eartips lengkap", "Serial dicek"],
    description: "TWS premium second untuk iPhone dan Android. Suara bersih, noise cancelling aktif, dan case normal."
  },
  {
    slug: "sony-wh-1000xm5-black",
    title: "Sony WH-1000XM5 Black",
    category: "Audio",
    brand: "Sony",
    price: 3950000,
    marketNote: "Kisaran headphone ANC flagship bekas mulus.",
    condition: "Very Good",
    location: "Malang",
    warranty: "Garansi toko 14 hari",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=900&q=85",
    seller: "HiFi Preloved",
    soldCount: 16,
    specs: ["ANC normal", "Bluetooth stabil", "Pad masih tebal", "Case bawaan", "Kabel audio included"],
    description: "Headphone wireless nyaman untuk kerja, musik, dan travel. Noise cancelling masih kuat."
  },
  {
    slug: "nintendo-switch-oled-white",
    title: "Nintendo Switch OLED White",
    category: "Gaming",
    brand: "Nintendo",
    price: 4150000,
    marketNote: "Kisaran console handheld bekas fullset.",
    condition: "Good",
    location: "Bogor",
    warranty: "Garansi toko 14 hari",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=900&q=85",
    seller: "GameHub Second",
    soldCount: 24,
    specs: ["Layar OLED", "Joy-Con normal", "Dock included", "Adaptor original", "Bodi ada bekas pakai"],
    description: "Console second untuk gaming keluarga dan portable. Semua tombol sudah dites normal."
  }
];

export function getGadgetProduct(slug: string) {
  return gadgetProducts.find((product) => product.slug === slug);
}
