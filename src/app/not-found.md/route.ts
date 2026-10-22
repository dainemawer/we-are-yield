import { markdownResponse, notFoundMarkdown } from "@/lib/markdown";

/** Served for unknown paths when the request asks for Markdown. */
export function GET() {
  return markdownResponse(notFoundMarkdown(), { status: 404 });
}
