// TODO: Fix these optional properties. Not everything should be optional
export interface UploadRequest {
  file?: {
    cloudStorageError?: Error,
    originalname?: string;
    bucket?: string;
    path?: string;
  }
}
