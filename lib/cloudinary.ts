import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfig() {
  if (configured) return;

  const cloudinaryUrl = process.env.CLOUDINARY_URL;

  let config: { cloud_name: string; api_key: string; api_secret: string };

  if (cloudinaryUrl) {
    const match = cloudinaryUrl.match(/^cloudinary:\/\/([^:]+):([^@]+)@(.+)$/);
    if (!match) throw new Error("Invalid CLOUDINARY_URL format");

    config = {
      api_key: match[1],
      api_secret: match[2],
      cloud_name: match[3],
    };
  } else {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error("Missing Cloudinary env vars");
    }

    config = {
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    };
  }

  cloudinary.config({
    ...config,
    secure: true,
  });

  console.log("[Cloudinary] Configured for cloud:", config.cloud_name);
  configured = true;
}
export async function uploadImageToCloudinary(file: File) {
  ensureConfig();

  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio/projects",
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url || !result.public_id) {
          return reject(new Error("Invalid Cloudinary response"));
        }

        resolve({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    Readable.from(buffer).pipe(stream);
  });
}