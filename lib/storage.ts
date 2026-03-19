export type UploadRequest = {
  filename: string;
  contentType: string;
  size: number;
};

export type UploadTarget = {
  uploadUrl: string;
  publicUrl: string;
  expiresInSeconds: number;
};

export interface FileStorageAdapter {
  createUploadTarget(input: UploadRequest): Promise<UploadTarget>;
  deleteObject(objectKey: string): Promise<void>;
}

export class StubStorageAdapter implements FileStorageAdapter {
  async createUploadTarget(input: UploadRequest): Promise<UploadTarget> {
    return {
      uploadUrl: `https://example.com/upload/${encodeURIComponent(input.filename)}`,
      publicUrl: `https://cdn.example.com/${encodeURIComponent(input.filename)}`,
      expiresInSeconds: 300,
    };
  }

  async deleteObject(): Promise<void> {
    return;
  }
}

export const storageAdapter: FileStorageAdapter = new StubStorageAdapter();
