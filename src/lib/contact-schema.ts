import { z } from "zod";
import "server-only";
import { services } from "@/config/site";

const serviceNames = services.map((s) => s.name) as [string, ...string[]];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please tell us your name.")
    .max(120, "That name is a little long — try a shorter version."),
  email: z
    .email("Please enter a valid email address, like you@company.com.")
    .max(200),
  company: z.string().trim().max(160).default(""),
  message: z
    .string()
    .trim()
    .max(5000, "Please keep it under 5,000 characters.")
    .default(""),
  services: z.array(z.enum(serviceNames)).max(serviceNames.length).default([]),
});

export type ContactInput = z.infer<typeof contactSchema>;
