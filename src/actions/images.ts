'use server';

import { db } from '@/lib/db';

export const getAllImages = async (): Promise<any> => {
  try {
    console.log('뭐가문제');
    const images = await db.image.findMany();
    console.log('뭐가문제2');

    return images;
  } catch {
    (err: any) => {
      throw new Error(err);
    };
  }
};

export const getSomeImages = async (n: number): Promise<any> => {
  try {
    const images = await db.image.findMany({
      take: n,
      orderBy: {
        id: 'desc',
      },
    });
    return images;
  } catch {
    (err: any) => {
      throw new Error(err);
    };
  }
};

export const createImage = async (
  imageUrl: string,
  prompt: string
): Promise<any> => {
  try {
    const image = await db.image.create({
      data: {
        imageUrl: imageUrl,
        prompt: prompt,
      },
    });
    return image;
  } catch {
    (err: any) => {
      throw new Error(err);
    };
  }
};
