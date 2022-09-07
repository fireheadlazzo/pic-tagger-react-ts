// HACK - I couldn't find the type of error that GCS returns
export interface CloudStorageFileError extends Error {
  message: string
}

interface ImageFile extends Express.Multer.File {
  cloudStorageError?: CloudStorageFileError;
}

export interface UploadRequest {
  file?: ImageFile;
}
