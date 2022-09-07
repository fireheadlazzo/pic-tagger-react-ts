export interface CloudStorageFileError extends Error {
  message: string
}

interface ImageFile extends Express.Multer.File {
  cloudStorageError?: CloudStorageFileError;
  bucket?: string;
  filepath?: string;
}

export interface UploadRequest {
  file?: ImageFile;
}
