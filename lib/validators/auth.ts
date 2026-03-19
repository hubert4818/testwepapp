import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Vui lòng nhập email hợp lệ."),
  password: z.string().min(8, "Mật khẩu cần tối thiểu 8 ký tự."),
});

export const signUpSchema = signInSchema.extend({
  fullName: z.string().min(2, "Vui lòng nhập họ tên."),
  phone: z.string().min(9, "Vui lòng nhập số điện thoại hợp lệ."),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
