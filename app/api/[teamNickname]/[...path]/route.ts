import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { teamNickname: string, path: string[] } }) {
  return handleRequest(req, 'GET', params);
}

export async function POST(req: NextRequest, { params }: { params: { teamNickname: string, path: string[] } }) {
  return handleRequest(req, 'POST', params);
}

export async function PATCH(req: NextRequest, { params }: { params: { teamNickname: string, path: string[] } }) {
  return handleRequest(req, 'PATCH', params);
}

export async function DELETE(req: NextRequest, { params }: { params: { teamNickname: string, path: string[] } }) {
  return handleRequest(req, 'DELETE', params);
}

async function handleRequest(req: NextRequest, method: string, params: { teamNickname: string, path: string[] }) {
  const { teamNickname, path } = params;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const targetUrl = ${apiBaseUrl}/${teamNickname}/${path.join('/')};

  const headers = new Headers(req.headers);
  const response = await fetch(targetUrl, {
    method,
    headers,
    body: method !== 'GET' && method !== 'HEAD' ? await req.text() : undefined,
  });

  const data = await response.json();
  return NextResponse.json(data);
}
