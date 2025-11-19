import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/lib/models/category';

export async function GET() {
  await connectDB();
  const categories = await Category.find({});
  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const body = await request.json();
    const category = await Category.create(body);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 400 });
  }
}