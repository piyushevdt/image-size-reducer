class ImageCompressor {
  constructor() {
    this.maxWidth = 1920;
    this.maxHeight = 1080;
    this.quality = 0.8;
  }

  async compressImage(file, options = {}) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          
          // Calculate new dimensions while maintaining aspect ratio
          if (width > this.maxWidth || height > this.maxHeight) {
            const ratio = Math.min(
              this.maxWidth / width,
              this.maxHeight / height
            );
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Determine output format based on input or options
          const outputFormat = this.getOutputFormat(file.type, options.format);
          
          // Convert to blob with specified quality
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas to Blob conversion failed'));
                return;
              }
              
              const compressedFile = new File(
                [blob],
                this.generateCompressedFileName(file.name, outputFormat),
                { type: blob.type }
              );
              
              resolve({
                file: compressedFile,
                originalSize: file.size,
                compressedSize: blob.size,
                reduction: ((file.size - blob.size) / file.size * 100).toFixed(2),
                width: Math.round(width),
                height: Math.round(height),
                format: outputFormat,
              });
            },
            outputFormat,
            options.quality || this.quality
          );
        };
        
        img.onerror = () => reject(new Error('Failed to load image'));
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  }

  getOutputFormat(inputType, preferredFormat) {
    if (preferredFormat) {
      return preferredFormat;
    }
    
    // Default to JPEG for most cases, but preserve PNG for transparency
    if (inputType === 'image/png' || inputType === 'image/gif') {
      return 'image/png';
    }
    
    return 'image/jpeg';
  }

  generateCompressedFileName(originalName, outputFormat) {
    const parts = originalName.split('.');
    const name = parts.slice(0, -1).join('.');
    
    let extension = 'jpg';
    if (outputFormat === 'image/png') {
      extension = 'png';
    } else if (outputFormat === 'image/webp') {
      extension = 'webp';
    }
    
    return `${name}_compressed.${extension}`;
  }

  async compressMultipleImages(files, options = {}) {
    const promises = files.map(file => this.compressImage(file, options));
    return Promise.all(promises);
  }

  setMaxDimensions(width, height) {
    this.maxWidth = width;
    this.maxHeight = height;
  }

  setQuality(quality) {
    this.quality = Math.max(0.1, Math.min(1, quality));
  }

  // New method to get file extension from type
  getFileExtension(fileType) {
    const extensions = {
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
      'image/gif': 'gif',
    };
    
    return extensions[fileType] || 'jpg';
  }
}

// Create instance and export it
const imageCompressorInstance = new ImageCompressor();

export default imageCompressorInstance;