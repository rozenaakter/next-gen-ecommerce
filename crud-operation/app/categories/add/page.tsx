'use client';

import { useRouter } from 'next/navigation';
import { CategoryForm } from '@/components/CategoryForm';

export default function AddCategoryPage() {
  const router = useRouter();

  const handleSubmit = async (data: { name: string; image: string }) => {
    try {
      await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      router.push('/categories');
    } catch (error) {
      console.error('Failed to create category:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Category</h1>
      <CategoryForm onSubmit={handleSubmit} />
    </div>
  );
}