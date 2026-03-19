import { z } from "zod";

export const createAnalysisSchema = z.object({
  title: z.string().min(3, "Vui lòng nhập tiêu đề phân tích."),
  note: z.string().max(1000, "Ghi chú quá dài.").optional(),
  serviceType: z.enum(["AI", "ZOOM"]),
  referenceImages: z.array(z.string().url()).max(5),
});

export type CreateAnalysisInput = z.infer<typeof createAnalysisSchema>;
