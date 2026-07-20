'use client';

import Image from 'next/image';
import { ReactNode } from 'react';

/** Render inline **bold** segments and [text](url) links within a line of text. */
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return parts
    .filter((p) => p !== '')
    .map((part, i) => {
      if (/^\*\*[^*]+\*\*$/.test(part)) {
        return (
          <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-text-primary">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a
            key={`${keyPrefix}-a-${i}`}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={`${keyPrefix}-t-${i}`}>{part}</span>;
    });
}

/**
 * Lightweight renderer for the AI's lightly-formatted text: paragraphs,
 * "- " / "* " / "•" bullet lists, "#" headings, and **bold**.
 * Avoids pulling in a full markdown dependency.
 */
export function FormattedMessage({ text }: { text: string }) {
  const lines = text.split('\n');
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = (key: string) => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={key} className="space-y-1.5">
        {items.map((b, i) => (
          <li key={`${key}-${i}`} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="flex-1">{renderInline(b, `${key}-${i}`)}</span>
          </li>
        ))}
      </ul>
    );
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    const bulletMatch = trimmed.match(/^([*\-•])\s+(.*)$/);
    const headingMatch = trimmed.match(/^#{1,6}\s+(.*)$/);
    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);

    if (imageMatch) {
      flushBullets(`ul-${idx}`);
      blocks.push(
        <a key={`img-${idx}`} href={imageMatch[2]} target="_blank" rel="noopener noreferrer">
          <Image
            src={imageMatch[2]}
            alt={imageMatch[1]}
            width={400}
            height={200}
            className="rounded-xl w-full h-auto object-cover max-h-48"
            unoptimized
          />
        </a>
      );
    } else if (bulletMatch) {
      bullets.push(bulletMatch[2]);
    } else if (trimmed === '') {
      flushBullets(`ul-${idx}`);
    } else if (headingMatch) {
      flushBullets(`ul-${idx}`);
      blocks.push(
        <p key={`h-${idx}`} className="font-semibold text-text-primary">
          {renderInline(headingMatch[1], `h-${idx}`)}
        </p>
      );
    } else {
      flushBullets(`ul-${idx}`);
      blocks.push(<p key={`p-${idx}`}>{renderInline(trimmed, `p-${idx}`)}</p>);
    }
  });
  flushBullets('ul-end');

  return <div className="space-y-2">{blocks}</div>;
}
