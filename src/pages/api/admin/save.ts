import type { APIRoute } from 'astro';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) {
    return new Response('Not Found', { status: 404 });
  }

  const body = await request.json();
  const { slug, title, date, category, tags, description, cover, draft, content } = body;

  if (!slug || !title) {
    return new Response('Missing required fields', { status: 400 });
  }

  const blogDir = join(process.cwd(), 'src', 'content', 'blog');
  if (!existsSync(blogDir)) {
    mkdirSync(blogDir, { recursive: true });
  }

  const tagsFormatted = tags.map((t: string) => `"${t}"`).join(', ');
  const frontmatter = [
    '---',
    `title: "${title}"`,
    `date: ${date}`,
    `tags: [${tagsFormatted}]`,
    `category: ${category}`,
    `description: "${description}"`,
    ...(cover ? [`cover: "${cover}"`] : []),
    `draft: ${draft}`,
    '---',
  ].join('\n');

  const fileContent = `${frontmatter}\n\n${content}`;
  const filePath = join(blogDir, `${slug}.md`);

  try {
    writeFileSync(filePath, fileContent, 'utf-8');
    return new Response(JSON.stringify({ ok: true, slug }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
