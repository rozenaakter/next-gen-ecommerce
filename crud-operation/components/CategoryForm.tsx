'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function CategoryForm({ 
  initialData, 
  onSubmit 
}: { 
  initialData?: { name: string; image: string }; 
  onSubmit: (data: { name: string; image: string }) => void 
}) {
  const [name, setName] = useState(initialData?.name || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      setImage(data.secure_url);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, image });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Category Name
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Category Image
        </label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
        />
        {uploading && <p className="text-sm text-gray-500 mt-1">Uploading...</p>}
        {image && (
          <div className="mt-2">
            <img 
              src={image} 
              alt="Category preview" 
              className="h-20 w-20 object-cover rounded-md"
            />
          </div>
        )}
      </div>
      
      <Button type="submit" disabled={uploading || !image}>
        {initialData ? 'Update Category' : 'Create Category'}
      </Button>
    </form>
  );
}