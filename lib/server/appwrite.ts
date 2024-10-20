'use server';
import { Client, Account, Databases, Users } from 'node-appwrite';
import { cookies } from 'next/headers';

const {
  NEXT_PUBLIC_APPWRITE_ENDPOINT: APPWRITE_ENDPOINT,
  NEXT_PUBLIC_APPWRITE_PROJECT: APPWRITE_PROJECT,
  NEXT_APPWRITE_KEY: APPWRITE_KEY,
} = process.env;

export async function createSessionClient() {
  if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT) {
    throw new Error('Missing env variables');
  }

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT);

  const session = cookies().get('auth-session');
  if (!session || !session.value) {
    throw new Error('No session');
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT || !APPWRITE_KEY) {
    throw new Error('Missing env variables');
  }

  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT)
    .setKey(APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },

    get database() {
      return new Databases(client);
    },

    get user() {
      return new Users(client);
    },
  };
}
