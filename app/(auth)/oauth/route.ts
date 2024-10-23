import { oauthLogin } from '@/services/auth.service';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId')!;
  const secret = request.nextUrl.searchParams.get('secret')!;

  await oauthLogin(userId, secret);
}
