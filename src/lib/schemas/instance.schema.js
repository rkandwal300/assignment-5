import { z } from "zod";

export const instanceSchema = z.object({
  zone: z.string().min(1, { message: "Please enter a valid value" }),
  instanceType: z.string().min(1, { message: "Please enter a valid value" }),
  numberOfInstances: z.number().positive(),
  vCPU: z.number().min(1).max(20),
  monthlyCost: z.number().positive(),
  annualCost: z.number().positive(),
  pricingModel: z.string().min(1, { message: "Please enter a valid value" }),
  status: z.string().min(1, { message: "Please enter a valid value" }),
  cspProvider: z.literal("AWS"),
  //   cspProvider: z.enum(["AWS", "AZURE", "GCP"]),
});
