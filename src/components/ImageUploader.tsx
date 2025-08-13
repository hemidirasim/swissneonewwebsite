import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Image as ImageIcon, FileImage } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
  currentPreview?: string;
  onRemove?: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  currentPreview,
  onRemove
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Xəta!",
        description: "Yalnız şəkil faylları yükləyə bilərsiniz.",
        variant: "destructive",
      });
      return false;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Xəta!",
        description: "Şəkil ölçüsü 5MB-dan çox ola bilməz.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      onImageSelect(file, preview);
      setIsUploading(false);
      
      toast({
        title: "Şəkil yükləndi!",
        description: "Şəkil uğurla əlavə edildi.",
      });
    };
    reader.readAsDataURL(file);
  }, [onImageSelect, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
      toast({
        title: "Şəkil silindi!",
        description: "Şəkil uğurla silindi.",
      });
    }
  };

  if (currentPreview) {
    return (
      <div className="space-y-4">
        <Label>Şəkil</Label>
        <div className="relative group">
          <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
            <img
              src={currentPreview}
              alt="Preview"
              className="w-full h-64 object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleClick}
                  className="bg-white/90 hover:bg-white text-gray-800"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Dəyişdir
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  className="bg-red-500/90 hover:bg-red-600 text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Sil
                </Button>
              </div>
            </div>
          </div>
          
          {/* File Info */}
          <div className="mt-2 text-sm text-gray-500 text-center">
            Şəkli dəyişdirmək üçün üzərinə klikləyin
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Label>Şəkil</Label>
      
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <div className="space-y-4">
          {isUploading ? (
            <div className="animate-pulse">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
              <p className="text-gray-600">Şəkil yüklənir...</p>
            </div>
          ) : (
            <>
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <ImageIcon className="w-8 h-8 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-700">
                  Şəkil yükləyin
                </p>
                <p className="text-sm text-gray-500">
                  Şəkli buraya sürükləyin və ya klikləyin
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF, WebP - maksimum 5MB
                </p>
              </div>
              
              <Button variant="outline" className="mt-4">
                <FileImage className="w-4 h-4 mr-2" />
                Şəkil Seç
              </Button>
            </>
          )}
        </div>
        
        {isDragOver && (
          <div className="absolute inset-0 bg-blue-500/10 rounded-lg flex items-center justify-center">
            <div className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Şəkli buraya buraxın
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
