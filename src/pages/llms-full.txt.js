// The methodology and every country profile in one Markdown file, for language models.
import { llmsFull, rootOf, text } from "../lib/llms.js";

export const GET = ({ site }) => text(llmsFull(rootOf(site)));
