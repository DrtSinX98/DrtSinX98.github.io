import { uploadToImgbb } from '@/lib/imgbb';
import { json, error, withAdmin } from '@/lib/api';

export const runtime = 'nodejs';
export const maxDuration = 60;

const MAX_BYTES = 32 * 1024 * 1024; // ImgBB's per-file ceiling

/** Uploads one image to ImgBB and returns its hosted URLs and dimensions. */
export const POST = withAdmin(async (req) => {
  const form = await req.formData();
  const file = form.get('file');

  if (!file || typeof file === 'string') return error('No file provided', 400);
  if (!file.type?.startsWith('image/')) return error('Only image files are allowed', 400);
  if (file.size > MAX_BYTES) return error('Image is larger than the 32 MB ImgBB limit', 413);

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadToImgbb(buffer, file.name);
    return json(result);
  } catch (err) {
    return error(err.message || 'Upload failed', 502);
  }
});
