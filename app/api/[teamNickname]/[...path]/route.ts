import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { teamNickname: string; path: string[] } },
) {
  console.log('GET request received', { params });
  return handleRequest(req, 'GET', params);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { teamNickname: string; path: string[] } },
) {
  console.log('POST request received', { params });
  return handleRequest(req, 'POST', params);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { teamNickname: string; path: string[] } },
) {
  console.log('PATCH request received', { params });
  return handleRequest(req, 'PATCH', params);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { teamNickname: string; path: string[] } },
) {
  console.log('DELETE request received', { params });
  return handleRequest(req, 'DELETE', params);
}

async function handleRequest(
  req: NextRequest,
  method: string,
  params: { teamNickname: string; path: string[] },
) {
  console.log('handleRequest called', { method, params });
  const { teamNickname, path } = params;
  const apiBaseUrl = process.env.API_BASE_URL;

  console.log('Environment variables', { apiBaseUrl });

  if (!apiBaseUrl) {
    console.error('API_BASE_URL is not defined');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

  const targetUrl = `${apiBaseUrl}/${teamNickname}/${path.join('/')}`;
  console.log('Target URL', { targetUrl });

  try {
    const headers = new Headers(req.headers);
    headers.delete('host');

    console.log('Request headers', { headers: Object.fromEntries(headers) });

    const response = await fetch(targetUrl, {
      method,
      headers,
      body: method !== 'GET' && method !== 'HEAD' ? await req.text() : undefined,
    });

    console.log('API response', { status: response.status });

    const data = await response.json();
    console.log('API response data', { data });

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

