import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;

// Debug logs
if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("❌ Cloudinary env vars missing");
} else {
  console.log("✅ Cloudinary config loaded:", CLOUDINARY_CLOUD_NAME);
}

// Configure cloudinary
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Use memory storage (IMPORTANT)
const storage = multer.memoryStorage();

export const upload = multer({ storage });

export default cloudinary;