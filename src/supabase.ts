import { createClient } from '@supabase/supabase-js';
import { config } from './config';
import { getDateStr } from './dateUtils';

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
  const userId = await getRequiredUserId();
  const date = new Date();

  const fileExtMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
  };
  const fileExt = fileExtMap[picture.type];
  if (!fileExt) {
    console.error(`Unknown file type: ${picture.type}`);
    return;
  }

  await supabase.storage
    .from(foodPicturesBucketName)
    .upload(
      `${userId}/${getDateStr()}/${date.toISOString()}.${fileExt}`,
      picture,
      {
        contentType: picture.type,
      }
    );
}
}
