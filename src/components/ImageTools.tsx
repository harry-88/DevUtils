import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Image as ImageIcon, Upload, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { SEO, SEOConfigs } from './SEO';

export function ImageTools() {
  const [originalImage, setOriginalImage] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string>('');
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [quality, setQuality] = useState(0.8);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(event.target?.result as string);
        setWidth(img.width);
        setHeight(img.height);
        toast.success('Image uploaded!');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const resizeImage = () => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, width, height);
      const resized = canvas.toDataURL('image/jpeg', quality);
      setProcessedImage(resized);
      toast.success('Image resized!');
    };
    img.src = originalImage;
  };

  const downloadImage = () => {
    if (!processedImage) return;

    const link = document.createElement('a');
    link.download = `resized-image-${width}x${height}.jpg`;
    link.href = processedImage;
    link.click();
    toast.success('Image downloaded!');
  };

  const maintainAspectRatio = (dimension: 'width' | 'height', value: number) => {
    if (!originalImage) return;

    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      
      if (dimension === 'width') {
        setWidth(value);
        setHeight(Math.round(value / aspectRatio));
      } else {
        setHeight(value);
        setWidth(Math.round(value * aspectRatio));
      }
    };
    img.src = originalImage;
  };

  return (
    <>
      <SEO {...SEOConfigs.imageTools} />
      <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="mb-2 flex items-center gap-2">
          <ImageIcon className="h-8 w-8" />
          Image Compressor & Resizer
        </h1>
        <p className="text-muted-foreground">
          Resize and compress images for web use
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>Select an image file to process</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            variant="outline"
            size="lg"
          >
            <Upload className="mr-2 h-4 w-4" />
            Choose Image
          </Button>

          {originalImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="border border-border rounded-lg p-4 bg-muted">
                <img
                  src={originalImage}
                  alt="Original"
                  className="max-w-full h-auto rounded"
                />
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {originalImage && (
        <Card>
          <CardHeader>
            <CardTitle>Resize Options</CardTitle>
            <CardDescription>Adjust dimensions and quality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={width}
                  onChange={(e) => maintainAspectRatio('width', Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => maintainAspectRatio('height', Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quality">Quality: {Math.round(quality * 100)}%</Label>
              <Input
                id="quality"
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
              />
            </div>

            <Button onClick={resizeImage} className="w-full">
              Apply Resize
            </Button>
          </CardContent>
        </Card>
      )}

      {processedImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Processed Image</CardTitle>
              <CardDescription>
                {width}x{height}px • {Math.round(quality * 100)}% quality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-border rounded-lg p-4 bg-muted">
                <img
                  src={processedImage}
                  alt="Processed"
                  className="max-w-full h-auto rounded"
                />
              </div>
              <Button onClick={downloadImage} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
    </>
  );
}
