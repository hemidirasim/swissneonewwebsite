// Image upload service using Vercel Blob Storage
export const uploadImageToVercel = async (file: File): Promise<string> => {
  try {
    console.log('Starting Vercel Blob upload for file:', file.name, 'Size:', file.size);
    
    // Check if we're in development mode
    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
      console.log('Development mode detected - using base64 fallback');
      // In development, use base64 since API routes don't work with Vite dev server
      return await convertToBase64(file);
    }
    
    // Convert file to base64
    const base64 = await convertToBase64(file);
    console.log('File converted to base64, length:', base64.length);
    
    // Send to Vercel API (using .cjs endpoint)
    console.log('Sending request to /api/upload-image.cjs...');
    const response = await fetch('/api/upload-image.cjs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        file: base64,
        fileName: file.name,
        fileType: file.type
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    console.log('API Response:', result);
    
    if (result.error) {
      throw new Error(result.error);
    }

    console.log('Image uploaded successfully to Vercel Blob:', result.url);
    return result.url;
  } catch (error) {
    console.error('Vercel Blob upload failed:', error);
    throw error;
  }
};

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  });
};

export const uploadImageWithFallback = async (file: File): Promise<string> => {
  try {
    // Check if we're in development mode
    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
      console.log('Development mode - using base64 for local testing');
      return await convertToBase64(file);
    }
    
    // Always try Vercel Blob first in production
    console.log('Production mode - attempting to upload to Vercel Blob...');
    const url = await uploadImageToVercel(file);
    console.log('Successfully uploaded to Vercel Blob:', url);
    return url;
  } catch (error) {
    console.error('Vercel Blob upload failed, using base64 fallback:', error);
    // Only fallback to base64 if Vercel Blob completely fails
    const base64 = await convertToBase64(file);
    console.log('Using base64 fallback');
    return base64;
  }
};

// Validate image file
export const validateImage = (file: File): { isValid: boolean; error?: string } => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: 'Yalnız şəkil faylları yükləyə bilərsiniz.' };
  }

  // Check file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    return { isValid: false, error: 'Şəkil ölçüsü 10MB-dan çox ola bilməz.' };
  }

  // Check file extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const fileName = file.name.toLowerCase();
  const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
  
  if (!hasValidExtension) {
    return { isValid: false, error: 'Dəstəklənməyən fayl formatı.' };
  }

  return { isValid: true };
};

// Get image dimensions
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = URL.createObjectURL(file);
  });
};

// Compress image if needed
export const compressImage = (file: File, maxSize: number = 1024): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxSize || height > maxSize) {
        if (width > height) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else {
          width = (width * maxSize) / height;
          height = maxSize;
        }
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (blob) {
          const compressedFile = new File([blob], file.name, {
            type: 'image/jpeg',
            lastModified: Date.now(),
          });
          resolve(compressedFile);
        } else {
          resolve(file);
        }
      }, 'image/jpeg', 0.8);
    };

    img.src = URL.createObjectURL(file);
  });
};
