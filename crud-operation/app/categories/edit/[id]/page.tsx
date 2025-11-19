'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CategoryForm } from '@/components/CategoryForm';

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function EditCategoryPage() {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const fetchCategory = async () => {
    try {
      const response = await fetch(`/api/categories/${id}`);
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error('Failed to fetch category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: { name: string; image: string }) => {
    try {
      await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      router.push('/categories');
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!category) return <div>Category not found</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <CategoryForm 
        initialData={category} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}