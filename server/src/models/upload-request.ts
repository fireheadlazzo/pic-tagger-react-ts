export interface UploadRequest {
  file?: {
    originalname?: string;
    bucket?: string;
    path?: string;
  }
}
