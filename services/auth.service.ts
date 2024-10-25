'use server';

import { createAdminClient, createSessionClient } from '@/lib/server/appwrite';
import { type AppwriteException, ID, Models, Query } from 'node-appwrite';
import { cookies } from 'next/headers';
import { addMonths } from 'date-fns';
import { redirect, RedirectType } from 'next/navigation';

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

    console.log('error during user login', error);

    return ['Woops! Something went wrong. Please try again later.', null];
  }
}

export async function oauthLogin(userId: string, secret: string) {
  const { account, database, users } = await createAdminClient();
  const session = await account.createSession(userId!, secret!);

  // Set the cookie
  cookies().set('auth-session', session.secret, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: addMonths(new Date(), 4),
  });

  const user = await getUser();

  if (!user) throw new Error('User not found');

  console.log('session is', session);

  console.log(account);
  // Get the info from google API
  const googleRes = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${session.providerAccessToken}`,
      },
    }
  );

  console.log('googleRes is', googleRes.status);

  if (googleRes.status === 200) {
    const googleUserInfo = await googleRes.json();

    console.log('googleUserInfo is', googleUserInfo);

    await account.updatePrefs({
      ...user?.prefs,
      avatar: googleUserInfo.picture,
    });
  } else {
    console.log('algo fue mal');
  }

  const isNewUser = await database
    .listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION!,
      [Query.equal('$id', session.userId)]
    )
    .then((data) => data.total === 0);

  if (isNewUser) {
    await database.createDocument(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION!,
      user.$id,
      {
        name: user.name,
        email: user.email,
      }
    );
  }
  redirect('/oauth-redirect');
}
export async function register(
  email: string,
  password: string,
  username: string
): Promise<[string | null, Models.User<Models.Preferences> | null]> {
  if (!DATABASE || !USERS_COLLECTION) {
    throw new Error('Missing env variables');
  }

  const { account, database, users } = await createAdminClient();
  try {
    const userExists = await users
      .list([Query.equal('email', email)])
      .then((users) => users.total > 0);

    if (userExists) return ['This user already exists, try logging in.', null];
  } catch {
    return ['Woops! Something went wrong. Please try again later.', null];
  }

  try {
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
    await account.deleteSession('current');
    cookies().delete('auth-session');

    return true;
  } catch (e) {
    return false;
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
