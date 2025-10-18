import { z } from "zod";

export const statusSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(200, "Max character is reached"),
});

export type StatusSchemaType = z.infer<typeof statusSchema>;
