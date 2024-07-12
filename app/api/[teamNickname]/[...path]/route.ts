import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { teamNickname, path } = req.query;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const expectedTeamNickname = process.env.NEXT_PUBLIC_TEAM_NICKNAME;

  if (teamNickname !== expectedTeamNickname) {
    return res.status(400).json({ error: '다른팀의 정보를 가져오는거같아요' });
  }

  const targetUrl = `${apiBaseUrl}/${teamNickname}/${Array.isArray(path) ? path.join('/') : path || ''}`;

  const headers = new Headers(req.headers as HeadersInit);
  headers.delete('host');
  headers.delete('origin');

  const authHeader = headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '접근 권한이 없는거같아요' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    if (!response.ok) {
      console.error(`어느 곳에서 에러가 났는지 표시: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({ error: 'api서버가 맛갔어요 다시시도해주세요', details: await response.text() });
    }

    const data = await response.json();

    if (data.user && data.user.teamId) {
      data.user.teamId = expectedTeamNickname;
    }

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error in proxy server:', error);
    res.status(500).json({
      error: '인터넷이맛갔어요. 다시 시도해주세요.',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}