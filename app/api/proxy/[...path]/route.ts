// app/api/proxy/[...path]/route.ts

import { NextRequest, NextResponse } from 'next/server';

async function handleRequest(request: NextRequest, params: { path: string[] }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const teamNickname = process.env.NEXT_PUBLIC_TEAM_NICKNAME;
  const targetUrl = `${apiBaseUrl}/${teamNickname}/${params.path.join('/')}`;

  const headers = new Headers(request.headers);

  // CORS 관련 헤더 처리
  headers.delete('Origin');

  // Authorization 헤더 처리
  const authHeader = headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Invalid or missing Authorization header' }, { status: 401 });
  }

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
      body:
        request.method !== 'GET' && request.method !== 'HEAD' ? await request.text() : undefined,
    });

    if (!response.ok) {
      console.error(`Error from API server: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: 'API server error', details: await response.text() },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in proxy server:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}

// HTTP 메서드 핸들러들
export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params);
}

export async function POST(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params);
}

export async function PUT(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params);
}

export async function DELETE(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params);
}

export async function PATCH(request: NextRequest, { params }: { params: { path: string[] } }) {
  return handleRequest(request, params);
}
