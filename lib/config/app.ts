const getEnv = (value: string | undefined, fallback: string) => value ?? fallback;
const getNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const APP_CONFIG = {
  APP_NAME: getEnv(process.env.APP_NAME, "Phân Tích Chữ Ký"),
  AI_ANALYSIS_PRICE: 50000,
  AI_MAX_REFERENCE_ACCURACY: 85,
  HIEU_ZOOM_PRICE: 200000,
  HIEU_ZOOM_MAX_REFERENCE_ACCURACY: 95,
  HIEU_ZOOM_UPSELL_PRICE: 150000,
  BANK_NAME: getEnv(process.env.BANK_NAME, "Vietcombank"),
  BANK_ACCOUNT_NUMBER: getEnv(process.env.BANK_ACCOUNT_NUMBER, "0123456789"),
  BANK_ACCOUNT_HOLDER: getEnv(process.env.BANK_ACCOUNT_HOLDER, "DANG NGOC HIEU"),
  BANK_TRANSFER_PREFIX: getEnv(process.env.BANK_TRANSFER_PREFIX, "CKY"),
  SUPPORT_EMAIL: getEnv(process.env.SUPPORT_EMAIL, "support@example.com"),
  NEXT_PUBLIC_APP_URL: getEnv(process.env.NEXT_PUBLIC_APP_URL, "http://localhost:3000"),
  STORAGE_BUCKET: getEnv(process.env.STORAGE_BUCKET, "signature-analysis-assets"),
  STORAGE_REGION: getEnv(process.env.STORAGE_REGION, "ap-southeast-1"),
  STORAGE_PROVIDER: getEnv(process.env.STORAGE_PROVIDER, "s3-compatible"),
  MAX_UPLOAD_SIZE_MB: getNumber(process.env.MAX_UPLOAD_SIZE_MB, 10),
} as const;

export type AppConfig = typeof APP_CONFIG;
