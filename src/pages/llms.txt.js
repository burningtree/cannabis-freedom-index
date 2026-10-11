// A short guide to the site for language models: what the index is, how to read it, where the data is.
import { llmsIndex, rootOf, text } from "../lib/llms.js";

export const GET = ({ site }) => text(llmsIndex(rootOf(site)));
