'use server';

import { createAdminClient } from '@/lib/server/appwrite';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { OAuthProvider } from 'node-appwrite';

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const origin = headers().get('origin');

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/login`,
    ['openid', 'profile', 'email']
  );

  return redirect(redirectUrl);
}

export async function signUpWithGithub() {
  const { account } = await createAdminClient();

  const origin = headers().get('origin');

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}/oauth`,
    `${origin}/login`,
    ['user:email']
  );

  return redirect(redirectUrl);
}