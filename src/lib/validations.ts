import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nama minimal 3 karakter"),
    email: z.string().email("Email tidak valid"),
    phone: z.string().min(10, "Nomor HP tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8),
    referralCode: z.string().optional(),
    terms: z.boolean().optional()
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"]
  });

export const sellerRegisterSchema = registerSchema.and(
  z.object({
    storeName: z.string().min(3, "Nama toko minimal 3 karakter"),
    description: z.string().min(10, "Deskripsi toko minimal 10 karakter"),
    address: z.string().min(8, "Alamat toko wajib diisi"),
    city: z.string().min(2, "Kota wajib diisi")
  })
);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const createTransactionSchema = z.object({
  productId: z.string().min(1),
  customerNumber: z.string().min(3),
  customerName: z.string().optional()
});

export const createDepositSchema = z.object({
  method: z.enum(["BANK_TRANSFER", "QRIS", "VIRTUAL_ACCOUNT"]),
  amount: z.coerce.number().min(10000)
});

export const productSchema = z.object({
  categoryId: z.string().min(1),
  providerId: z.string().optional().nullable(),
  name: z.string().min(3),
  code: z.string().min(2),
  providerName: z.string().min(2),
  type: z.string().min(2),
  description: z.string().min(3),
  costPrice: z.coerce.number().min(0),
  sellPrice: z.coerce.number().min(0),
  adminFee: z.coerce.number().min(0),
  isActive: z.boolean().optional()
});

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  icon: z.string().min(1),
  description: z.string().min(3),
  isActive: z.boolean().optional()
});

export const userUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().min(10).optional(),
  image: z.string().url().optional().or(z.literal("")),
  role: z.enum(["USER", "SELLER", "ADMIN"]).optional(),
  status: z.enum(["ACTIVE", "SUSPENDED"]).optional()
});

export const createFoodVoucherSchema = z.object({
  categoryId: z.string().min(1),
  title: z.string().min(3),
  code: z.string().min(2),
  description: z.string().min(5),
  restaurant: z.string().min(2),
  city: z.string().min(2),
  price: z.coerce.number().min(1000),
  stock: z.coerce.number().int().min(0),
  validUntil: z.coerce.date(),
  isActive: z.boolean().optional()
});

export const buyVoucherSchema = z.object({
  voucherId: z.string().min(1)
});

export const adjustBalanceSchema = z.object({
  amount: z.coerce.number().refine((value) => value !== 0, "Nominal tidak boleh nol"),
  note: z.string().min(5, "Catatan wajib diisi")
});

export const promoSchema = z.object({
  code: z.string().min(2),
  title: z.string().min(3),
  description: z.string().min(3),
  discountType: z.enum(["FLAT", "PERCENTAGE"]),
  discountValue: z.coerce.number().min(0),
  minTransaction: z.coerce.number().min(0),
  maxDiscount: z.coerce.number().min(0).optional().nullable(),
  expiredAt: z.coerce.date(),
  isActive: z.boolean().optional()
});

export const providerSchema = z.object({
  name: z.string().min(2),
  code: z.string().min(2),
  baseUrl: z.string().url().optional().nullable(),
  apiKeyMasked: z.string().optional().nullable(),
  status: z.enum(["ACTIVE", "INACTIVE", "MAINTENANCE"]).optional(),
  priority: z.coerce.number().int().min(1).optional()
});
