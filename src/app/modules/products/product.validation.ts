import { z } from "zod";

const VariantSchema = z.object({
  type: z.string().min(1, "Variant type cannot be empty!"),
  value: z.string().min(1, "Variant value cannot be empty!"),
});

const InventorySchema = z.object({
  quantity: z.number().min(0).int(),
  inStock: z.boolean(),
});

// Zod schema for Product
export const zodProductSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantSchema),
  inventory: InventorySchema,
});
