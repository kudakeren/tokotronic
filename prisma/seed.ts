import { Prisma, PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { USER_STARTING_BALANCE } from "../src/lib/starting-balance";

const prisma = new PrismaClient();

const categories = [
  ["iPhone", "iphone", "Smartphone", "iPhone bekas original dan siap pakai"],
  ["Android", "android", "Smartphone", "Samsung, Xiaomi, Oppo, Vivo, dan Android bekas lain"],
  ["Laptop", "laptop", "Laptop", "MacBook dan laptop Windows second"],
  ["Tablet", "tablet", "Tablet", "iPad dan tablet Android bekas"],
  ["Wearable", "wearable", "Watch", "Smartwatch dan wearable second"],
  ["Audio", "audio", "Headphones", "AirPods, headphone, dan speaker bekas"],
  ["Gaming", "gaming", "Gamepad2", "Console dan aksesoris gaming second"],
  ["Aksesoris", "aksesoris", "Boxes", "Charger, keyboard, case, dan aksesoris original"]
];

function product(categorySlug: string, name: string, providerName: string, price: number, fee = 1000) {
  return { categorySlug, name, providerName, price, fee };
}

const productRows = [
  product("iphone", "iPhone 13 128GB Midnight - Very Good", "Apple", 6850000, 0),
  product("iphone", "iPhone 12 Pro 256GB Pacific Blue - Good", "Apple", 7350000, 0),
  product("android", "Samsung Galaxy S23 256GB Cream - Like New", "Samsung", 7600000, 0),
  product("android", "Samsung Galaxy Z Flip5 256GB - Very Good", "Samsung", 9200000, 0),
  product("laptop", "MacBook Air M1 2020 8/256 - Very Good", "Apple", 8250000, 0),
  product("laptop", "MacBook Pro M1 2020 8/512 - Good", "Apple", 10800000, 0),
  product("tablet", "iPad Air 5 64GB WiFi Blue - Very Good", "Apple", 6450000, 0),
  product("tablet", "iPad Pro 11 M1 128GB - Good", "Apple", 9100000, 0),
  product("wearable", "Apple Watch Series 8 45mm - Very Good", "Apple", 3550000, 0),
  product("audio", "AirPods Pro 2 USB-C - Like New", "Apple", 2750000, 0),
  product("audio", "Sony WH-1000XM5 Black - Very Good", "Sony", 3950000, 0),
  product("gaming", "Nintendo Switch OLED White - Good", "Nintendo", 4150000, 0)
];

async function main() {
  await prisma.notification.deleteMany();
  await prisma.activityLog.deleteMany();
  await prisma.commission.deleteMany();
  await prisma.referral.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.balanceMutation.deleteMany();
  await prisma.deposit.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.voucherOrder.deleteMany();
  await prisma.foodVoucher.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.provider.deleteMany();
  await prisma.promo.deleteMany();
  await prisma.sellerProfile.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const provider = await prisma.provider.create({
    data: { name: "Tokotronic Seller Network", code: "TOKOTRONIC", baseUrl: "https://seller.tokotronicindo.local/api", apiKeyMasked: "tk_live_****_masked", priority: 1 }
  });

  const categoryMap = new Map<string, string>();
  for (const [name, slug, icon, description] of categories) {
    const category = await prisma.productCategory.create({ data: { name, slug, icon, description } });
    categoryMap.set(slug, category.id);
  }

  for (const row of productRows) {
    const code = row.name.toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "");
    await prisma.product.create({
      data: {
        categoryId: categoryMap.get(row.categorySlug)!,
        providerId: provider.id,
        name: row.name,
        code,
        providerName: row.providerName,
        type: row.categorySlug,
        description: `${row.name}. Unit bekas dicek fungsi layar, kamera, baterai, jaringan, tombol, dan kelengkapan.`,
        costPrice: new Prisma.Decimal(row.price * 0.9),
        sellPrice: new Prisma.Decimal(row.price),
        adminFee: new Prisma.Decimal(row.fee)
      }
    });
  }

  const admin = await prisma.user.create({
    data: {
      name: "Admin Tokotronicindo",
      email: "admin@tokotronicindo.com",
      phone: "081111111111",
      password: await hash("admin123456", 12),
      role: "ADMIN",
      balance: 10000000,
      referralCode: "ADMINTRO"
    }
  });

  const seller = await prisma.user.create({
    data: {
      name: "Reseller Gadget Approved",
      email: "seller@tokotronicindo.com",
      phone: "083333333333",
      password: await hash("seller123456", 12),
      role: "SELLER",
      balance: 250000,
      referralCode: "SELLERGADGET",
      sellerProfile: {
        create: {
          storeName: "Tronic Second Store",
          storeSlug: "tronic-second-store",
          description: "Reseller gadget bekas verified untuk iPhone, Android, MacBook, tablet, dan audio original.",
          address: "Jl. Gadget Second No. 1",
          city: "Jakarta",
          status: "APPROVED",
          approvedAt: new Date()
        }
      }
    }
  });

  await prisma.user.create({
    data: {
      name: "Reseller Gadget Pending",
      email: "sellerpending@tokotronicindo.com",
      phone: "084444444444",
      password: await hash("seller123456", 12),
      role: "SELLER",
      balance: 0,
      referralCode: "GADGETPEND",
      sellerProfile: {
        create: {
          storeName: "Gadget Menunggu",
          storeSlug: "gadget-menunggu",
          description: "Reseller gadget pending untuk test approval admin.",
          address: "Jl. Approval No. 2",
          city: "Bandung"
        }
      }
    }
  });

  const user = await prisma.user.create({
    data: {
      name: "Buyer Gadget Demo",
      email: "user@tokotronicindo.com",
      phone: "082222222222",
      password: await hash("user123456", 12),
      balance: USER_STARTING_BALANCE,
      referralCode: "USERGADGET",
      referredById: admin.id
    }
  });

  const foodCategoryId = categoryMap.get("aksesoris")!;
  const foodVouchers = [
    ["Charger iPhone 20W Original", "Adaptor USB-C 20W second original, fungsi normal.", 185000, 8],
    ["Magic Keyboard iPad 11 Inch", "Keyboard iPad bekas, tombol normal, ada pemakaian ringan.", 1650000, 3],
    ["Case MacBook Air M1 Clear", "Hardcase MacBook Air M1 kondisi mulus.", 95000, 15],
    ["Apple Pencil 2 Bekas", "Apple Pencil Gen 2 second, pairing dan charging normal.", 1350000, 5]
  ];

  for (const [title, description, price, stock] of foodVouchers) {
    await prisma.foodVoucher.create({
      data: {
        sellerId: seller.id,
        categoryId: foodCategoryId,
        title: String(title),
        code: String(title).toUpperCase().replace(/[^A-Z0-9]+/g, "_"),
        description: String(description),
        restaurant: "Tronic Second Store",
        city: "Jakarta",
        price: Number(price),
        stock: Number(stock),
        validUntil: new Date("2027-01-01")
      }
    });
  }

  const products = await prisma.product.findMany({ take: 8, include: { category: true } });
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const total = p.sellPrice.plus(p.adminFee);
    await prisma.transaction.create({
      data: {
        userId: user.id,
        productId: p.id,
        transactionNumber: `TRX-SEED-${String(i + 1).padStart(3, "0")}`,
        customerNumber: `08${Math.floor(1000000000 + Math.random() * 8999999999)}`,
        productName: p.name,
        categoryName: p.category.name,
        price: p.sellPrice,
        adminFee: p.adminFee,
        totalAmount: total,
        status: i % 5 === 0 ? "PENDING" : "SUCCESS",
        paidAt: i % 5 === 0 ? null : new Date()
      }
    });
  }
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
