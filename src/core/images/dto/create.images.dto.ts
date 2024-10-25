export class CreateImagesDto {
  hash: string;
  image_bin: Buffer;
  path: string;
  mime_type: string;
  file_name: string;
  original_name?: string;
  size?: number;
  width?: number;
  height?: number;
  metadata?: object;
  steps_progress?: number;
  stock_item?: number;
  product?: number;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}
