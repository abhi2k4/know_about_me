/**
 * Automatically injects Cloudinary optimization parameters (f_auto, q_auto)
 * and resizes the image to the target width to minimize bandwidth and credit consumption.
 */
export function getOptimizedImageUrl(url: string, width?: number): string {
  if (!url || !url.includes("cloudinary.com")) return url;

  let optimized = url;

  // Ensure f_auto,q_auto is injected into the upload path
  if (!optimized.includes("/f_auto,q_auto")) {
    optimized = optimized.replace("/upload/", "/upload/f_auto,q_auto/");
  }

  // Inject width transformation if specified
  if (width && !optimized.includes(`/w_`)) {
    optimized = optimized.replace("/upload/f_auto,q_auto/", `/upload/f_auto,q_auto,w_${width}/`);
  }

  return optimized;
}
