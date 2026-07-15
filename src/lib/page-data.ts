import { prisma } from "@/lib/prisma";

export async function productsFor(slugs: string[], query?: string) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      category: { slug: { in: slugs }, isActive: true },
      name: query ? { contains: query, mode: "insensitive" } : undefined
    },
    orderBy: [{ providerName: "asc" }, { sellPrice: "asc" }]
  });
}
