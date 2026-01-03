import { MAX_FILE_SIZE, ALLOWED_IMAGE_TYPES } from './constants';

// Validate image file
export const validateImage = (file) => {
    const errors = [];

    // Check if file exists
    if (!file) {
        errors.push('Please select an image');
        return { valid: false, errors };
    }

    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        errors.push('Please upload a valid image (JPEG, PNG, or WebP)');
    }

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
        errors.push(`Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

// Get image preview URL
export const getImagePreview = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error('No file provided'));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
};

// Compress image
export const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions
                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        const compressedFile = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
                        resolve(compressedFile);
                    },
                    file.type,
                    quality
                );
            };

            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Get image dimensions
export const getImageDimensions = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                resolve({
                    width: img.width,
                    height: img.height,
                });
            };

            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Convert data URL to blob
export const dataURLtoBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};

// Convert blob to data URL
export const blobToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

// Generate thumbnail
export const generateThumbnail = (file, size = 150) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Calculate dimensions to maintain aspect ratio
                let width = size;
                let height = size;
                let offsetX = 0;
                let offsetY = 0;

                if (img.width > img.height) {
                    width = (size * img.width) / img.height;
                    offsetX = -(width - size) / 2;
                } else {
                    height = (size * img.height) / img.width;
                    offsetY = -(height - size) / 2;
                }

                canvas.width = size;
                canvas.height = size;

                ctx.drawImage(img, offsetX, offsetY, width, height);

                canvas.toBlob(
                    (blob) => {
                        const thumbnailFile = new File([blob], `thumb_${file.name}`, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
                        resolve(thumbnailFile);
                    },
                    file.type,
                    0.8
                );
            };

            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Get dominant color from image
export const getDominantColor = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                let r = 0, g = 0, b = 0;
                const pixelCount = data.length / 4;

                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }

                r = Math.floor(r / pixelCount);
                g = Math.floor(g / pixelCount);
                b = Math.floor(b / pixelCount);

                resolve({ r, g, b, hex: `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}` });
            };

            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

// Check if image is loaded
export const isImageLoaded = (imgElement) => {
    return imgElement.complete && imgElement.naturalHeight !== 0;
};

// Preload images
export const preloadImages = (urls) => {
    return Promise.all(
        urls.map(
            (url) =>
                new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve(url);
                    img.onerror = () => reject(url);
                    img.src = url;
                })
        )
    );
};

// Get image format
export const getImageFormat = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const mimeType = file.type;

    return {
        extension,
        mimeType,
        isJPEG: mimeType === 'image/jpeg' || extension === 'jpg' || extension === 'jpeg',
        isPNG: mimeType === 'image/png' || extension === 'png',
        isWebP: mimeType === 'image/webp' || extension === 'webp',
        isGIF: mimeType === 'image/gif' || extension === 'gif',
    };
};

export default {
    validateImage,
    getImagePreview,
    compressImage,
    getImageDimensions,
    dataURLtoBlob,
    blobToDataURL,
    generateThumbnail,
    getDominantColor,
    isImageLoaded,
    preloadImages,
    getImageFormat,
};