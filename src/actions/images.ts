"use server";

import { db } from "@/lib/db";

export const getAllImages = async (): Promise<any> => {
  const images = await db.image.findMany();
  return images;
};

export const getSomeImages = async (n: number): Promise<any> => {
  const images = await db.image.findMany({
    take: n,
    orderBy: {
      id: "desc",
    },
  });
  return images;
};

export const createImage = async (
  imageUrl: string,
  prompt: string
): Promise<any> => {
  const image = await db.image.create({
    data: {
      imageUrl: imageUrl,
      prompt: prompt,
    },
  });
  return image;
};
