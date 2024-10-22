'use server';

import { createAdminClient, createSessionClient } from '@/lib/server/appwrite';
import { type AppwriteException, ID, Models, Query } from 'node-appwrite';
import { cookies } from 'next/headers';
import { addMonths } from 'date-fns';
import { redirect } from 'next/navigation';

const {
  NEXT_PUBLIC_DATABASE: DATABASE,
  NEXT_PUBLIC_USERS_COLLECTION: USERS_COLLECTION,
} = process.env;

export async function login(
  email: string,
  password: string
): Promise<[string | null, Models.Session | null]> {
  try {
    const { account, users } = await createAdminClient();

    const emailFound = await users
      .list([Query.equal('email', email)])
      .then((users) => users.total > 0);

    if (!emailFound)
      return [
        "We couldn't find an account with that email, try registering first",
        null,
      ];

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set('auth-session', session.secret, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: addMonths(new Date(), 4),
    });

    return [null, session];
  } catch (e) {
    const error = e as AppwriteException;
    if (error.code === 401) {
      return ['Invalid email or password', null];
    }

    return ['Woops! Something went wrong. Please try again later.', null];
  }
}

export async function register(
  email: string,
  password: string,
  username: string
): Promise<[string | null, Models.User<Models.Preferences> | null]> {
  if (!DATABASE || !USERS_COLLECTION) {
    throw new Error('Missing env variables');
  }

  try {
    const { account, database } = await createAdminClient();

    const user = await account.create(ID.unique(), email, password, username);

    await database.createDocument(DATABASE, USERS_COLLECTION, user.$id, {
      name: username,
      email,
    });

    await login(email, password);

    return [null, user];
  } catch (e) {
    const error = e as AppwriteException;
    if (error.code === 409) {
      return ['This user already exists, try logging in.', null];
    }

    return ['Woops! Something went wrong. Please try again later.', null];
  }
}

export async function logout() {
  try {
    const { account } = await createSessionClient();

    const cookieSession = cookies().get('auth-session');
    if (!cookieSession) return;

    await account.deleteSession('current');

    cookies().delete('auth-session');

    redirect('/login');
  } catch (e) {
    console.log(e);
  }
}

export async function getUser() {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();
    return user;
  } catch (error) {
    return null;
  }
}
