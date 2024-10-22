import { createAdminClient, createSessionClient } from '@/lib/server/appwrite';
import { addMonths } from 'date-fns';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Query } from 'node-appwrite';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');

  const { account, database, users } = await createAdminClient();

  const session = await account.createSession(userId!, secret!);
  cookies().set('auth-session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    expires: addMonths(new Date(), 4),
  });

  const isNewUser = await database
    .listDocuments(
      process.env.NEXT_PUBLIC_DATABASE!,
      process.env.NEXT_PUBLIC_USERS_COLLECTION!,
      [Query.equal('$id', session.userId)]
    )
    .then((data) => data.total === 0);

  // Only add it to the db if no user exists in it
  if (isNewUser) {
    const user = await users.get(session.userId);

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

  console.log(isNewUser);

  return NextResponse.redirect(`${request.nextUrl.origin}/user`);
}
