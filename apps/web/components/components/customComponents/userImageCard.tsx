'use-client';
import { Card, CardContent, CardFooter } from '@components/components/ui/card';
import { Button } from '@components/components/ui/button';
import { Download } from 'lucide-react';

interface ImageCardProps {
  imageUrl: string;
  description: string;
  fileName?: string;
  title?:string
}

export function ImageCard({ imageUrl, description, fileName = 'image.jpg',title}: ImageCardProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    link.click();
  };

  return (
    <Card className="w-[300px] p-0 group overflow-hidden">
      <CardContent className="p-1 relative">
        <img src={imageUrl} alt={description} className="w-full h-[400px] object-cover rounded-md" />
        <div className="absolute bottom-0 left-0 w-full px-4 py-2 bg-black/60 text-white text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          {description}
        </div>
        <Button variant="default" className="border absolute top-4 right-4" onClick={handleDownload}>
          <Download />
        </Button>
      </CardContent>
    </Card>
  );
}
