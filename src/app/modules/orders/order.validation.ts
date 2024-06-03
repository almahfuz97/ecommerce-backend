import { z } from "zod";

export const zodOrderValidation = z.object({
  email: z.string().email(),
  productId: z.string(),
  quantity: z.number().min(1).int(),
  price: z.number(),
});
