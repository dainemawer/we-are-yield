import { markdownResponse, privacyMarkdown } from "@/lib/markdown";

export function GET() {
  return markdownResponse(privacyMarkdown());
}
