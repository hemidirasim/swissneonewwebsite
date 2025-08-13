// Image upload service using Cloudinary
export class ImageService {
  private static readonly CLOUDINARY_CLOUD_NAME = 'swissneo';
  private static readonly CLOUDINARY_UPLOAD_PRESET = 'ml_default';

  // Upload image to Cloudinary
  static async uploadImage(file: File): Promise<string> {
    try {
      // Validate file
      if (!file || !file.type.startsWith('image/')) {
        throw new Error('Invalid file type. Only images are allowed.');
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new Error('File size too large. Maximum 10MB allowed.');
      }

      // Create FormData for Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.CLOUDINARY_UPLOAD_PRESET);
      formData.append('cloud_name', this.CLOUDINARY_CLOUD_NAME);

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${this.CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error.message || 'Upload failed');
      }

      console.log('Image uploaded successfully to Cloudinary:', result.secure_url);
      return result.secure_url;

    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      
      // Fallback to base64
      return this.convertToBase64(file);
    }
  }

  // Convert file to base64 as fallback
  private static convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64String = reader.result as string;
        console.log('Image converted to base64 as fallback');
        resolve(base64String);
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to convert image to base64'));
      };
      
      reader.readAsDataURL(file);
    });
  }

  // Validate image file
  static validateImage(file: File): { isValid: boolean; error?: string } {
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
  }

  // Get image dimensions
  static getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  }

  // Compress image if needed
  static async compressImage(file: File, maxSize: number = 1024): Promise<File> {
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
  }
}
