export const resizeImage = (file: File, maxWidth = 800, maxHeight = 800): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = (e) => {
        if (!e.target?.result) return reject('Failed to read file');
        img.src = e.target.result as string;
      };
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
  
        // Resize while maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject('No canvas context');
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject('Image compression failed');
          },
          'image/jpeg',
          0.8 // quality
        );
      };
  
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };
  
  export const dataURLtoFile = (dataUrl: string, filename: string): File => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    return new File([u8arr], filename, { type: mime });
  };
  