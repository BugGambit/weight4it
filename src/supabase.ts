import { createClient } from '@supabase/supabase-js';
import { config } from './config';
import { getDateStr } from './dateUtils';
import { processImage } from './imageProcessing';

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);
const foodPicturesBucketName = 'food-pictures';

export async function login() {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
}

export async function addWeight(weightInKg: number): Promise<void> {
  await supabase.from('weights').insert({
    weight_in_hektogram: Math.round(weightInKg * 10),
  });
}

export async function readLastWeight(): Promise<{
  weightInKg: number;
  createdAt: Date;
} | null> {
  const res = await supabase
    .from('weights')
    .select('weight_in_hektogram,created_at')
    .limit(1)
    .order('created_at', { ascending: false })
    .maybeSingle();
  if (!res.data) {
    return null;
  }
  return {
    weightInKg: res.data.weight_in_hektogram / 10,
    createdAt: new Date(res.data.created_at),
  };
}

async function getRequiredUserId(): Promise<string> {
  const user = await supabase.auth.getUser();
  if (!user.data.user) {
    throw new Error('No user found');
  }
  return user.data.user.id;
}

export async function uploadFoodPicture(picture: File): Promise<void> {
  const processedImage = await processImage(picture);

  const userId = await getRequiredUserId();
  const date = new Date();

  await supabase.storage
    .from(foodPicturesBucketName)
    .upload(
      `${userId}/${getDateStr()}/${date.toISOString()}.jpg`,
      processedImage,
      {
        contentType: picture.type,
      }
    );
}

export async function getFoodPicturesForADay(
  date: Date
): Promise<{ imageUrl: string }[]> {
  const userId = await getRequiredUserId();
  const folder = `${userId}/${getDateStr(date)}`;
  const res = await supabase.storage.from(foodPicturesBucketName).list(folder);

  if (res.error) {
    console.error(res.error);
    throw new Error('Failed to fetch food pictures');
  }

  const paths = res.data
    .filter((item) => item.name !== '.emptyFolderPlaceholder')
    .map((item) => `${folder}/${item.name}`);

  if (paths.length === 0) {
    return [];
  }

  const expiresInSeconds = 60 * 60; // 1 hour
  const signedUrls = await supabase.storage
    .from(foodPicturesBucketName)
    .createSignedUrls(paths, expiresInSeconds);

  return (
    signedUrls.data?.map((item) => {
      return {
        imageUrl: item.signedUrl,
      };
    }) || []
  );
}
