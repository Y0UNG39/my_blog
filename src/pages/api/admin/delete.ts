import type { APIRoute } from 'astro';
import { unlinkSync, existsSync } from 'fs';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) {
    return new Response('Not Found', { status: 404 });
  }

  const { slug } = await request.json();

  if (!slug) {
    return new Response('Missing slug', { status: 400 });
  }

  const filePath = join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);

  if (!existsSync(filePath)) {
    return new Response('File not found', { status: 404 });
  }

  try {
    unlinkSync(filePath);
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
