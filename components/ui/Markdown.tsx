import React from "react";

interface MarkdownProps {
  content: string;
}

export default function Markdown({ content }: MarkdownProps) {
  if (!content) return null;

  // Helper to parse inline styles (bold, italic)
  const parseInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let keyIndex = 0;

    // Pattern to match bold **...** or italic *...*
    const regex = /(\*\*.*?\*\*|\*.*?\*)/g;
    const tokens = text.split(regex);

    tokens.forEach((token) => {
      if (token.startsWith("**") && token.endsWith("**")) {
        parts.push(
          <strong key={keyIndex++} className="font-semibold text-gold-bright">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith("*") && token.endsWith("*")) {
        parts.push(
          <em key={keyIndex++} className="italic text-gold-light/90">
            {token.slice(1, -1)}
          </em>
        );
      } else {
        parts.push(token);
      }
    });

    return parts;
  };

  // Split content by lines
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let keyIndex = 0;

  const pushCurrentList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${keyIndex++}`} className="list-disc pl-5 mb-3 flex flex-col gap-1 text-gold-light/90">
          {currentList}
        </ul>
      );
      currentList = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check if line is a bullet point
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const bulletText = trimmed.substring(2);
      currentList.push(
        <li key={`li-${keyIndex++}`} className="leading-relaxed">
          {parseInline(bulletText)}
        </li>
      );
    } else if (trimmed === "") {
      // Empty line closes the list and acts as a paragraph separator
      pushCurrentList();
    } else {
      // Normal line
      pushCurrentList();
      elements.push(
        <p key={`p-${keyIndex++}`} className="mb-3 last:mb-0 leading-relaxed text-gold-light/95">
          {parseInline(line)}
        </p>
      );
    }
  }

  // Push any trailing list
  pushCurrentList();

  return <div className="markdown-content">{elements}</div>;
}
