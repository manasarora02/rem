import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
});
