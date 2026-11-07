import type { User } from '../types/User';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabaseClient';

function toAppUser(user: SupabaseUser): User {
  const metadataName = user.user_metadata.full_name ?? user.user_metadata.name;
  const emailName = user.email?.split('@')[0];

  return {
    id: user.id,
    email: user.email ?? '',
    name: typeof metadataName === 'string' ? metadataName : emailName ?? 'UCLL student',
  };
}

export async function login(email: string, password: string): Promise<User> {
  const { data, error } = await getSupabaseClient().auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    throw error;
  }

  if (!data.user) {
    throw new Error('Supabase did not return a user after signing in.');
  }

  return toAppUser(data.user);
}

export async function logout(): Promise<void> {
  const { error } = await getSupabaseClient().auth.signOut();

  if (error) {
    throw error;
  }
}

export function subscribeToAuthChanges(onUserChange: (user: User | null) => void) {
  const { data } = getSupabaseClient().auth.onAuthStateChange((_event, session) => {
    onUserChange(session?.user ? toAppUser(session.user) : null);
  });

  return data.subscription;
}
