/**
 * Calculates the percentage of transparent/scratched pixels in the canvas
 */
export const calculateScratchPercentage = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  sampleRate: number = 16
): number => {
  try {
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const totalPixels = pixels.length / 4;
    let clearedCount = 0;

    // Sample every Nth pixel for performance
    for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
      const alpha = pixels[i + 3];
      if (alpha < 128) {
        clearedCount++;
      }
    }

    const sampledTotal = totalPixels / sampleRate;
    return Math.min(100, Math.round((clearedCount / sampledTotal) * 100));
  } catch (e) {
    console.error('Error calculating scratch percentage:', e);
    return 0;
  }
};

/**
 * Creates realistic silver metallic texture on canvas
 */
export const fillSilverTexture = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  ctx.save();

  // Base linear metallic silver gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#D1D5DB');
  grad.addColorStop(0.2, '#F3F4F6');
  grad.addColorStop(0.4, '#9CA3AF');
  grad.addColorStop(0.6, '#E5E7EB');
  grad.addColorStop(0.8, '#D1D5DB');
  grad.addColorStop(1, '#9CA3AF');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Subtle metallic diagonal brush lines
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.lineWidth = 1.5;
  for (let i = -height; i < width + height; i += 6) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + height, height);
    ctx.stroke();
  }

  // Subtle dark metallic accent lines
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
  ctx.lineWidth = 1;
  for (let i = -height; i < width + height; i += 12) {
    ctx.beginPath();
    ctx.moveTo(i + 3, 0);
    ctx.lineTo(i + height + 3, height);
    ctx.stroke();
  }

  ctx.restore();
};
