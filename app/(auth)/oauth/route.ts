import { createAdminClient } from '@/lib/server/appwrite';
import { addMonths } from 'date-fns';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const secret = request.nextUrl.searchParams.get('secret');

  const { account } = await createAdminClient();
  const session = await account.createSession(userId!, secret!);

  cookies().set('auth-session', session.secret, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    expires: addMonths(new Date(), 4),
  });

  return NextResponse.redirect(`${request.nextUrl.origin}/tasks`);
}
