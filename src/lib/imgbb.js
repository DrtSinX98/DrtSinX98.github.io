import 'server-only';

const ENDPOINT = 'https://api.imgbb.com/1/upload';

/**
 * Upload an image to ImgBB.
 *
 * @param {Buffer|Uint8Array} buffer raw image bytes
 * @param {string} name file name (ImgBB uses it for the display name)
 * @returns {Promise<{src:string,thumb:string,medium:string,width:number,height:number,deleteUrl:string,imgbbId:string}>}
 */
export async function uploadToImgbb(buffer, name) {
  const key = process.env.IMGBB_API_KEY;
  if (!key) throw new Error('IMGBB_API_KEY is not set. Add it to .env.local');

  const body = new FormData();
  body.append('key', key);
  body.append('image', Buffer.from(buffer).toString('base64'));
  if (name) body.append('name', name.replace(/\.[^.]+$/, ''));

  const res = await fetch(ENDPOINT, { method: 'POST', body });
  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    throw new Error(json?.error?.message || `ImgBB upload failed (HTTP ${res.status})`);
  }

  const d = json.data;
  return {
    src: d.image?.url || d.url,
    thumb: d.thumb?.url || d.url,
    medium: d.medium?.url || d.image?.url || d.url,
    width: Number(d.width) || 0,
    height: Number(d.height) || 0,
    deleteUrl: d.delete_url || '',
    imgbbId: d.id || '',
  };
}
