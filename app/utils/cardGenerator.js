import html2canvas from 'html2canvas';

/**
 * Captures the card preview element as a PNG image.
 * @param {HTMLElement} element - The card element to capture
 * @returns {Promise<Blob|null>} PNG blob
 */
export async function captureCard(element) {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  } catch (e) {
    console.error('Error capturing card:', e);
    return null;
  }
}

/**
 * Downloads a blob as a file.
 * @param {Blob} blob
 * @param {string} fileName
 */
export function downloadImage(blob, fileName = 'eid_card.png') {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Shares the card image via Web Share API.
 * @param {Blob} blob
 * @param {string} text
 */
export async function shareCard(blob, text = 'আমার পক্ষ থেকে পবিত্র ঈদুল ফিতরের শুভেচ্ছা! 🌙✨') {
  const file = new File([blob], 'eid_card.png', { type: 'image/png' });
  if (navigator.share) {
    try {
      await navigator.share({ text, files: [file] });
    } catch (e) {
      // User cancelled or error — try without files
      try { await navigator.share({ text }); } catch (_) {}
    }
  } else {
    // Fallback: download
    downloadImage(blob);
  }
}
