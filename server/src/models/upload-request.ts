export interface UploadRequest {
  file?: {
    cloudStorageError?: Error,
    originalname?: string;
    bucket?: string;
    path?: string;
  }
}
