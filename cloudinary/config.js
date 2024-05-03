import { Cloudinary } from '@cloudinary/url-gen'
 
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.EXPO_PUBLIC_CLOUD_NAME,
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    apiSecret: process.env.EXPO_PUBLIC_API_SECRET,
  }
})
 
 
export {
  cld,
}
 