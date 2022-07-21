import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest, event: NextFetchEvent) {
  console.log('middleware!');
  return NextResponse.next();
}
