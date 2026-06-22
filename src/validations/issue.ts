import { z } from "zod";

export const issueSchema = z.object({
  imageUrl: z.string().optional(),
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().min(3),
  latitude: z.coerce.number(), //because the form input will be a string, we need to coerce it to a number
  longitude: z.coerce.number(),

  category: z.enum([
    "Road",
    "Streetlight",
    "Garbage",
    "Water",
    "Electricity",
    "Other",
  ]),
});
