import { createClient } from '@supabase/supabase-js';
import { config } from './config';

export const supabase = createClient(config.supabaseUrl, config.supabaseKey);

export async function login() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  });
  console.log({ data, error });
}

export async function addWeight(weightInKg: number): Promise<void> {
  await supabase.from('weights').insert({
    weight_in_kg: weightInKg,
  });
}

export async function readLastWeight(): Promise<{
  weightInKg: number;
  createdAt: Date;
} | null> {
  const res = await supabase
    .from('weights')
    .select('weight_in_kg,created_at')
    .limit(1)
    .order('created_at', { ascending: false })
    .maybeSingle();
  if (!res.data) {
    return null;
  }
  return {
    weightInKg: res.data.weight_in_kg,
    createdAt: new Date(res.data.created_at),
  };
}

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event, session);

  if (event === 'INITIAL_SESSION') {
    // handle initial session
  } else if (event === 'SIGNED_IN') {
    // handle sign in event
  } else if (event === 'SIGNED_OUT') {
    // handle sign out event
  } else if (event === 'PASSWORD_RECOVERY') {
    // handle password recovery event
  } else if (event === 'TOKEN_REFRESHED') {
    // handle token refreshed event
  } else if (event === 'USER_UPDATED') {
    // handle user updated event
  }
});
