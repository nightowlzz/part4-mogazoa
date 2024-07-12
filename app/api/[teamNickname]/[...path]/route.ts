import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { teamNickname, path } = req.query;
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const expectedTeamNickname = process.env.NEXT_PUBLIC_TEAM_NICKNAME;

  if (teamNickname !== expectedTeamNickname) {
    return res.status(400).json({ error: '올바르지 않은 팀 정보입니다.' });
  }

  const targetUrl = `${apiBaseUrl}/${teamNickname}/${Array.isArray(path) ? path.join('/') : path || ''}`;

  const headers = new Headers();
  ['authorization', 'content-type'].forEach((header) => {
    const value = req.headers[header];
    if (value) headers.set(header, Array.isArray(value) ? value[0] : value);
  });

  const authHeader = headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '인증에 실패했습니다.' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: headers,
      body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
    });

    if (!response.ok) {
      console.error(`API 서버 에러: ${response.status} ${response.statusText}`);
      return res.status(response.status).json({
        error: 'API 서버 오류가 발생했습니다. 다시 시도해 주세요.',
        details: await response.text(),
      });
    }

    const data = await response.json();

    if (data.user && data.user.teamId) {
      data.user.teamId = expectedTeamNickname;
    }

    res.status(response.status).json(data);
  } catch (error) {
    console.error('프록시 서버 오류:', error);
    res.status(500).json({
      error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
