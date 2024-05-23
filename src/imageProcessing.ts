export async function processImage(file: File): Promise<Blob> {
  if (!/image/i.test(file.type)) {
    throw new Error('File ' + file.name + ' is not an image.');
  }

  const arrayBuffer = await readFileAsArrayBuffer(file);
  const blob = new Blob([arrayBuffer]);
  const blobURL = window.URL.createObjectURL(blob);

  const image = await loadImage(blobURL);
  const resizedImage = await resizeImage(image, 1000, 1000);
  return dataURLtoBlob(resizedImage);
}

function dataURLtoBlob(dataURL: string): Blob {
  const arr = dataURL.split(',');
  if (arr.length < 2) throw new Error('Invalid data URL');
  const mimeItems = arr[0].match(/:(.*?);/);
  if (!mimeItems) throw new Error('Invalid data URL');
  const mime = mimeItems[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

async function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = reject;
    reader.readAsArrayBuffer(file);
  });
}

function loadImage(imgSrc: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = imgSrc;
  });
}

async function resizeImage(
  img: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
): Promise<string> {
  const canvas = document.createElement('canvas');

  let { width, height } = img;
  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      //height *= maxWidth / width;
      height = Math.round((height *= maxWidth / width));
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      //width *= maxHeight / height;
      width = Math.round((width *= maxHeight / height));
      height = maxHeight;
    }
  }

  // resize the canvas and draw the image data into it
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2d context');
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', 0.9); // 90% quality
}
