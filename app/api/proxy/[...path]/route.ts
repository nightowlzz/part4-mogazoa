import { NextRequest, NextResponse } from 'next/server';

async function handleRequest(request: NextRequest, params: { path: string[] }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const teamNickname = process.env.NEXT_PUBLIC_TEAM_NICKNAME;
  const targetUrl = `${apiBaseUrl}/${teamNickname}/${params.path.join('/')}`;

  const headers = new Headers(request.headers);

  headers.delete('Origin');

  const authHeader = headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Invalid or missing Authorization header' }, { status: 401 });
  }

  try {
    let body;
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      const clonedRequest = request.clone();
      body = await clonedRequest.text();

      try {
        const jsonBody = JSON.parse(body);
        if (jsonBody.teamId) {
          jsonBody.teamId = '5-6';
          body = JSON.stringify(jsonBody);
        }
      } catch (e) {
        console.warn('o');
      }
    }

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      console.error(`Error from API server: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: 'API server error', details: await response.text() },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (data.user && data.user.teamId) {
      data.user.teamId = '5-6';
    }

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
